'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import {
    User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
    LogOut, Heart, BookMarked, History, Settings
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

export default function ProfilePage() {
    const { user, logout, updateProfile, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || '',
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    // Don't render anything while redirecting
    if (!isAuthenticated || !user) {
        return null;
    }

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            location: user?.location || '',
            bio: user?.bio || '',
        });
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getProviderName = (provider: string) => {
        const providers: Record<string, string> = {
            email: 'Email',
            google: 'Google',
            facebook: 'Facebook',
            apple: 'Apple'
        };
        return providers[provider] || provider;
    };

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-theme-card border border-theme-border rounded-lg p-6 sticky top-24">
                            {/* Profile Picture */}
                            <div className="text-center mb-6">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-theme-primary">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl text-theme-text mb-1">{user.name}</h2>
                                <p className="text-theme-muted text-sm mb-2">{user.email}</p>
                                <span className="inline-block px-3 py-1 bg-theme-primary/10 text-theme-primary text-xs rounded-full">
                                    {getProviderName(user.provider)} Account
                                </span>
                            </div>

                            {/* Quick Stats */}
                            <div className="border-t border-b border-theme-border py-4 mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-theme-muted">Member Since</span>
                                    <span className="text-theme-text">{formatDate(user.joinDate)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-theme-muted">Status</span>
                                    <span className="text-green-600">Active</span>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="space-y-2 mb-6">
                                <button
                                    onClick={() => router.push('/profile')}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-theme-primary/10 text-theme-primary rounded-lg transition-colors"
                                >
                                    <User size={20} />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={() => router.push('/favorites')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-lg transition-colors"
                                >
                                    <Heart size={20} />
                                    <span>Favorites</span>
                                </button>
                                <button
                                    onClick={() => router.push('/saved-searches')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-lg transition-colors"
                                >
                                    <BookMarked size={20} />
                                    <span>Saved Searches</span>
                                </button>
                                <button
                                    onClick={() => router.push('/history')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-lg transition-colors"
                                >
                                    <History size={20} />
                                    <span>History</span>
                                </button>
                                <button
                                    onClick={() => router.push('/settings')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-theme-text hover:bg-theme-accent rounded-lg transition-colors"
                                >
                                    <Settings size={20} />
                                    <span>Settings</span>
                                </button>
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Information Card */}
                        <div className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl text-theme-text">Profile Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 text-theme-primary hover:bg-theme-primary/10 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white hover:bg-theme-secondary rounded-lg transition-colors"
                                        >
                                            <Save size={18} />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 text-theme-muted hover:bg-theme-accent rounded-lg transition-colors"
                                        >
                                            <X size={18} />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm text-theme-muted mb-2">
                                        <User className="inline mr-2" size={16} />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-lg">
                                            {user.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-theme-muted mb-2">
                                        <Mail className="inline mr-2" size={16} />
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-lg">
                                            {user.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm text-theme-muted mb-2">
                                        <Phone className="inline mr-2" size={16} />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Add phone number"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-lg">
                                            {user.phone || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm text-theme-muted mb-2">
                                        <MapPin className="inline mr-2" size={16} />
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Add your location"
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-lg">
                                            {user.location || 'Not provided'}
                                        </p>
                                    )}
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm text-theme-muted mb-2">
                                        <Calendar className="inline mr-2" size={16} />
                                        Bio
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            placeholder="Tell us about yourself"
                                            rows={4}
                                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text focus:outline-none focus:border-theme-primary transition-colors resize-none"
                                        />
                                    ) : (
                                        <p className="text-theme-text px-4 py-3 bg-theme-accent rounded-lg min-h-[100px]">
                                            {user.bio || 'No bio added yet'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Activity Card */}
                        <div className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h3 className="text-2xl text-theme-text mb-4">Recent Activity</h3>
                            <div className="text-center py-12 text-theme-muted">
                                <History size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No recent activity</p>
                                <p className="text-sm mt-2">Start exploring archaeological sites to see your activity here</p>
                            </div>
                        </div>

                        {/* Preferences Card */}
                        <div className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h3 className="text-2xl text-theme-text mb-4">Preferences</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-theme-text">Email Notifications</span>
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-5 h-5 rounded border-theme-border"
                                    />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-theme-text">Newsletter Subscription</span>
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-5 h-5 rounded border-theme-border"
                                    />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-theme-text">Site Updates</span>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-theme-border"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}