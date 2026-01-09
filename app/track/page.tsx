'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Search, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function TrackPage() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            toast.error('Veuillez entrer un numéro de tracking');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.info('Fonctionnalité de tracking public bientôt disponible');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Package className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                                Haiti Shipping
                            </span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                            >
                                S'inscrire
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Suivez votre colis
                        </h1>
                        <p className="text-xl text-gray-800">
                            Entrez votre numéro de tracking pour voir où se trouve votre colis
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleTrack} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Numéro de tracking
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                                    <input
                                        type="text"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        placeholder="Ex: 1Z999AA10123456784"
                                        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? 'Recherche...' : 'Suivre mon colis'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900">
                                💡 <strong>Astuce :</strong> Vous pouvez trouver votre numéro de tracking dans l'email de confirmation ou sur votre compte client
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-800">
                            Vous avez un compte ?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Connectez-vous
                            </Link>{' '}
                            pour voir tous vos colis
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
