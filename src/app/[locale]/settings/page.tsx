'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import {
    Settings as SettingsIcon,
    Bell,
    Moon,
    Sun,
    Lock,
    Mail,
    Shield,
    Eye,
    Database,
    Download,
    Trash2
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { useTheme } from '@/components/common/ThemeContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Divider } from 'primereact/divider';

export default function SettingsPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    // Settings state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    const [siteUpdates, setSiteUpdates] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [showHistory, setShowHistory] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-theme-primary/20 via-theme-accent to-theme-secondary/20 py-16 border-b border-theme-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-theme-card rounded-2xl shadow-lg">
                                <SettingsIcon size={48} className="text-theme-primary" />
                            </div>
                        </div>
                        <h1 className="text-theme-text mb-4">Settings</h1>
                        <p className="text-theme-muted text-lg max-w-2xl mx-auto">
                            Customize your experience and manage your account preferences
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Appearance Settings */}
                    <Card className="bg-theme-card border border-theme-border">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                {theme === 'dark' ? <Moon size={24} className="text-theme-primary" /> : <Sun size={24} className="text-theme-primary" />}
                                <h2 className="text-2xl text-theme-text">Appearance</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1">Dark Mode</div>
                                        <div className="text-theme-muted text-sm">
                                            Switch between light and dark theme
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={theme === 'dark'}
                                        onChange={toggleTheme}
                                    />
                                </div>

                                <Divider />

                                {/* <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                      <Globe size={18} />
                      Language
                    </div>
                    <div className="text-theme-muted text-sm">
                      Choose your preferred language
                    </div>
                  </div>
                  <Dropdown
                    value={language}
                    options={languageOptions}
                    onChange={(e) => changeLanguage(e.value)}
                    className="w-40"
                  />
                </div> */}
                            </div>
                        </div>
                    </Card>

                    {/* Notification Settings */}
                    <Card className="bg-theme-card border border-theme-border">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Bell size={24} className="text-theme-primary" />
                                <h2 className="text-2xl text-theme-text">Notifications</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                            <Mail size={18} />
                                            Email Notifications
                                        </div>
                                        <div className="text-theme-muted text-sm">
                                            Receive updates via email
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.value)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1">Push Notifications</div>
                                        <div className="text-theme-muted text-sm">
                                            Get browser push notifications
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={pushNotifications}
                                        onChange={(e) => setPushNotifications(e.value)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1">Newsletter</div>
                                        <div className="text-theme-muted text-sm">
                                            Receive monthly newsletter
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={newsletter}
                                        onChange={(e) => setNewsletter(e.value)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1">Site Updates</div>
                                        <div className="text-theme-muted text-sm">
                                            Get notified about new content
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={siteUpdates}
                                        onChange={(e) => setSiteUpdates(e.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Privacy & Security */}
                    <Card className="bg-theme-card border border-theme-border">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield size={24} className="text-theme-primary" />
                                <h2 className="text-2xl text-theme-text">Privacy & Security</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                            <Eye size={18} />
                                            Show Browsing History
                                        </div>
                                        <div className="text-theme-muted text-sm">
                                            Display your site visit history
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={showHistory}
                                        onChange={(e) => setShowHistory(e.value)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                            <Database size={18} />
                                            Auto-Save Searches
                                        </div>
                                        <div className="text-theme-muted text-sm">
                                            Automatically save your search queries
                                        </div>
                                    </div>
                                    <InputSwitch
                                        checked={autoSave}
                                        onChange={(e) => setAutoSave(e.value)}
                                    />
                                </div>

                                <Divider />

                                <div className="py-3">
                                    <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                        <Lock size={18} />
                                        Change Password
                                    </div>
                                    <div className="text-theme-muted text-sm mb-4">
                                        Update your account password
                                    </div>
                                    <Button
                                        label="Change Password"
                                        icon="pi pi-lock"
                                        outlined
                                        className="border-theme-border text-theme-text hover:bg-theme-accent"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Data Management */}
                    <Card className="bg-theme-card border border-theme-border">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Database size={24} className="text-theme-primary" />
                                <h2 className="text-2xl text-theme-text">Data Management</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="py-3">
                                    <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                        <Download size={18} />
                                        Download Your Data
                                    </div>
                                    <div className="text-theme-muted text-sm mb-4">
                                        Export all your account data in JSON format
                                    </div>
                                    <Button
                                        label="Download Data"
                                        icon="pi pi-download"
                                        outlined
                                        className="border-theme-border text-theme-text hover:bg-theme-accent"
                                    />
                                </div>

                                <Divider />

                                <div className="py-3">
                                    <div className="text-theme-text font-medium mb-1 flex items-center gap-2">
                                        <Trash2 size={18} className="text-red-500" />
                                        Clear Browsing History
                                    </div>
                                    <div className="text-theme-muted text-sm mb-4">
                                        Remove all your browsing history
                                    </div>
                                    <Button
                                        label="Clear History"
                                        icon="pi pi-trash"
                                        severity="danger"
                                        outlined
                                        className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                    />
                                </div>

                                <Divider />

                                <div className="py-3 bg-red-50 dark:bg-red-500/10 rounded-lg p-4 border border-red-200 dark:border-red-500/20">
                                    <div className="text-red-700 dark:text-red-500 font-medium mb-1 flex items-center gap-2">
                                        <Trash2 size={18} />
                                        Delete Account
                                    </div>
                                    <div className="text-red-600 dark:text-red-400 text-sm mb-4">
                                        Permanently delete your account and all associated data. This action cannot be undone.
                                    </div>
                                    <Button
                                        label="Delete Account"
                                        icon="pi pi-trash"
                                        severity="danger"
                                        className="bg-red-500 border-0 hover:bg-red-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* About */}
                    <Card className="bg-theme-card border border-theme-border">
                        <div className="p-6">
                            <h2 className="text-2xl text-theme-text mb-4">About</h2>
                            <div className="space-y-2 text-theme-muted text-sm">
                                <p>Version: 1.0.0</p>
                                <p>Last Updated: March 2024</p>
                                <div className="flex gap-4 mt-4">
                                    <Button
                                        label="Terms of Service"
                                        link
                                        className="text-theme-primary p-0"
                                    />
                                    <Button
                                        label="Privacy Policy"
                                        link
                                        className="text-theme-primary p-0"
                                    />
                                    <Button
                                        label="Help Center"
                                        link
                                        className="text-theme-primary p-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
