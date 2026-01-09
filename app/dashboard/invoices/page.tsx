'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/lib/api';
import { FileText, Download, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import PaymentModal from '@/components/payment-modal';

export default function InvoicesPage() {
    const queryClient = useQueryClient();
    const { data: invoices, isLoading } = useQuery({
        queryKey: ['my-invoices'],
        queryFn: invoicesApi.getMyInvoices,
    });

    const [paymentModal, setPaymentModal] = useState<{
        isOpen: boolean;
        invoiceId?: string;
        amount?: number;
        invoiceNumber?: string;
    }>({ isOpen: false });

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { bg: string; text: string; label: string; icon: any }> = {
            PAID: { bg: 'bg-green-100', text: 'text-green-700', label: 'Payée', icon: CheckCircle },
            PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En attente', icon: Clock },
            OVERDUE: { bg: 'bg-red-100', text: 'text-red-700', label: 'En retard', icon: Clock },
        };
        const badge = badges[status] || badges.PENDING;
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                <Icon className="h-3 w-3" />
                {badge.label}
            </span>
        );
    };

    const handleDownload = (invoiceId: string) => {
        toast.info('Téléchargement en cours...');
    };

    const handlePay = (invoice: any) => {
        setPaymentModal({
            isOpen: true,
            invoiceId: invoice.id,
            amount: parseFloat(invoice.total),
            invoiceNumber: invoice.invoiceNumber,
        });
    };

    const handlePaymentSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['my-invoices'] });
        toast.success('Paiement effectué avec succès !');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Mes Factures</h1>
                <p className="mt-2 text-gray-800">Consultez et gérez vos factures</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Total Factures</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{invoices?.length || 0}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">En attente</p>
                            <p className="mt-2 text-3xl font-bold text-yellow-600">
                                {invoices?.filter((inv: any) => inv.status === 'PENDING').length || 0}
                            </p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Payées</p>
                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {invoices?.filter((inv: any) => inv.status === 'PAID').length || 0}
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                        <p className="mt-2 text-sm text-gray-700">Chargement...</p>
                    </div>
                ) : invoices && invoices.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {invoices.map((invoice: any) => (
                            <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4 flex-1">
                                        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                                            <FileText className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">Facture #{invoice.invoiceNumber}</h3>
                                                    <p className="text-sm text-gray-800 mt-1">
                                                        {new Date(invoice.createdAt).toLocaleDateString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                                {getStatusBadge(invoice.status)}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                                                <div>
                                                    <p className="text-gray-700">Montant</p>
                                                    <p className="font-bold text-gray-900 text-lg">${invoice.total || '0.00'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Articles</p>
                                                    <p className="font-semibold text-gray-900">{invoice.items?.length || 0}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Date limite</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {invoice.dueDate
                                                            ? new Date(invoice.dueDate).toLocaleDateString('fr-FR')
                                                            : 'N/A'
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Méthode</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {invoice.paymentMethod || 'En attente'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex gap-3">
                                                <button
                                                    onClick={() => handleDownload(invoice.id)}
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Télécharger
                                                </button>
                                                {invoice.status !== 'PAID' && (
                                                    <button
                                                        onClick={() => handlePay(invoice)}
                                                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                                                    >
                                                        <DollarSign className="h-4 w-4" />
                                                        Payer maintenant
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-700">Aucune facture pour le moment</p>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {paymentModal.isOpen && paymentModal.invoiceId && (
                <PaymentModal
                    isOpen={paymentModal.isOpen}
                    onClose={() => setPaymentModal({ isOpen: false })}
                    invoiceId={parseInt(paymentModal.invoiceId)}
                    amount={paymentModal.amount || 0}
                    trackingNumber={paymentModal.invoiceNumber || ''}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}
