'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { parcelsApi, invoicesApi } from '@/lib/api';
import { ArrowLeft, Package, MapPin, DollarSign, CreditCard, Calendar, Weight, Ruler, FileText } from 'lucide-react';
import Link from 'next/link';
import { getStatusConfig, getStatusBadgeClasses, ParcelStatus } from '@/lib/utils/parcel-status';
import { formatDate, formatCurrency, getRelativeTime } from '@/lib/utils/date-format';
import PaymentModal from '@/components/payment-modal';

export default function ParcelDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const trackingNumber = params.trackingNumber as string;

    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        invoiceId?: number;
        amount?: number;
    }>({ isOpen: false });

    const { data: parcel, isLoading, refetch } = useQuery({
        queryKey: ['parcel', trackingNumber],
        queryFn: () => parcelsApi.getParcelByTracking(trackingNumber),
    });

    const { data: history } = useQuery({
        queryKey: ['parcel-history', parcel?.id],
        queryFn: () => parcelsApi.getParcelHistory(parcel!.id),
        enabled: !!parcel?.id,
    });

    const { data: invoices } = useQuery({
        queryKey: ['my-invoices'],
        queryFn: invoicesApi.getMyInvoices,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-700">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!parcel) {
        return (
            <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Colis introuvable</h2>
                <p className="text-gray-800 mb-6">Le numéro de tracking {trackingNumber} n'existe pas.</p>
                <Link
                    href="/dashboard/parcels"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour à mes colis
                </Link>
            </div>
        );
    }

    const invoice = invoices?.find((inv: any) => {
        // Check if any invoice item matches this parcel
        return inv.items?.some((item: any) => item.parcelId === parcel.id) && inv.status !== 'PAID';
    });
    const statusConfig = getStatusConfig(parcel.status as ParcelStatus);

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link
                href="/dashboard/parcels"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Retour à mes colis
            </Link>

            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Colis #{parcel.trackingNumber}</h1>
                            <p className="text-gray-800 mt-1">{parcel.description || 'Sans description'}</p>
                            <p className="text-sm text-gray-700 mt-2">
                                Créé {getRelativeTime(parcel.createdAt)} • {formatDate(parcel.createdAt)}
                            </p>
                        </div>
                    </div>
                    <span className={getStatusBadgeClasses(parcel.status as ParcelStatus)}>
                        <span className="text-lg">{statusConfig.icon}</span>
                        {statusConfig.label}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Parcel Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Informations du colis</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <Weight className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-700">Poids</p>
                                    <p className="font-semibold text-gray-900">{parcel.weight} lbs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <DollarSign className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-700">Valeur déclarée</p>
                                    <p className="font-semibold text-gray-900">${parcel.declaredValue}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Ruler className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-700">Dimensions</p>
                                    <p className="font-semibold text-gray-900">
                                        {parcel.length || 'N/A'} x {parcel.width || 'N/A'} x {parcel.height || 'N/A'} in
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-700">Hub</p>
                                    <p className="font-semibold text-gray-900">{parcel.hub || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Suivi du colis</h2>
                        {history && history.length > 0 ? (
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                                <div className="space-y-6">
                                    {history.map((event: any) => {
                                        const eventStatus = getStatusConfig(event.newStatus as ParcelStatus);
                                        return (
                                            <div key={event.id} className="relative flex gap-4">
                                                {/* Timeline Dot */}
                                                <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${eventStatus.bgColor} ${eventStatus.borderColor} border-2`}>
                                                    <span className="text-sm">{eventStatus.icon}</span>
                                                </div>

                                                {/* Event Content */}
                                                <div className="flex-1 pb-6">
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div>
                                                                <p className={`font-semibold ${eventStatus.color}`}>
                                                                    {eventStatus.label}
                                                                </p>
                                                                {event.location && (
                                                                    <p className="text-sm text-gray-800 mt-1">
                                                                        📍 {event.location}
                                                                    </p>
                                                                )}
                                                                {event.description && (
                                                                    <p className="text-sm text-gray-800 mt-1">
                                                                        {event.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="text-right flex-shrink-0">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {formatDate(event.createdAt)}
                                                                </p>
                                                                <p className="text-xs text-gray-700">
                                                                    {new Date(event.createdAt).toLocaleTimeString('fr-FR', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-700">Aucun historique disponible</p>
                            </div>
                        )}
                    </div>

                    {/* Photos Section */}
                    {parcel.photos && parcel.photos.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Photos du colis</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {parcel.photos.map((photo: any) => (
                                    <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={photo.url}
                                            alt="Photo du colis"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Invoice Card */}
                    {invoice ? (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border-2 border-amber-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 p-2 rounded-lg">
                                    <FileText className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-900">Facture en attente</h3>
                                    <p className="text-sm text-amber-700">Facture #{invoice.invoiceNumber}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-amber-800">Frais de shipping</span>
                                    <span className="font-semibold text-amber-900">{formatCurrency(invoice.shippingFee || 0)}</span>
                                </div>
                                {invoice.customsFee > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-amber-800">Frais de douane</span>
                                        <span className="font-semibold text-amber-900">{formatCurrency(invoice.customsFee)}</span>
                                    </div>
                                )}
                                {invoice.storageFee > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-amber-800">Frais de stockage</span>
                                        <span className="font-semibold text-amber-900">{formatCurrency(invoice.storageFee)}</span>
                                    </div>
                                )}
                                <div className="border-t border-amber-200 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-amber-900">Total</span>
                                        <span className="font-bold text-2xl text-amber-900">
                                            {formatCurrency(invoice.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setPaymentModal({
                                    isOpen: true,
                                    invoiceId: invoice.id,
                                    amount: parseFloat(invoice.total)
                                })}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                <CreditCard className="h-5 w-5" />
                                Payer maintenant
                            </button>

                            <p className="text-xs text-center text-amber-700 mt-3">
                                Paiement sécurisé par Stripe
                            </p>
                        </div>
                    ) : (
                        <div className="bg-green-50 rounded-xl shadow-sm border border-green-200 p-6">
                            <div className="text-center">
                                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <p className="font-semibold text-green-900">Aucune facture en attente</p>
                                <p className="text-sm text-green-700 mt-1">Tous les paiements sont à jour</p>
                            </div>
                        </div>
                    )}

                    {/* Sender Info */}
                    {parcel.senderName && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-3">Expéditeur</h3>
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-gray-900">{parcel.senderName}</p>
                                {parcel.senderAddress && (
                                    <p className="text-gray-800">{parcel.senderAddress}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* USA Address */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-3">Adresse USA utilisée</h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-mono font-semibold text-blue-900">
                                {parcel.customAddress?.addressCode || 'N/A'}
                            </p>
                            {parcel.customAddress && (
                                <>
                                    <p className="text-gray-700">{parcel.customAddress.streetAddress}</p>
                                    <p className="text-gray-700">
                                        {parcel.customAddress.city}, {parcel.customAddress.state} {parcel.customAddress.zipCode}
                                    </p>
                                    <p className="text-gray-700">{parcel.customAddress.country}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={paymentModal.isOpen}
                onClose={() => setPaymentModal({ isOpen: false })}
                invoiceId={paymentModal.invoiceId!}
                amount={paymentModal.amount!}
                trackingNumber={parcel.trackingNumber}
                onSuccess={() => {
                    refetch();
                    setPaymentModal({ isOpen: false });
                }}
            />
        </div>
    );
}
