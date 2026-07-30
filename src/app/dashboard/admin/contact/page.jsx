'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Trash2, Search, User, Loader2, MessageSquare, AlertCircle, X, AlertTriangle } from 'lucide-react';
import { getAllContacts } from '@/lib/api/contacts';
import { deleteContact } from '@/lib/action/contacts';

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const fetchContacts = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await getAllContacts();
            if (res?.success) {
                setContacts(res.data || []);
            } else {
                setErrorMsg(res?.message || 'Failed to load contacts');
            }
        } catch (error) {
            setErrorMsg(error?.message || 'Something went wrong while fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchContacts();
    }, []);

    const handleConfirmDelete = async () => {
        if (!selectedDeleteId) return;

        const id = selectedDeleteId;
        setDeletingId(id);
        try {
            const res = await deleteContact(id);
            if (res?.success) {
                setContacts((prev) => prev.filter((contact) => contact._id !== id));
                setSelectedDeleteId(null); 
            } else {
                setErrorMsg(res?.message || 'Failed to delete message');
            }
        } catch (error) {
            setErrorMsg(error?.message || 'Error occurred while deleting');
        } finally {
            setDeletingId(null);
        }
    };

    // Filter contacts based on Search Query
    const filteredContacts = contacts.filter((item) => {
        const fullName = `${item.firstName || ''} ${item.lastName || ''}`.toLowerCase();
        const email = (item.email || '').toLowerCase();
        const message = (item.message || '').toLowerCase();
        const query = searchQuery.toLowerCase();

        return fullName.includes(query) || email.includes(query) || message.includes(query);
    });

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-6 relative">

            {/* --- PAGE HEADER & SEARCH BAR --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#262626] p-6 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-yellow-400" />
                        Contact Messages
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Manage and review user messages submitted through the contact form.
                    </p>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search name, email, message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#262626] focus:border-yellow-400 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* --- ERROR MESSAGE DISPLAYER --- */}
            {errorMsg && (
                <div className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                    <button onClick={() => setErrorMsg('')} className="hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* --- LOADING STATE --- */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                    <p className="text-xs text-zinc-500 font-medium">Loading messages...</p>
                </div>
            ) : filteredContacts.length === 0 ? (

                /* --- EMPTY STATE --- */
                <div className="bg-[#141414] border border-[#262626] rounded-2xl p-12 text-center space-y-3">
                    <MessageSquare className="w-10 h-10 text-zinc-600 mx-auto" />
                    <h3 className="text-sm font-semibold text-zinc-300">No Messages Found</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        {searchQuery
                            ? `No results found for "${searchQuery}". Try a different keyword.`
                            : 'There are no contact form submissions available at the moment.'}
                    </p>
                </div>
            ) : (

                /* --- CONTACT CARDS GRID --- */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredContacts.map((contact) => {
                        const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
                        const formattedDate = contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : 'N/A';

                        return (
                            <div
                                key={contact._id}
                                className="bg-[#141414] border border-[#262626] hover:border-yellow-400/30 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 group relative"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-3 border-b border-[#262626] pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white capitalize leading-snug">
                                                    {fullName || 'Anonymous'}
                                                </h3>
                                                <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                                                    <Calendar className="w-3 h-3 text-zinc-600" />
                                                    {formattedDate}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Delete Trigger Button - Opens Modal */}
                                        <button
                                            onClick={() => setSelectedDeleteId(contact._id)}
                                            title="Delete Message"
                                            className="p-2 bg-[#1a1a1a] hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-[#262626] hover:border-rose-500/30 rounded-xl transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="space-y-1.5 text-xs">
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="flex items-center gap-2 text-zinc-300 hover:text-yellow-400 transition-colors truncate"
                                        >
                                            <Mail className="w-3.5 h-3.5 text-yellow-400/70 shrink-0" />
                                            <span className="truncate">{contact.email}</span>
                                        </a>

                                        {contact.phone && (
                                            <a
                                                href={`tel:${contact.phone}`}
                                                className="flex items-center gap-2 text-zinc-300 hover:text-yellow-400 transition-colors"
                                            >
                                                <Phone className="w-3.5 h-3.5 text-yellow-400/70 shrink-0" />
                                                <span>{contact.phone}</span>
                                            </a>
                                        )}
                                    </div>

                                    {/* Message Body */}
                                    <div className="bg-[#1a1a1a] border border-[#262626] p-3.5 rounded-xl text-xs text-zinc-300 leading-relaxed break-words mt-3">
                                        <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wider mb-1">
                                            Message:
                                        </p>
                                        {contact.message}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {selectedDeleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#141414] border border-[#262626] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 relative">

                        {/* Modal Header Icon */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Delete Contact Message</h3>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Are you sure you want to delete this message?
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-500 bg-[#1a1a1a] p-3 rounded-xl border border-[#262626]">
                            This action cannot be undone. The message will be permanently removed from your dashboard.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setSelectedDeleteId(null)}
                                disabled={deletingId !== null}
                                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-[#1a1a1a] hover:bg-[#222222] border border-[#262626] rounded-xl transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                disabled={deletingId !== null}
                                className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                                {deletingId ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Confirm Delete</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}