'use client';

import { useQuery } from '@tanstack/react-query';
import { addressesApi, authApi } from '@/lib/api';
import { MapPin, Copy, Download, Share2, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function MyAddressPage() {
    const { data: address, isLoading } = useQuery({
        queryKey: ['primary-address'],
        queryFn: addressesApi.getPrimaryAddress,
    });

    const { data: user } = useQuery({
        queryKey: ['user-profile'],
        queryFn: authApi.getMe,
    });

    // Debug logging
    if (typeof window !== 'undefined') {
        console.log('Address data:', address);
        console.log('User data from API:', user);
    }

    // Try to get name from multiple sources
    const clientName = (() => {
        // First try: user from address object
        if (address?.user) {
            const firstName = address.user.firstName || address.user.first_name || '';
            const lastName = address.user.lastName || address.user.last_name || '';
            if (firstName || lastName) {
                return `${firstName} ${lastName}`.trim();
            }
        }

        // Second try: user from separate API call
        if (user) {
            const firstName = user.firstName || user.first_name || '';
            const lastName = user.lastName || user.last_name || '';
            if (firstName || lastName) {
                return `${firstName} ${lastName}`.trim();
            }
        }

        // Fallback
        return 'Chargement...';
    })();

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${label} copié dans le presse-papier !`);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const fullAddress = address
        ? `${address.addressCode}\n${clientName}\n${address.usStreet}\n${address.usCity}, ${address.usState} ${address.usZipcode}\nUnited States`
        : '';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="mt-4 text-gray-800">Chargement de votre adresse...</p>
                </div>
            </div>
        );
    }

    if (!address) {
        return (
            <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-800">Aucune adresse trouvée</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Mon Adresse USA</h1>
                <p className="mt-2 text-gray-800">Utilisez cette adresse pour tous vos achats en ligne</p>
            </div>

            {/* Main Address Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">🇺🇸 Votre Adresse Personnalisée</h2>
                        <p className="text-blue-100">Code unique : {address.addressCode}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-sm font-semibold">Hub: {address.hub}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 text-gray-900">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <p className="text-lg font-bold text-blue-600">{address.addressCode}</p>
                            <button
                                onClick={() => copyToClipboard(address.addressCode, 'Code')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Copy className="h-5 w-5 text-gray-800" />
                            </button>
                        </div>
                        <p className="font-semibold text-gray-900">{clientName}</p>
                        <p className="text-gray-700">{address.usStreet}</p>
                        <p className="text-gray-700">{address.usCity}, {address.usState} {address.usZipcode}</p>
                        <p className="text-gray-700 font-semibold">United States</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => copyToClipboard(fullAddress, 'Adresse complète')}
                        className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Copy className="h-5 w-5" />
                        Copier l'adresse
                    </button>
                    <button
                        onClick={() => toast.info('Fonctionnalité bientôt disponible')}
                        className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Download className="h-5 w-5" />
                        Télécharger PDF
                    </button>
                    <button
                        onClick={() => toast.info('Fonctionnalité bientôt disponible')}
                        className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Share2 className="h-5 w-5" />
                        Partager
                    </button>
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Comment utiliser votre adresse
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Faites vos achats en ligne</h4>
                            <p className="text-gray-800 text-sm">
                                Achetez sur Amazon, eBay, Walmart, ou n'importe quel site américain
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Utilisez votre adresse USA</h4>
                            <p className="text-gray-800 text-sm">
                                Copiez votre adresse complète dans l'adresse de livraison. <strong>N'oubliez pas d'inclure votre code {address.addressCode}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Suivez votre colis</h4>
                            <p className="text-gray-800 text-sm">
                                Une fois livré à notre hub, vous recevrez une notification. Suivez votre colis en temps réel depuis votre espace client
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            4
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Recevez en Haïti</h4>
                            <p className="text-gray-800 text-sm">
                                Nous livrons votre colis à votre adresse en Haïti en 7-10 jours
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ Important</h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>Incluez toujours votre code <strong>{address.addressCode}</strong> dans l'adresse</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>Vérifiez que le vendeur livre bien aux États-Unis</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>Les articles interdits (armes, produits dangereux) ne seront pas acceptés</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>Conservez vos reçus d'achat pour la déclaration en douane</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
