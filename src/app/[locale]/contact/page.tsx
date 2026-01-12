'use client';

// import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    // const t = useTranslations('header');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset messages
        setShowSuccess(false);
        setErrorMessage('');

        // Validate fields
        if (!formData.name.trim()) {
            setErrorMessage('Please enter your name');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            setErrorMessage('Please enter your email address');
            return;
        }
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!formData.message.trim()) {
            setErrorMessage('Please enter your message');
            return;
        }

        // Simulate form submission
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }, 2000);
    };

    return (
        <div className="bg-theme-bg">
            {/* Full-Width Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542601098-3adb3b5be01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMG11c2V1bSUyMGNvbnRhY3R8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">
                            GET IN TOUCH
                        </p>
                        <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
                            Contact Us
                        </h1>
                        <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
                            Have questions about your visit? We're here to help you plan the perfect archaeological adventure.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 md:py-20 bg-theme-bg">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <MapPin className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">Address</h3>
                                    <p className="text-theme-text/70">
                                        Giza Plateau, Al Haram, Giza<br />
                                        Egypt
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <Phone className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">Phone</h3>
                                    <p className="text-theme-text/70">+20 2 3377 3222</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <Mail className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">Email</h3>
                                    <p className="text-theme-text/70">info@ancientegypt.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-theme-card border border-theme-border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none focus:border-theme-primary transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-theme-card border border-theme-border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none focus:border-theme-primary transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-theme-card border border-theme-border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none focus:border-theme-primary transition-colors resize-none"
                                ></textarea>
                            </div>
                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-theme-secondary hover:bg-theme-primary text-white px-8 py-4 rounded tracking-[0.2em] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        SENDING...
                                    </>
                                ) : (
                                    'SEND MESSAGE'
                                )}
                            </button>
                            {showSuccess && <p className="text-green-500 text-sm">Message sent successfully!</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
