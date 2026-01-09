'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Search, ArrowRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { parcelsApi } from '@/lib/api';

interface ParcelData {
    id: string;
    trackingNumber: string;
    description: string;
    weight: number;
    status: string;
    currentLocation: string;
    estimatedDelivery: string;
    createdAt: string;
}

export default function TrackPage() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [parcel, setParcel] = useState<ParcelData | null>(null);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            toast.error('Veuillez entrer un numéro de tracking');
            return;
        }

        setLoading(true);
        setError('');
        setParcel(null);

        try {
            const data = await parcelsApi.trackParcel(trackingNumber.trim());
            setParcel(data);
            toast.success('Colis trouvé!');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Colis introuvable. Vérifiez le numéro de tracking.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'RECEIVED': 'bg-blue-100 text-blue-800',
            'IN_TRANSIT': 'bg-purple-100 text-purple-800',
            'CUSTOMS': 'bg-orange-100 text-orange-800',
            'AVAILABLE': 'bg-green-100 text-green-800',
            'DELIVERED': 'bg-green-600 text-white',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            'PENDING': 'En attente',
            'RECEIVED': 'Reçu',
            'IN_TRANSIT': 'En transit',
            'CUSTOMS': 'En douane',
            'AVAILABLE': 'Disponible pour retrait',
            'DELIVERED': 'Livré',
        };
        return labels[status] || status;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/yeng-logo.png"
                                alt="Yeng Shipping And Services"
                                className="h-12 w-auto object-contain"
                            />
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
                                        placeholder="Ex: PKG-2024-001"
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

                        {/* Parcel Details */}
                        {parcel && (
                            <div className="mt-8 space-y-4">
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Détails du colis</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(parcel.status)}`}>
                                            {getStatusLabel(parcel.status)}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Package className="h-5 w-5 text-gray-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Numéro de tracking</p>
                                                <p className="font-semibold text-gray-900">{parcel.trackingNumber}</p>
                                            </div>
                                        </div>

                                        {parcel.description && (
                                            <div className="flex items-start gap-3">
                                                <Package className="h-5 w-5 text-gray-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Description</p>
                                                    <p className="font-semibold text-gray-900">{parcel.description}</p>
                                                </div>
                                            </div>
                                        )}

                                        {parcel.currentLocation && (
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-600">Localisation actuelle</p>
                                                    <p className="font-semibold text-gray-900">{parcel.currentLocation}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Poids</p>
                                                <p className="font-semibold text-gray-900">{parcel.weight} lbs</p>
                                            </div>
                                        </div>
                                    </div>

                                    {parcel.status === 'AVAILABLE' && (
                                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-green-900">Colis prêt pour retrait!</p>
                                                    <p className="text-sm text-green-800 mt-1">
                                                        Votre colis est disponible à notre bureau. Connectez-vous pour plus de détails.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && !parcel && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800">{error}</p>
                            </div>
                        )}

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
