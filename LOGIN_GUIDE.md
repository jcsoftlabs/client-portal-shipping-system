# 🔐 Guide de Connexion - Client Portal

## ✅ Solution Recommandée : Créer un Nouveau Compte

Le mot de passe des comptes de test dans la base de données ne fonctionne pas. **Créez un nouveau compte via l'inscription**.

### 📝 Étapes d'Inscription

1. **Allez sur** : http://localhost:3002/register

2. **Étape 1 - Informations Personnelles** :
   - Prénom : `Jean`
   - Nom : `Dupont`
   - Email : `jean.dupont@test.com`
   - Téléphone : `+509 3456-7890`
   - Mot de passe : `Secure123!`
   - Confirmer : `Secure123!`

3. **Étape 2 - Adresse en Haïti** :
   - Département : `Ouest` (pré-sélectionné)
   - Commune : `Port-au-Prince` (choisir dans la liste)
   - Quartier : `Delmas 33`
   - Rue : `Rue Lamarre`
   - Détails : `Maison #15, portail bleu`
   - Point de repère : `Près de l'église Saint-Jean` (optionnel)

4. **Résultat** :
   - ✅ Compte créé automatiquement
   - ✅ Adresse USA générée (ex: HT-MDL-00005/A)
   - ✅ Connexion automatique
   - ✅ Redirection vers le dashboard

---

## 🔑 Connexion

Une fois inscrit, vous pouvez vous connecter :

**URL** : http://localhost:3002/login

**Identifiants** (exemple) :
- Email : `jean.dupont@test.com`
- Mot de passe : `Secure123!`

---

## 🌐 URLs Disponibles

- **Site Public** : http://localhost:3002
- **Connexion** : http://localhost:3002/login
- **Inscription** : http://localhost:3002/register
- **Dashboard** : http://localhost:3002/dashboard (après connexion)
- **Backend API** : http://localhost:3000
- **API Docs** : http://localhost:3000/api/docs

---

## 📱 Pages de l'Espace Client

Après connexion, accédez à :
- `/dashboard` - Vue d'ensemble + Statistiques
- `/dashboard/my-address` - Votre adresse USA complète
- `/dashboard/parcels` - Liste de vos colis
- `/dashboard/history` - Historique des livraisons
- `/dashboard/invoices` - Vos factures
- `/dashboard/profile` - Modifier votre profil

---

## ⚠️ Note Importante

Les comptes du fichier seed (marie.joseph@example.com, etc.) ont un hash de mot de passe qui ne correspond pas à `password123`. 

**Utilisez l'inscription pour créer un nouveau compte fonctionnel.**

---

## 🐛 Problèmes Résolus

✅ Placeholders des formulaires maintenant visibles (gris moyen au lieu de gris très clair)
✅ CORS configuré pour accepter le client portal
✅ Backend lancé sur port 3000
✅ Client portal lancé sur port 3002
