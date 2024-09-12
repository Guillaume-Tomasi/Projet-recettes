# Kwisto

Ce projet est une application web permettant la création et la gestion de recettes de cuisine.

## Pré-requis

- **Node.js** : Version 19.7.0
- **Npm**
- **MongoDB** : Base de données pour stocker les ingrédients/ recettes

## Installation

- Cloner le dépôt :
 
```
git clone https://github.com/Guillaume-Tomasi/Projet-recettes.git
```

- Accéder au répertoire de l'application :

```
cd Projet-recettes/backend 
```

- Installer les dépendances :

```
npm install
```

- Créer un fichier `.env` dans `backend/config`, puis ajouter l'adresse de la base de données MongoDB :
```
DB_CONNECT= "Votre adresse de connexion MongoDB"
```

## Démarrage

- Lancer le backend (par défaut sur le port 3000) :

```
npm start
```
- Ouvrir l'application dans le navigateur

## À venir

- Modification ingrédients
- Modification/ Suppression recettes
- Création/ Gestion comptes utilisateurs
- Planning pour organiser les repas à la semaine
