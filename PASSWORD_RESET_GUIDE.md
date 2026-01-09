# 🔐 Réinitialisation de Mot de Passe - Guide

## ❌ Problème

PostgreSQL n'est pas accessible directement via `psql`, donc nous ne pouvons pas réinitialiser le mot de passe de `marie.joseph@example.com` dans la base de données.

## ✅ Solution Recommandée

**Créez un nouveau compte de test via l'interface d'inscription.**

### Option 1 : Compte de Test Marie (Recommandé)

1. **Allez sur** : http://localhost:3002/register

2. **Étape 1 - Informations** :
   ```
   Prénom : Marie
   Nom : Joseph
   Email : marie.test@example.com
   Téléphone : +509 3456-7890
   Mot de passe : password123
   Confirmer : password123
   ```
   
   ⚠️ **Note** : Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre. Utilisez plutôt : `Password123`

3. **Étape 2 - Adresse** :
   ```
   Département : Ouest
   Commune : Port-au-Prince
   Quartier : Delmas 33
   Rue : Rue Lamarre
   Détails : Maison #15
   ```

4. **Connexion** :
   - Email : `marie.test@example.com`
   - Mot de passe : `Password123`

---

### Option 2 : Compte Simple

Si vous voulez un mot de passe plus simple qui respecte les règles :

```
Email : test@client.com
Mot de passe : Test123!
```

---

## 🔧 Alternative : Accès Direct à PostgreSQL

Si vous avez besoin d'accéder à PostgreSQL pour réinitialiser le mot de passe :

### 1. Vérifier si PostgreSQL est en cours d'exécution

```bash
# Vérifier le statut
brew services list | grep postgresql

# Démarrer PostgreSQL si nécessaire
brew services start postgresql@14
```

### 2. Se connecter à la base de données

```bash
psql -U postgres -d shipping_platform
```

### 3. Réinitialiser le mot de passe

```sql
-- Hash bcrypt pour 'password123'
UPDATE users 
SET password_hash = '$2b$12$RSx6D7JZm6phO..NnPWJ.O6G5PoEOSMZYZVaB9kzg3ja5xHrYV/JW'
WHERE email = 'marie.joseph@example.com';

-- Vérifier
SELECT email, first_name, last_name FROM users WHERE email = 'marie.joseph@example.com';
```

---

## 📝 Hash de Mot de Passe Disponibles

Si vous avez accès à PostgreSQL, voici les hash bcrypt (12 rounds) :

| Mot de passe | Hash bcrypt |
|--------------|-------------|
| `password123` | `$2b$12$RSx6D7JZm6phO..NnPWJ.O6G5PoEOSMZYZVaB9kzg3ja5xHrYV/JW` |

---

## 🎯 Recommandation Finale

**Utilisez l'inscription pour créer un nouveau compte de test.**

C'est la méthode la plus simple et la plus fiable pour avoir un compte fonctionnel avec un mot de passe connu.

### Identifiants de Test Recommandés

```
Email : marie.test@example.com
Mot de passe : Password123
```

ou

```
Email : test@client.com  
Mot de passe : Test123!
```

Les deux respectent les règles de validation :
- ✅ Minimum 8 caractères
- ✅ Au moins une majuscule
- ✅ Au moins une minuscule
- ✅ Au moins un chiffre
