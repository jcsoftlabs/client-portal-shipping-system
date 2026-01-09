'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Mail, Lock, ArrowRight } from 'lucide-react';
import apiClient from '@/lib/api/client';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Attempting login with:', formData.email);
            const response = await apiClient.post('/api/auth/login', formData);
            console.log('Full response:', response);
            console.log('Response data:', response.data);

            // Extract tokens - handle different response structures
            const accessToken = response.data.accessToken || response.data.data?.accessToken;
            const refreshToken = response.data.refreshToken || response.data.data?.refreshToken;

            console.log('Access Token:', accessToken ? 'Found' : 'NOT FOUND');
            console.log('Refresh Token:', refreshToken ? 'Found' : 'NOT FOUND');

            if (!accessToken || !refreshToken) {
                console.error('Tokens missing from response:', response.data);
                throw new Error('Tokens not found in response');
            }

            // Store tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            toast.success('Connexion réussie !');

            // Redirect to dashboard
            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
        } catch (err: any) {
            console.error('Login error:', err);
            console.error('Error response:', err.response?.data);
            const errorMessage = err.response?.data?.message || 'Email ou mot de passe incorrect';
            setError(errorMessage);
            toast.error(errorMessage, { duration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Package className="h-10 w-10 text-blue-600" />
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                        Haiti Shipping
                    </span>
                </Link>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Connexion
                        </h1>
                        <p className="text-gray-800">
                            Accédez à votre espace client
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-700 text-gray-900"
                                    placeholder="jean.dupont@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-700 text-gray-900"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                            {!loading && <ArrowRight className="h-5 w-5" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-800">
                        Vous n'avez pas de compte ?{' '}
                        <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                            S'inscrire gratuitement
                        </Link>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-800 hover:text-gray-900">
                        ← Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
