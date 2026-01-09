# Haiti Shipping - Client Portal

Site web public et espace client pour la plateforme de shipping Haiti Shipping.

## 🌐 URLs

- **Site Public**: http://localhost:3002
- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001

## 📦 Fonctionnalités

### Site Public

- **Page d'accueil** - Landing page moderne avec présentation des services
- **Inscription** - Formulaire en 2 étapes avec :
  - Informations personnelles
  - Adresse en Haïti (pré-remplissage des communes de l'Ouest)
- **Connexion** - Authentification sécurisée
- **Tracking Public** - Suivi de colis sans connexion

### Espace Client

- **Dashboard** - Vue d'ensemble avec statistiques et adresse USA
- **Mon Adresse USA** - Affichage et copie de l'adresse personnalisée
- **Mes Colis** - Liste avec recherche et filtres
- **Historique** - Tous les colis livrés avec statistiques
- **Factures** - Gestion et paiement des factures
- **Profil** - Modification des informations personnelles

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local

# Démarrer le serveur de développement
npm run dev
```

## 🛠️ Technologies

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **React Query** - Gestion des données
- **Axios** - Client HTTP
- **Sonner** - Notifications toast
- **Lucide React** - Icônes

## 📁 Structure

```
client-portal/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── my-address/
│   │   ├── parcels/
│   │   ├── history/
│   │   ├── invoices/
│   │   └── profile/
│   ├── track/
│   └── page.tsx
├── components/
│   └── providers.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── index.ts
│   ├── constants.ts
│   └── utils.ts
└── .env.local
```

## 🇭🇹 Communes d'Haïti

Le formulaire d'inscription inclut les communes suivantes de l'Ouest :

- Port-au-Prince
- Delmas
- Pétion-Ville
- Carrefour
- Croix-des-Bouquets
- Tabarre
- Cité Soleil
- Kenscoff
- Gressier
- Arcahaie
- Cabaret
- Thomazeau
- Ganthier
- Cornillon
- Fonds-Verrettes
- Grand-Goâve
- Petit-Goâve
- Léogâne

## 🔐 Authentification

Le système utilise JWT avec refresh tokens :
- Access token stocké dans localStorage
- Refresh automatique en cas d'expiration
- Redirection vers /login si non authentifié

## 📱 Responsive

Le site est entièrement responsive avec :
- Mobile First design
- Breakpoints : Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- Menu hamburger sur mobile
- Sidebar collapsible

## 🎨 Design System

### Couleurs
- **Primary**: Bleu (#2563EB)
- **Secondary**: Orange (#F59E0B)
- **Success**: Vert (#10B981)
- **Warning**: Jaune (#F59E0B)
- **Error**: Rouge (#EF4444)

### Typographie
- **Font**: Inter
- **Headings**: Bold
- **Body**: Regular

## 📄 License

Propriétaire - Haiti Shipping © 2025
