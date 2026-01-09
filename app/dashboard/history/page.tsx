'use client';

import { useQuery } from '@tanstack/react-query';
import { parcelsApi } from '@/lib/api';
import { Package, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function HistoryPage() {
    const { data: parcels, isLoading } = useQuery({
        queryKey: ['my-parcels'],
        queryFn: parcelsApi.getMyParcels,
    });

    const deliveredParcels = parcels?.filter((p: any) => p.status === 'DELIVERED') || [];
    const totalSpent = Number(deliveredParcels.reduce((sum: number, p: any) => sum + (parseFloat(p.declaredValue) || 0), 0)) || 0;
    const totalWeight = Number(deliveredParcels.reduce((sum: number, p: any) => sum + (parseFloat(p.weight) || 0), 0)) || 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Historique</h1>
                <p className="mt-2 text-gray-800">Tous vos colis livrés</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Colis livrés</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{deliveredParcels.length}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Package className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Total dépensé</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Poids total</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{totalWeight.toFixed(1)} lbs</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Depuis</p>
                            <p className="mt-2 text-lg font-bold text-gray-900">
                                {deliveredParcels.length > 0
                                    ? new Date(deliveredParcels[deliveredParcels.length - 1].createdAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
                                    : 'N/A'
                                }
                            </p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                        <p className="mt-2 text-sm text-gray-700">Chargement...</p>
                    </div>
                ) : deliveredParcels.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {deliveredParcels.map((parcel: any) => (
                            <div key={parcel.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                                            <Package className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Colis #{parcel.trackingNumber}</h3>
                                            <p className="text-sm text-gray-800 mt-1">{parcel.description || 'Sans description'}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                                                <div>
                                                    <p className="text-gray-700">Livré le</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {new Date(parcel.updatedAt).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Poids</p>
                                                    <p className="font-semibold text-gray-900">{parcel.weight} lbs</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Valeur</p>
                                                    <p className="font-semibold text-gray-900">${parcel.declaredValue}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">Hub</p>
                                                    <p className="font-semibold text-gray-900">{parcel.hub || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        Livré
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-700">Aucun colis livré pour le moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}
