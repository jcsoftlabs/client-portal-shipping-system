export type ParcelStatus =
    | 'PENDING'
    | 'RECEIVED'
    | 'PROCESSING'
    | 'READY'
    | 'SHIPPED'
    | 'IN_TRANSIT'
    | 'CUSTOMS'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'EXCEPTION'
    | 'RETURNED'
    | 'CANCELLED';

export interface StatusConfig {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
}

export const STATUS_CONFIG: Record<ParcelStatus, StatusConfig> = {
    PENDING: {
        label: 'En attente',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        icon: '⏳'
    },
    RECEIVED: {
        label: 'Reçu à l\'entrepôt',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: '📦'
    },
    PROCESSING: {
        label: 'En traitement',
        color: 'text-cyan-700',
        bgColor: 'bg-cyan-50',
        borderColor: 'border-cyan-200',
        icon: '⚙️'
    },
    READY: {
        label: 'Prêt pour expédition',
        color: 'text-teal-700',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
        icon: '📋'
    },
    SHIPPED: {
        label: 'Expédié',
        color: 'text-violet-700',
        bgColor: 'bg-violet-50',
        borderColor: 'border-violet-200',
        icon: '🚢'
    },
    IN_TRANSIT: {
        label: 'En transit',
        color: 'text-purple-700',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: '✈️'
    },
    CUSTOMS: {
        label: 'En douane',
        color: 'text-orange-700',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: '🛃'
    },
    OUT_FOR_DELIVERY: {
        label: 'En cours de livraison',
        color: 'text-lime-700',
        bgColor: 'bg-lime-50',
        borderColor: 'border-lime-200',
        icon: '🚚'
    },
    DELIVERED: {
        label: 'Livré',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        icon: '🎉'
    },
    EXCEPTION: {
        label: 'Exception',
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '⚠️'
    },
    RETURNED: {
        label: 'Retourné',
        color: 'text-pink-700',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        icon: '↩️'
    },
    CANCELLED: {
        label: 'Annulé',
        color: 'text-gray-700',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: '❌'
    }
};

export function getStatusConfig(status: ParcelStatus): StatusConfig {
    return STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
}

export function getStatusBadgeClasses(status: ParcelStatus): string {
    const config = getStatusConfig(status);
    return `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.color} ${config.bgColor} ${config.borderColor}`;
}

