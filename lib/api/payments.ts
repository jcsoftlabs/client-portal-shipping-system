import apiClient from './client';

export interface PaymentIntent {
    id: string;
    clientSecret: string;
    amount: number;
    status: string;
}

export interface PaymentConfirmation {
    success: boolean;
    paymentIntent: PaymentIntent;
}

export const paymentsApi = {
    // Create a payment intent for an invoice
    createPaymentIntent: async (invoiceId: number): Promise<PaymentIntent> => {
        const response = await apiClient.post('/api/stripe/create-payment-intent', {
            invoiceId
        });
        return response.data;
    },

    // Confirm a payment
    confirmPayment: async (paymentIntentId: string): Promise<PaymentConfirmation> => {
        const response = await apiClient.post('/api/stripe/confirm-payment', {
            paymentIntentId
        });
        return response.data;
    },

    // Get payment intent status
    getPaymentStatus: async (paymentIntentId: string): Promise<PaymentIntent> => {
        const response = await apiClient.get(`/api/stripe/payment-intent/${paymentIntentId}`);
        return response.data;
    }
};
