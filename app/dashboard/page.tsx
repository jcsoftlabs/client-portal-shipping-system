'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parcelsApi, addressesApi, invoicesApi, authApi } from '@/lib/api';
import { Package, MapPin, Clock, CheckCircle, Copy, ExternalLink, Eye, DollarSign, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { getStatusConfig, getStatusBadgeClasses, ParcelStatus } from '@/lib/utils/parcel-status';
import { formatDate, formatCurrency } from '@/lib/utils/date-format';
import PaymentModal from '@/components/payment-modal';

export default function DashboardPage() {
    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        invoiceId?: number;
        amount?: number;
        trackingNumber?: string;
    }>({ isOpen: false });

    const { data: parcels, isLoading: parcelsLoading, refetch } = useQuery({
        queryKey: ['my-parcels'],
        queryFn: parcelsApi.getMyParcels,
    });

    const { data: address } = useQuery({
        queryKey: ['primary-address'],
        queryFn: addressesApi.getPrimaryAddress,
    });

    const { data: invoices } = useQuery({
        queryKey: ['my-invoices'],
        queryFn: invoicesApi.getMyInvoices,
    });

    const { data: user } = useQuery({
        queryKey: ['user-profile'],
        queryFn: authApi.getMe,
    });

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${label} copié !`);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Find invoice for a parcel
    const getParcelInvoice = (parcelId: number) => {
        return invoices?.find((inv: any) =>
            inv.parcel?.id === parcelId && inv.status !== 'PAID'
        );
    };

    // Get client name from user or address
    const clientName = (() => {
        if (user) {
            const firstName = user.firstName || user.first_name || '';
            const lastName = user.lastName || user.last_name || '';
            if (firstName || lastName) {
                return `${firstName} ${lastName}`.trim();
            }
        }
        if (address?.user) {
            const firstName = address.user.firstName || address.user.first_name || '';
            const lastName = address.user.lastName || address.user.last_name || '';
            if (firstName || lastName) {
                return `${firstName} ${lastName}`.trim();
            }
        }
        return 'Votre Nom';
    })();

    const recentParcels = parcels?.slice(0, 5) || [];
    const readyParcels = parcels?.filter((p: any) => p.status === 'READY' || p.status === 'OUT_FOR_DELIVERY').length || 0;
    const inTransitParcels = parcels?.filter((p: any) => p.status === 'IN_TRANSIT' || p.status === 'SHIPPED').length || 0;

    return (
        <div className="space-y-4 sm:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-800">Bienvenue dans votre espace client</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">Total Colis</p>
                            <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{parcels?.length || 0}</p>
                        </div>
                        <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">Prêts à retirer</p>
                            <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{readyParcels}</p>
                        </div>
                        <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-800">En transit</p>
                            <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{inTransitParcels}</p>
                        </div>
                        <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* USA Address Card */}
            {address && (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold mb-1">🇺🇸 Votre Adresse USA</h2>
                            <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Utilisez cette adresse pour vos achats en ligne</p>
                        </div>
                        <Link
                            href="/dashboard/my-address"
                            className="text-white hover:text-blue-100 transition-colors"
                        >
                            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-base sm:text-lg font-bold">{address.addressCode}</p>
                            <button
                                onClick={() => copyToClipboard(address.addressCode, 'Code')}
                                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                        </div>
                        <div className="text-xs sm:text-sm space-y-1 text-blue-50">
                            <p className="font-semibold text-white">{clientName}</p>
                            <p>{address.usStreet}</p>
                            <p>{address.usCity}, {address.usState} {address.usZipcode}</p>
                            <p className="hidden sm:block">United States</p>
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 flex gap-2">
                        <button
                            onClick={() => copyToClipboard(
                                `${address.addressCode}\n${address.usStreet}\n${address.usCity}, ${address.usState} ${address.usZipcode}`,
                                'Adresse'
                            )}
                            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                        >
                            Copier
                        </button>
                        <Link
                            href="/dashboard/my-address"
                            className="flex-1 bg-white text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors text-center"
                        >
                            Détails
                        </Link>
                    </div>
                </div>
            )}

            {/* Recent Parcels */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Colis Récents</h2>
                        <Link
                            href="/dashboard/parcels"
                            className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Voir tout →
                        </Link>
                    </div>
                </div>

                <div className="p-3 sm:p-6">
                    {parcelsLoading ? (
                        <div className="text-center py-8">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                            <p className="mt-2 text-sm text-gray-700">Chargement...</p>
                        </div>
                    ) : recentParcels.length > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                            {recentParcels.map((parcel: any) => {
                                const invoice = getParcelInvoice(parcel.id);
                                return (
                                    <Link
                                        key={parcel.id}
                                        href={`/dashboard/parcels/${parcel.trackingNumber}`}
                                        className="block p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                                            <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 sm:p-3 rounded-lg flex-shrink-0">
                                                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-1 sm:mb-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm sm:text-base font-semibold text-gray-900">Colis #{parcel.trackingNumber}</p>
                                                            <p className="text-xs sm:text-sm text-gray-700 truncate">{parcel.description || 'Sans description'}</p>
                                                        </div>
                                                        <span className={getStatusBadgeClasses(parcel.status as ParcelStatus) + " text-xs sm:text-sm"}>
                                                            <span>{getStatusConfig(parcel.status as ParcelStatus).icon}</span>
                                                            {getStatusConfig(parcel.status as ParcelStatus).label}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-800 mt-1 sm:mt-2">
                                                        <span className="hidden sm:inline">{parcel.weight} lbs</span>
                                                        <span className="hidden sm:inline">•</span>
                                                        <span>{formatDate(parcel.createdAt)}</span>
                                                    </div>

                                                    {/* Invoice Badge */}
                                                    {invoice && (
                                                        <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs sm:text-sm">
                                                            <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                                                            <span className="font-semibold text-amber-900">
                                                                <span className="hidden sm:inline">Facture : </span>{formatCurrency(invoice.totalAmount)}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setPaymentModal({
                                                                        isOpen: true,
                                                                        invoiceId: invoice.id,
                                                                        amount: invoice.totalAmount,
                                                                        trackingNumber: parcel.trackingNumber
                                                                    });
                                                                }}
                                                                className="ml-1 sm:ml-2 inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                                            >
                                                                <CreditCard className="h-3 w-3" />
                                                                Payer
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-700">Aucun colis pour le moment</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Utilisez votre adresse USA pour commencer à recevoir des colis
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={paymentModal.isOpen}
                onClose={() => setPaymentModal({ isOpen: false })}
                invoiceId={paymentModal.invoiceId!}
                amount={paymentModal.amount!}
                trackingNumber={paymentModal.trackingNumber!}
                onSuccess={() => {
                    refetch();
                    setPaymentModal({ isOpen: false });
                }}
            />
        </div>
    );
}
