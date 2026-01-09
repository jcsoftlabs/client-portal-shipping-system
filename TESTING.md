# Client Portal - Guide de Test

## 🔐 Connexion Client

### Problème Actuel
Les utilisateurs du seed file ont un hash de mot de passe qui ne correspond pas à `password123`.

### ✅ Solution : Créer un nouveau compte

**Allez sur** : http://localhost:3002/register

**Remplissez le formulaire** :

**Étape 1 - Informations personnelles** :
- Prénom : `Test`
- Nom : `Client`
- Email : `test@client.com`
- Téléphone : `+509 1234-5678`
- Mot de passe : `Test123!`
- Confirmer : `Test123!`

**Étape 2 - Adresse en Haïti** :
- Département : `Ouest` (pré-sélectionné)
- Commune : `Port-au-Prince`
- Quartier : `Delmas 33`
- Rue : `Rue Lamarre`
- Détails : `Maison #15`
- Point de repère : `Près de l'église` (optionnel)

**Après inscription** :
- Vous serez automatiquement connecté
- Redirection vers `/dashboard`
- Votre adresse USA sera générée (ex: HT-MDL-00001/A)

---

## 🧪 Test de Connexion

Une fois inscrit, testez la connexion :

1. Déconnectez-vous
2. Allez sur http://localhost:3002/login
3. Email : `test@client.com`
4. Mot de passe : `Test123!`

---

## 📝 Comptes de Test Alternatifs

Si vous voulez utiliser les comptes du seed file, le mot de passe correct est probablement différent. 

**Pour réinitialiser un compte** :
Utilisez l'inscription pour créer un nouveau compte avec vos propres identifiants.

---

## 🎯 Pages Disponibles

Une fois connecté, vous aurez accès à :
- `/dashboard` - Vue d'ensemble
- `/dashboard/my-address` - Votre adresse USA
- `/dashboard/parcels` - Liste des colis
- `/dashboard/history` - Historique
- `/dashboard/invoices` - Factures
- `/dashboard/profile` - Profil

---

## 🐛 Débogage

Si vous rencontrez des erreurs :
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les messages d'erreur
3. Assurez-vous que le backend tourne sur http://localhost:3000
