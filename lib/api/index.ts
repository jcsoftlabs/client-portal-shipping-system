import apiClient from './client';

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/api/auth/login', { email, password });
        return response.data;
    },

    register: async (data: any) => {
        const response = await apiClient.post('/api/auth/register', data);
        return response.data;
    },

    getMe: async () => {
        const response = await apiClient.get('/api/users/me');
        return response.data.data;
    },
};

export const parcelsApi = {
    getMyParcels: async () => {
        const response = await apiClient.get('/api/parcels/my-parcels');
        return response.data.data;
    },

    getParcelById: async (id: string) => {
        const response = await apiClient.get(`/api/parcels/${id}`);
        return response.data.data;
    },

    getParcelByTracking: async (trackingNumber: string) => {
        const response = await apiClient.get(`/api/parcels/tracking/${trackingNumber}`);
        return response.data.data;
    },

    getParcelHistory: async (id: number) => {
        const response = await apiClient.get(`/api/parcels/${id}/history`);
        return response.data.data;
    },

    trackParcel: async (trackingNumber: string) => {
        const response = await apiClient.get(`/api/parcels/tracking/${trackingNumber}`);
        return response.data.data;
    },
};

export const addressesApi = {
    getMyAddresses: async () => {
        const response = await apiClient.get('/api/addresses/my-addresses');
        return response.data.data;
    },

    getPrimaryAddress: async () => {
        try {
            const response = await apiClient.get('/api/addresses/my-addresses/primary');
            // Handle case where no primary address exists
            if (!response.data || !response.data.data) {
                return null;
            }
            return response.data.data;
        } catch (error: any) {
            // If 404 or no address found, return null instead of throwing
            if (error.response?.status === 404 || error.response?.data?.message?.includes('not found')) {
                return null;
            }
            throw error;
        }
    },
};

export const invoicesApi = {
    getMyInvoices: async () => {
        const response = await apiClient.get('/api/billing/invoices/my-invoices');
        return response.data.data;
    },

    getInvoiceById: async (id: string) => {
        const response = await apiClient.get(`/api/billing/invoices/${id}`);
        return response.data.data;
    },
};
