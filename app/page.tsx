import Link from 'next/link';
import { Package, MapPin, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Haiti Shipping
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#services" className="text-gray-800 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="#pricing" className="text-gray-800 hover:text-blue-600 transition-colors">
                Tarifs
              </Link>
              <Link href="#how-it-works" className="text-gray-800 hover:text-blue-600 transition-colors">
                Comment ça marche
              </Link>
              <Link href="/track" className="text-gray-800 hover:text-blue-600 transition-colors">
                Tracking
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                🇭🇹 Service de shipping pour Haïti
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Recevez vos colis des{' '}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                USA en Haïti
              </span>{' '}
              en toute sécurité
            </h1>
            <p className="text-xl text-gray-800 leading-relaxed">
              Votre adresse personnalisée aux USA + Livraison rapide à Port-au-Prince et dans tout l'Ouest
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                Créer mon compte gratuit
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg flex items-center justify-center"
              >
                Comment ça marche
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-800">Inscription gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-800">Adresse USA instantanée</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-orange-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse USA personnalisée</p>
                      <p className="text-sm text-gray-800">Générée automatiquement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                    <div className="bg-orange-600 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Livraison rapide</p>
                      <p className="text-sm text-gray-800">7-10 jours vers Haïti</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="bg-green-600 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sécurisé et fiable</p>
                      <p className="text-sm text-gray-800">Tracking en temps réel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-900">3 étapes simples pour recevoir vos colis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold">Inscription gratuite</h3>
              <p className="text-gray-900">
                Créez votre compte en 2 minutes et recevez immédiatement votre adresse USA personnalisée
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold">Achetez en ligne</h3>
              <p className="text-gray-900">
                Utilisez votre adresse USA pour vos achats sur Amazon, eBay, et tous les sites américains
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold">Recevez chez vous</h3>
              <p className="text-gray-900">
                Nous livrons votre colis directement à votre adresse en Haïti en 7-10 jours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Services</h2>
            <p className="text-xl text-gray-900">Tout ce dont vous avez besoin pour vos envois</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Adresse USA',
                description: 'Adresse personnalisée à Miami, New York ou Los Angeles',
              },
              {
                icon: Package,
                title: 'Consolidation',
                description: 'Regroupez plusieurs colis pour économiser sur les frais',
              },
              {
                icon: Clock,
                title: 'Tracking 24/7',
                description: 'Suivez vos colis en temps réel depuis votre espace client',
              },
              {
                icon: Shield,
                title: 'Assurance',
                description: 'Vos colis sont assurés contre les dommages et pertes',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-900">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/freight-airliner.png)' }}
        >
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-orange-600/85"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Prêt à recevoir vos colis en Haïti ?
          </h2>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto drop-shadow-md font-medium">
            Rejoignez des milliers de clients satisfaits et profitez de notre service de shipping fiable
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:scale-105 transform"
          >
            Créer mon compte maintenant
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Haiti Shipping</span>
              </div>
              <p className="text-sm">
                Votre partenaire de confiance pour vos envois entre les USA et Haïti
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Adresse USA</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Consolidation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Assurance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/track" className="hover:text-white transition-colors">Tracking</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📞 +509 1234-5678</li>
                <li>📧 contact@haitishipping.com</li>
                <li>📍 Port-au-Prince, Haïti</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Haiti Shipping. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
