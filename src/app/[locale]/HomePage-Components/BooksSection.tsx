'use client';

import { Book, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function BooksSection() {
    const t = useTranslations("booksSection");
    const featuredBooks = [
        {
            id: '1',
            title: 'The Complete Pyramids',
            author: 'Mark Lehner',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1699217869632-2c1f1c408130?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NjY1MzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            rating: 5,
        },
        {
            id: '2',
            title: 'The Egyptian Book of the Dead',
            author: 'E.A. Wallis Budge',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
            rating: 4.5,
        },
        {
            id: '3',
            title: 'Ancient Egypt: Anatomy of a Civilization',
            author: 'Barry J. Kemp',
            price: 52.00,
            image: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?w=400&h=600&fit=crop',
            rating: 5,
        },
    ];

    return (
        <section className="from-theme-bg to-theme-accent/30 bg-gradient-to-b py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-theme-card border-theme-border mb-6 inline-flex items-center gap-3 rounded-full border px-6 py-3 shadow-lg"
                    >
                        <Book className="text-theme-primary" size={24} />
                        <span className="text-theme-muted text-sm font-medium uppercase tracking-wider">
                            {t("badge")}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-theme-text mb-4"
                    >
                        {t("title")}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-theme-muted mx-auto max-w-2xl text-lg"
                    >
                        {t("description")}
                    </motion.p>
                </div>

                {/* Featured Books Grid */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featuredBooks.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href="/books" className="block">
                                <div className="bg-theme-card border-theme-border overflow-hidden rounded-xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                    {/* Book Cover */}
                                    <div className="bg-theme-accent relative h-80 overflow-hidden">
                                        <Image
                                            src={book.image}
                                            alt={book.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* Quick View Badge - Removed */}
                                    </div>

                                    {/* Book Info */}
                                    <div className="p-6">
                                        <h4 className="text-theme-text group-hover:text-theme-primary mb-2 line-clamp-2 transition-colors">
                                            {book.title}
                                        </h4>
                                        <p className="text-theme-muted mb-3 text-sm">by {book.author}</p>

                                        {/* Rating - Removed */}

                                        {/* Price */}
                                        <div className="border-theme-border flex items-center justify-between border-t pt-4">
                                            <span className="text-theme-primary text-xl font-semibold">
                                                ${book.price.toFixed(2)}
                                            </span>
                                            <div className="text-theme-primary flex items-center gap-1 text-sm font-medium">
                                                <ShoppingCart size={16} />
                                                <span>{t("addToCart")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="from-theme-primary/10 via-theme-accent to-theme-secondary/10 border-theme-border relative overflow-hidden rounded-2xl border bg-gradient-to-br p-12"
                >
                    <div className="relative z-10 text-center">
                        <h3 className="text-theme-text mb-4">
                            {t("discoverTitle")}
                        </h3>
                        <p className="text-theme-muted mx-auto mb-8 max-w-2xl text-lg">
                            {t("discoverDescription")}
                        </p>
                        <Link
                            href="/books"
                            className="bg-theme-primary hover:bg-theme-secondary hover:shadow-theme-primary/30 group inline-flex items-center gap-2 rounded-xl px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                        >
                            <span>{t("browseBooksButton")}</span>
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="bg-theme-primary/5 absolute right-0 top-0 size-64 rounded-full blur-3xl" />
                    <div className="bg-theme-secondary/5 absolute bottom-0 left-0 size-64 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </section>
    );
}