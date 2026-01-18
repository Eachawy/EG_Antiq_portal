'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import {
    User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
    LogOut, Heart, BookMarked, History, Settings, Eye, Search
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { userEndpoints } from '@/lib/api/endpoints';
import { PortalUser, UserStats } from '@/lib/api/types/users.dto';
import { Toast } from 'primereact/toast';
import { formatDatecreatedAt } from '@/lib/utils/utils';

export default function ProfilePage() {
    const { logout, isAuthenticated } = useAuth();
    const router = useRouter();
    const toastRef = useRef<Toast>(null);

    // API state
    const [profile, setProfile] = useState<PortalUser | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        location: '',
        bio: '',
        avatar: '',
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    // Fetch profile data
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const [profileData, statsData] = await Promise.all([
                    userEndpoints.getProfile(),
                    userEndpoints.getStats().catch(() => null), // Stats might fail, that's ok
                ]);

                setProfile(profileData);
                setFormData({
                    firstName: profileData.firstName || '',
                    lastName: profileData.lastName || '',
                    phone: profileData.phone || '',
                    location: profileData.location || '',
                    bio: profileData.bio || '',
                    avatar: profileData.avatar || '',
                });

                if (statsData) {
                    setStats(statsData);
                }
            } catch (err: any) {
                console.error('Failed to fetch profile:', err);
                toastRef.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message || 'Failed to load profile',
                    life: 3000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    const handleSave = async () => {
        try {
            const updatedProfile = await userEndpoints.updateProfile(formData);
            setProfile(updatedProfile);
            setIsEditing(false);
            toastRef.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Profile updated successfully',
                life: 3000,
            });
        } catch (err: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: err.message || 'Failed to update profile',
                life: 3000,
            });
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                phone: profile.phone || '',
                location: profile.location || '',
                bio: profile.bio || '',
                avatar: profile.avatar || '',
            });
        }
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const getFullName = () => {
        if (!profile) return '';
        const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        return fullName || 'User';
    };

    const getInitials = () => {
        if (!profile) return 'U';
        const firstName = profile.firstName || '';
        const lastName = profile.lastName || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-theme-primary mx-auto mb-4"></div>
                    <p className="text-theme-text">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
            <Toast ref={toastRef} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl p-6 sticky top-24 shadow-lg">
                            {/* Profile Picture */}
                            <div className="text-center mb-6">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-theme-primary shadow-xl bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center">
                                    {profile.avatar ? (
                                        <img
                                            src={profile.avatar}
                                            alt={getFullName()}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials()}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-theme-text mb-1">{getFullName()}</h2>
                                <p className="text-theme-muted text-sm mb-2">{profile.email}</p>
                                <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                                    profile.emailVerified
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                    {profile.emailVerified ? 'Verified' : 'Unverified'}
                                </span>
                            </div>

                            {/* Quick Stats */}
                            <div className="border-t border-b border-theme-border py-4 mb-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-theme-muted">Member Since</span>
                                    <span className="text-theme-text font-medium">
                                        {formatDatecreatedAt(profile.createdAt)}
                                    </span>
                                </div>
                                {profile.lastLoginAt && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-theme-muted">Last Login</span>
                                        <span className="text-theme-text font-medium">
                                            {formatDatecreatedAt(profile.lastLoginAt)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-theme-muted">Status</span>
                                    <span className={profile.status === 'ACTIVE' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                        {profile.status}
                                    </span>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="space-y-2 mb-6">
                                <button
                                    onClick={() => router.push('/profile')}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10 text-theme-primary rounded-xl transition-all hover:scale-105"
                                >
                                    <User size={20} />
                                    <span className="font-medium">Profile</span>
                                </button>
                                <button
                                    onClick={() => router.push('/favorites')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-xl transition-all hover:scale-105"
                                >
                                    <Heart size={20} />
                                    <span>Favorites</span>
                                    {stats && stats.favoritesCount > 0 && (
                                        <span className="ml-auto bg-theme-primary text-white text-xs px-2 py-1 rounded-full">
                                            {stats.favoritesCount}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => router.push('/saved-searches')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-xl transition-all hover:scale-105"
                                >
                                    <BookMarked size={20} />
                                    <span>Saved Searches</span>
                                    {stats && stats.savedSearchesCount > 0 && (
                                        <span className="ml-auto bg-theme-primary text-white text-xs px-2 py-1 rounded-full">
                                            {stats.savedSearchesCount}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => router.push('/history')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-xl transition-all hover:scale-105"
                                >
                                    <History size={20} />
                                    <span>History</span>
                                    {stats && stats.browsingHistoryCount > 0 && (
                                        <span className="ml-auto bg-theme-primary text-white text-xs px-2 py-1 rounded-full">
                                            {stats.browsingHistoryCount}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => router.push('/settings')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-xl transition-all hover:scale-105"
                                >
                                    <Settings size={20} />
                                    <span>Settings</span>
                                </button>
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all hover:scale-105"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Statistics Cards */}
                        {stats && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 border border-theme-primary/20 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                                    <Heart size={32} className="text-theme-primary mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-theme-primary mb-1">{stats.favoritesCount}</div>
                                    <div className="text-theme-muted text-sm">Favorites</div>
                                </div>
                                <div className="bg-gradient-to-br from-theme-secondary/10 to-theme-secondary/5 border border-theme-secondary/20 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                                    <Eye size={32} className="text-theme-secondary mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-theme-secondary mb-1">{stats.browsingHistoryCount}</div>
                                    <div className="text-theme-muted text-sm">Sites Visited</div>
                                </div>
                                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                                    <Search size={32} className="text-amber-700 dark:text-amber-500 mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-1">{stats.savedSearchesCount}</div>
                                    <div className="text-theme-muted text-sm">Saved Searches</div>
                                </div>
                            </div>
                        )}

                        {/* Profile Information Card */}
                        <div className="bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-theme-text">Profile Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 text-theme-primary hover:bg-theme-primary/10 rounded-lg transition-all hover:scale-105"
                                    >
                                        <Edit2 size={18} />
                                        <span className="font-medium">Edit</span>
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                                        >
                                            <Save size={18} />
                                            <span className="font-medium">Save</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 text-theme-muted hover:bg-theme-accent rounded-lg transition-all hover:scale-105"
                                        >
                                            <X size={18} />
                                            <span className="font-medium">Cancel</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <User className="inline mr-2" size={16} />
                                        First Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            placeholder="Enter your first name"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl">
                                            {profile.firstName || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <User className="inline mr-2" size={16} />
                                        Last Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            placeholder="Enter your last name"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl">
                                            {profile.lastName || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Email (readonly) */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <Mail className="inline mr-2" size={16} />
                                        Email Address
                                    </label>
                                    <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl">
                                        {profile.email}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <Phone className="inline mr-2" size={16} />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Add phone number"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl">
                                            {profile.phone || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <MapPin className="inline mr-2" size={16} />
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Add your location"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl">
                                            {profile.location || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted mb-2">
                                        <Calendar className="inline mr-2" size={16} />
                                        Bio
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            placeholder="Tell us about yourself"
                                            rows={4}
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-colors resize-none"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-xl min-h-[100px]">
                                            {profile.bio || 'No bio added yet'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
