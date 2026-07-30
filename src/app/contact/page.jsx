'use client';

import React, { useState } from 'react';
import { ArrowUpRight, HelpCircle, Mail, Minus, Plus, Send, Share, Loader2 } from 'lucide-react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { sentContact } from '@/lib/action/contacts';


export default function ContactPage() {
    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        agree: false,
    });

    // Loading & Feedback States
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // FAQ Accordion State
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            question: 'What is FutureTech?',
            answer: 'FutureTech is a platform dedicated to exploring AI innovations, web development trends, and modern tech ecosystems through articles, podcasts, and curated resources.'
        },
        {
            question: 'How can I listen to your podcasts?',
            answer: 'You can stream all podcast episodes directly from our website on the Podcast page or listen on popular platforms like Spotify and Apple Podcasts.'
        },
        {
            question: 'Are your podcasts free to listen to?',
            answer: 'Yes, all our podcast episodes, articles, and downloadable whitepapers are 100% free for the community.'
        },
        {
            question: 'Can I download episodes to listen offline?',
            answer: 'Currently, you can download resource PDFs directly from our Resources section. Direct audio downloads are coming soon.'
        },
        {
            question: 'How often do you release new episodes?',
            answer: 'We release new podcast episodes weekly, usually on Mondays, featuring industry experts and thought leaders.'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: '', text: '' });

        if (!formData.agree) {
            setStatusMessage({ type: 'error', text: 'Please agree to the Terms of Use and Privacy Policy.' });
            return;
        }

        setLoading(true);

        try {
            // Unpack data (excluding the client-only 'agree' field if not needed by backend)
            const { agree, ...payload } = formData;

            const res = await sentContact(payload);

            if (res?.success) {
                setStatusMessage({
                    type: 'success',
                    text: 'Thank you! Your message has been sent successfully.'
                });

                // Reset Form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    agree: false,
                });
            } else {
                setStatusMessage({
                    type: 'error',
                    text: res?.message || 'Something went wrong. Please try again.'
                });
            }
        } catch (error) {
            setStatusMessage({
                type: 'error',
                text: error?.message || 'Failed to send message. Please check your network connection.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 py-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* General Inquiries */}
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4 hover:border-yellow-400/30 transition-all">
                        <h3 className="text-sm font-medium text-zinc-400">General Inquiries</h3>
                        <div className="space-y-2">
                            <a
                                href="mailto:contact@futuretech.com"
                                className="flex items-center justify-between text-xs font-semibold text-white bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] hover:text-yellow-400 transition-colors"
                            >
                                <span className="truncate">contact@futuretech.com</span>
                                <ArrowUpRight className="w-4 h-4 text-yellow-400 shrink-0 ml-1" />
                            </a>
                            <a
                                href="tel:+11234567890"
                                className="flex items-center justify-between text-xs font-semibold text-white bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] hover:text-yellow-400 transition-colors"
                            >
                                <span>+1 (123) 456-7890</span>
                                <ArrowUpRight className="w-4 h-4 text-yellow-400 shrink-0 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Technical Support */}
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4 hover:border-yellow-400/30 transition-all">
                        <h3 className="text-sm font-medium text-zinc-400">Technical Support</h3>
                        <div className="space-y-2">
                            <a
                                href="mailto:support@futuretech.com"
                                className="flex items-center justify-between text-xs font-semibold text-white bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] hover:text-yellow-400 transition-colors"
                            >
                                <span className="truncate">support@futuretech.com</span>
                                <ArrowUpRight className="w-4 h-4 text-yellow-400 shrink-0 ml-1" />
                            </a>
                            <a
                                href="tel:+11234567890"
                                className="flex items-center justify-between text-xs font-semibold text-white bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] hover:text-yellow-400 transition-colors"
                            >
                                <span>+1 (123) 456-7890</span>
                                <ArrowUpRight className="w-4 h-4 text-yellow-400 shrink-0 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Our Office */}
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4 hover:border-yellow-400/30 transition-all">
                        <h3 className="text-sm font-medium text-zinc-400">Our Office</h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                            Address: 123 AI Tech Avenue, Techville, 54321
                        </p>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full text-xs font-semibold text-white bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] hover:text-yellow-400 transition-colors"
                        >
                            <span>Get Directions</span>
                            <ArrowUpRight className="w-4 h-4 text-yellow-400" />
                        </a>
                    </div>

                    {/* Connect with Us */}
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4 hover:border-yellow-400/30 transition-all">
                        <h3 className="text-sm font-medium text-zinc-400">Connect with Us</h3>
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="#"
                                className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all"
                            >
                                <Share className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-zinc-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>


                {/* --- 2. GET IN TOUCH FORM SECTION --- */}
                <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Title Box */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Get in Touch with FutureTech
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Have questions, feedback, or collaboration ideas? Fill out the form and our team will get back to you shortly.
                        </p>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Status Message Display */}
                            {statusMessage.text && (
                                <div
                                    className={`p-4 rounded-xl text-xs font-medium border ${statusMessage.type === 'success'
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                        }`}
                                >
                                    {statusMessage.text}
                                </div>
                            )}

                            {/* First & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Enter your Message"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl p-4 text-xs text-white placeholder-zinc-600 outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Bottom Terms & Submit */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-400 select-none">
                                    <input
                                        type="checkbox"
                                        checked={formData.agree}
                                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                        className="w-4 h-4 rounded bg-[#1a1a1a] border-[#262626] accent-yellow-400 cursor-pointer"
                                    />
                                    <span>I agree with Terms of Use and Privacy Policy</span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto px-8 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/50 disabled:cursor-not-allowed text-black font-bold text-xs rounded-xl transition-all shadow-md shadow-yellow-400/10 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span>Sending...</span>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Send</span>
                                            <Send className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>


                {/* --- 3. ASKED QUESTION (FAQ) SECTION --- */}
                <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left CTA */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Asked questions
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            If the question is not available in our FAQ section, feel free to contact us personally, we will resolve your respective doubts.
                        </p>
                        <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] border border-[#262626] hover:border-yellow-400/40 text-xs font-semibold text-white rounded-xl transition-all">
                            Ask Question <ArrowUpRight className="w-4 h-4 text-yellow-400" />
                        </button>
                    </div>

                    {/* Right Accordion List */}
                    <div className="lg:col-span-7 space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-[#1a1a1a] border border-[#262626] rounded-2xl overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-semibold text-white hover:text-yellow-400 transition-colors"
                                    >
                                        <span>{faq.question}</span>
                                        <div className="w-6 h-6 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-yellow-400 shrink-0 ml-3">
                                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-[#262626]/50">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}