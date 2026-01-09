'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { parcelsApi, invoicesApi } from '@/lib/api';
import { Package, Search, Filter, Eye, DollarSign, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { getStatusConfig, getStatusBadgeClasses, ParcelStatus } from '@/lib/utils/parcel-status';
import { formatDate, formatCurrency } from '@/lib/utils/date-format';
import PaymentModal from '@/components/payment-modal';

export default function ParcelsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        invoiceId?: number;
        amount?: number;
        trackingNumber?: string;
    }>({ isOpen: false });

    const { data: parcels, isLoading, refetch } = useQuery({
        queryKey: ['my-parcels'],
        queryFn: parcelsApi.getMyParcels,
    });

    const { data: invoices } = useQuery({
        queryKey: ['my-invoices'],
        queryFn: invoicesApi.getMyInvoices,
    });

    const filteredParcels = parcels?.filter((parcel: any) => {
        // Normalize: remove hyphens, spaces, and convert to lowercase
        const normalize = (str: string) => str.replace(/[-\s]/g, '').toLowerCase();
        const searchNormalized = normalize(searchTerm);

        const matchesSearch = normalize(parcel.trackingNumber).includes(searchNormalized) ||
            parcel.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || parcel.status === statusFilter;
        return matchesSearch && matchesStatus;
    }) || [];

    // Find invoice for a parcel
    const getParcelInvoice = (parcelId: number) => {
        return invoices?.find((inv: any) =>
            inv.parcel?.id === parcelId && inv.status !== 'PAID'
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mes Colis</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-800">Gérez et suivez tous vos colis</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base text-gray-900"
                        >
                            <option value="ALL">Tous les statuts</option>
                            <option value="PENDING">En attente</option>
                            <option value="RECEIVED_AT_WAREHOUSE">Reçu à l'entrepôt</option>
                            <option value="IN_TRANSIT">En transit</option>
                            <option value="ARRIVED_IN_HAITI">Arrivé en Haïti</option>
                            <option value="READY_FOR_PICKUP">Prêt pour retrait</option>
                            <option value="DELIVERED">Livré</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Parcels List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                        <p className="mt-2 text-sm text-gray-700">Chargement...</p>
                    </div>
                ) : filteredParcels.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {filteredParcels.map((parcel: any) => (
                            <Link
                                key={parcel.id}
                                href={`/dashboard/parcels/${parcel.trackingNumber}`}
                                className="block p-3 sm:p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                    <div className="flex gap-2 sm:gap-4 flex-1">
                                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 sm:p-3 rounded-lg flex-shrink-0">
                                            <Package className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2 sm:gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm sm:text-base font-bold text-gray-900">Colis #{parcel.trackingNumber}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-800 mt-0.5 sm:mt-1 truncate">{parcel.description || 'Sans description'}</p>
                                                </div>
                                                <span className={getStatusBadgeClasses(parcel.status as ParcelStatus) + " text-xs sm:text-sm"}>
                                                    <span>{getStatusConfig(parcel.status as ParcelStatus).icon}</span>
                                                    {getStatusConfig(parcel.status as ParcelStatus).label}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2 sm:mt-4 text-xs sm:text-sm">
                                                <div>
                                                    <p className="text-gray-700">Valeur</p>
                                                    <p className="font-semibold text-gray-900">${parcel.declaredValue}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Date</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatDate(parcel.createdAt)}
                                                    </p>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <p className="text-gray-700">Poids</p>
                                                    <p className="font-semibold text-gray-900">{parcel.weight} lbs</p>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <p className="text-gray-700">Hub</p>
                                                    <p className="font-semibold text-gray-900">{parcel.hub || 'N/A'}</p>
                                                </div>
                                            </div>

                                            {/* Invoice Section */}
                                            {(() => {
                                                const invoice = getParcelInvoice(parcel.id);
                                                if (invoice) {
                                                    return (
                                                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                                                                    <div>
                                                                        <p className="text-xs sm:text-sm font-semibold text-amber-900">
                                                                            Facture en attente
                                                                        </p>
                                                                        <p className="text-xs text-amber-700">
                                                                            {formatCurrency(invoice.totalAmount)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => setPaymentModal({
                                                                        isOpen: true,
                                                                        invoiceId: invoice.id,
                                                                        amount: invoice.totalAmount,
                                                                        trackingNumber: parcel.trackingNumber
                                                                    })}
                                                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
                                                                >
                                                                    <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                                    Payer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-700">
                            {searchTerm || statusFilter !== 'ALL'
                                ? 'Aucun colis trouvé avec ces critères'
                                : 'Aucun colis pour le moment'
                            }
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Utilisez votre adresse USA pour commencer à recevoir des colis
                        </p>
                    </div>
                )}
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
        </div >
    );
}
