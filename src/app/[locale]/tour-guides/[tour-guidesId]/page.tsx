'use client';


import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import {
    ArrowLeft, Star, MapPin, Languages, Award, Mail, Phone,
    Clock, DollarSign, Calendar, CheckCircle, BookOpen, BadgeCheck, X, Check
} from 'lucide-react';
import { tourGuides } from '../data/tourGuides';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';

export default function TourGuideDetailsPage() {
    const params = useParams();
    const id = params['tour-guidesId'] as string;
    const router = useRouter();
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [reviewRating, setReviewRating] = useState<number>(5);
    const [selectedTour, setSelectedTour] = useState<string>('');
    const [reviewComment, setReviewComment] = useState('');

    const guide = tourGuides.find((g) => g.id === id);

    const handleSubmitReview = () => {
        // Validation
        // if (!selectedTour) {
        //   toast.error('Please select a tour');
        //   return;
        // }
        // if (!reviewComment.trim()) {
        //   toast.error('Please write a comment');
        //   return;
        // }
        // if (reviewComment.trim().length < 10) {
        //   toast.error('Comment must be at least 10 characters');
        //   return;
        // }

        // // Submit review logic here
        // toast.success('Review submitted successfully! Thank you for your feedback.');

        // Reset form
        setReviewRating(5);
        setSelectedTour('');
        setReviewComment('');
        setShowReviewDialog(false);
    };

    const handleCancelReview = () => {
        setReviewRating(5);
        setSelectedTour('');
        setReviewComment('');
        setShowReviewDialog(false);
    };

    if (!guide) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-theme-text mb-4">Tour Guide Not Found</h2>
                    <button
                        onClick={() => router.push('/tour-guides')}
                        className="text-theme-primary hover:text-theme-secondary"
                    >
                        Back to Tour Guides
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Back Button */}
            <div className="bg-theme-card/50 backdrop-blur-sm border-b border-theme-border/50 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4">
                    <button
                        onClick={() => router.push('/tour-guides')}
                        className="flex items-center gap-2 text-theme-primary hover:text-theme-secondary transition-all duration-300 hover:gap-3 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to Tour Guides</span>
                    </button>
                </div>
            </div>

            {/* Enhanced Header Section */}
            <div className="relative overflow-hidden">
                {/* Background with Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-primary">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-6 py-16 md:py-20">
                    <div className="flex flex-col md:flex-row gap-8 items-start max-w-6xl">
                        {/* Profile Image with Enhanced Styling */}
                        <div className="relative group animate-in fade-in slide-in-from-left duration-700">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-yellow-200/30 to-white/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Image Container */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
                                <img
                                    src={guide.image}
                                    alt={guide.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Verified Badge Overlay */}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
                                    <BadgeCheck className="text-white drop-shadow-lg" size={16} />
                                    <span className="text-xs font-semibold text-white drop-shadow-lg">Verified</span>
                                </div>
                            </div>
                        </div>

                        {/* Header Info */}
                        <div className="flex-1 animate-in fade-in slide-in-from-right duration-700">
                            <div className="mb-6">
                                {/* Name & Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                                    {guide.name}
                                </h1>
                                <p className="text-xl md:text-2xl text-white/90 mb-4">{guide.title}</p>
                            </div>

                            {/* Key Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Clock className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">{guide.experience}</div>
                                            <div className="text-sm text-white/80">Years Experience</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <DollarSign className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">${guide.hourlyRate}</div>
                                            <div className="text-sm text-white/80">Per Hour</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Languages className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">{guide.languages.length}</div>
                                            <div className="text-sm text-white/80">Languages</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 48h1440V0c-240 48-480 48-720 0S240 0 0 0v48z" fill="currentColor" className="text-theme-bg" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4 flex items-center gap-2">
                                <BookOpen size={18} />
                                About {guide.name}
                            </h2>
                            <p className="text-theme-text/80 leading-relaxed mb-4">{guide.bio}</p>
                            <p className="text-theme-text/70">{guide.description}</p>
                        </section>

                        {/* Specializations */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4 flex items-center gap-2">
                                <Award size={18} />
                                Specializations
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {guide.specialization.map((spec) => (
                                    <span
                                        key={spec}
                                        className="px-4 py-2 bg-theme-primary/10 text-theme-primary border border-theme-primary/20 rounded-lg"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4 flex items-center gap-2">
                                <Languages size={18} />
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {guide.languages.map((lang) => (
                                    <span
                                        key={lang}
                                        className="px-4 py-2 bg-theme-accent text-theme-text rounded-lg"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Areas Covered */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4 flex items-center gap-2">
                                <MapPin size={18} />
                                Areas Covered
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {guide.areas.map((area) => (
                                    <div
                                        key={area}
                                        className="flex items-center gap-2 text-theme-text/80"
                                    >
                                        <CheckCircle size={16} className="text-theme-primary" />
                                        {area}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Highlights */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4">Professional Highlights</h2>
                            <ul className="space-y-3">
                                {guide.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3 text-theme-text/80">
                                        <CheckCircle size={20} className="text-theme-primary flex-shrink-0 mt-0.5" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Available Tours */}
                        <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                            <h2 className="text-base font-medium text-theme-text mb-4 flex items-center gap-2">
                                <Calendar size={18} />
                                Available Tours
                            </h2>
                            <div className="space-y-4">
                                {guide.tours.map((tour, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-theme-accent rounded-lg border border-theme-border hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-base text-theme-text">{tour.name}</h3>
                                            <span className="text-theme-primary font-medium">${tour.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-theme-muted text-sm">
                                            <Clock size={16} />
                                            <span>{tour.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews Section */}
                        {guide.reviews && guide.reviews.length > 0 && (
                            <section className="bg-theme-card border border-theme-border rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-base font-medium text-theme-text flex items-center gap-2">
                                        <Star size={18} />
                                        Client Reviews ({guide.reviewCount})
                                    </h2>
                                    <Button
                                        label="Write Review"
                                        icon={<Star size={16} className="mr-2" />}
                                        className="p-button-sm"
                                        onClick={() => setShowReviewDialog(true)}
                                    />
                                </div>

                                <div className="space-y-6">
                                    {guide.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="border-b border-theme-border pb-6 last:border-0 last:pb-0"
                                        >
                                            <div className="flex items-start gap-4 mb-3">
                                                <img
                                                    src={review.reviewerImage}
                                                    alt={review.reviewerName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-theme-text font-medium">{review.reviewerName}</h4>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={16}
                                                                    className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-theme-muted mb-3">
                                                        <span>{new Date(review.date).toLocaleDateString()}</span>
                                                        <span>•</span>
                                                        <span>{review.tourName}</span>
                                                    </div>
                                                    <p className="text-theme-text/80">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-theme-card border border-theme-border rounded-lg p-6 sticky top-6 space-y-6">
                            {/* Education & Certifications */}
                            <div>
                                <h3 className="text-lg text-theme-text mb-3 flex items-center gap-2">
                                    <Award size={20} />
                                    Education
                                </h3>
                                <p className="text-theme-text/80 text-sm mb-4">{guide.education}</p>

                                <h4 className="text-theme-text mb-2">Certifications</h4>
                                <ul className="space-y-2">
                                    {guide.certifications.map((cert, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-theme-text/70">
                                            <CheckCircle size={16} className="text-theme-primary flex-shrink-0 mt-0.5" />
                                            <span>{cert}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Information */}
                            <div className="pt-6 border-t border-theme-border">
                                <h3 className="text-lg text-theme-text mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`mailto:${guide.email}`}
                                        className="flex items-center gap-3 text-theme-text/80 hover:text-theme-primary transition-colors"
                                    >
                                        <Mail size={20} />
                                        <span className="text-sm">{guide.email}</span>
                                    </a>
                                    <a
                                        href={`tel:${guide.phone}`}
                                        className="flex items-center gap-3 text-theme-text/80 hover:text-theme-primary transition-colors"
                                    >
                                        <Phone size={20} />
                                        <span className="text-sm">{guide.phone}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Book Now Button */}
                            <button className="w-full bg-theme-primary hover:bg-theme-secondary text-white py-3 rounded-lg transition-colors duration-300 font-medium">
                                Book This Guide
                            </button>

                            {/* Quick Info */}
                            <div className="pt-6 border-t border-theme-border text-sm text-theme-text/70">
                                <div className="flex justify-between mb-2">
                                    <span>Response Time:</span>
                                    <span className="text-theme-text">Within 24 hours</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Cancellation:</span>
                                    <span className="text-theme-text">48 hours notice</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Group Size:</span>
                                    <span className="text-theme-text">1-15 people</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Dialog */}
            <Dialog
                header={
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <Star className="text-yellow-500" size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">Leave a Review</h3>
                            <p className="text-sm text-theme-muted">Share your experience with {guide.name}</p>
                        </div>
                    </div>
                }
                visible={showReviewDialog}
                onHide={handleCancelReview}
                style={{ width: '90vw', maxWidth: '600px' }}
                modal
                draggable={false}
                className="review-dialog"
            >
                <div className="space-y-6 pt-4">
                    {/* Rating Section */}
                    <div className="bg-theme-accent p-4 rounded-lg">
                        <label className="text-sm font-medium text-theme-text mb-3 block">
                            How would you rate your experience?
                        </label>
                        <div className="flex items-center gap-4">
                            <Rating
                                value={reviewRating}
                                onChange={(e) => setReviewRating(e.value as number)}
                                cancel={false}
                                className="custom-rating"
                            />
                            <span className="text-lg font-semibold text-theme-primary">
                                {reviewRating === 5 ? 'Excellent!' : reviewRating === 4 ? 'Great!' : reviewRating === 3 ? 'Good' : reviewRating === 2 ? 'Fair' : 'Poor'}
                            </span>
                        </div>
                    </div>

                    {/* Tour Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-theme-text block">
                            Which tour did you take? <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            value={selectedTour}
                            onChange={(e) => setSelectedTour(e.value as string)}
                            options={guide.tours.map((tour) => ({ label: tour.name, value: tour.name }))}
                            placeholder="Select a tour"
                            className="w-full"
                        />
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-theme-text block">
                            Share your experience <span className="text-red-500">*</span>
                        </label>
                        <InputTextarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={5}
                            placeholder="Tell us about your tour experience, what you liked, and any suggestions..."
                            className="w-full"
                            maxLength={500}
                        />
                        <div className="flex justify-between items-center text-xs text-theme-muted">
                            <span>Minimum 10 characters</span>
                            <span>{reviewComment.length}/500</span>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-theme-border">
                    <Button
                        label="Cancel"
                        icon={<X size={16} className="mr-2" />}
                        className="p-button-text p-button-secondary"
                        onClick={handleCancelReview}
                    />
                    <Button
                        label="Submit Review"
                        icon={<Check size={16} className="mr-2" />}
                        className="p-button-primary"
                        onClick={handleSubmitReview}
                    />
                </div>
            </Dialog>
        </div>
    );
}