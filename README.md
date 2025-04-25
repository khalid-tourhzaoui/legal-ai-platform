# **🔍 Legal AI Morocco Platform**

Bienvenue sur la **Legal AI Morocco Platform** ! Cette plateforme juridique innovante utilise l'API OpenAI pour fournir des informations et analyses juridiques précises adaptées au contexte marocain. Construite avec **Next.js**, notre plateforme est rapide, intuitive et personnalisable pour tous vos besoins juridiques.

![Legal AI Morocco Banner](public/image.png)

## **🌐 Visitez la plateforme:** [Legal AI Morocco](https://legal-ai-morocco.vercel.app/)

---

## **📑 Table des matières**

- [À propos du projet](#à-propos-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Composants Frontend](#composants-frontend)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Avertissement légal](#avertissement-légal)
- [Contact](#contact)

---

## **🎯 À propos du projet**

**Legal AI Morocco** est une plateforme frontend d'intelligence artificielle dédiée au domaine juridique marocain, inspirée par 9anoune.ma. Elle permet aux utilisateurs d'obtenir des informations juridiques, des analyses et des conseils préliminaires sur diverses questions de droit marocain. Notre mission est de démocratiser l'accès à l'information juridique au Maroc.

---

## **✨ Fonctionnalités**

- **Assistance juridique par IA:**
  - Réponses instantanées aux questions juridiques courantes
  - Explication des concepts juridiques marocains en langage simple
  
- **Interface intuitive:**
  - Design moderne et épuré inspiré des meilleures plateformes juridiques
  - Navigation facile entre les différentes sections

- **Modèles de documents:**
  - Affichage et téléchargement de modèles juridiques
  - Prévisualisation des documents générés

- **Multilingue:**
  - Interface disponible en arabe, français et amazigh
  - Traitement des requêtes dans ces trois langues

- **Design adaptatif:**
  - Optimisé pour tous les appareils: ordinateurs, tablettes et smartphones

---

## **🧩 Composants Frontend**

Notre plateforme frontend est construite avec des composants React modernes:

1. **QueryInput**: Interface pour poser des questions juridiques à l'IA
2. **ResponseDisplay**: Affiche les réponses générées avec mise en forme juridique
3. **DocumentViewer**: Visualiseur de documents juridiques avec options de téléchargement
4. **LegalGlossary**: Dictionnaire visuel des termes juridiques marocains
5. **SearchDialog**: Interface de recherche avancée
6. **LanguageSwitcher**: Sélecteur de langue pour l'interface utilisateur
7. **ThemeToggle**: Basculement entre mode clair et sombre

---

## **🛠️ Technologies utilisées**

- **Frontend:**
  - React.js
  - Next.js 14 avec App Router
  - Tailwind CSS pour un style responsive
  - Framer Motion pour les animations fluides
  - Shadcn UI pour les composants d'interface

- **API:**
  - OpenAI API pour le traitement du langage naturel

- **Utilitaires:**
  - Zustand pour la gestion d'état
  - React Query pour les requêtes API
  - next-i18next pour l'internationalisation

- **Outils:**
  - Axios pour les appels API
  - React-PDF pour la visualisation de documents
  - React-Icons pour l'iconographie

---

## **⚙️ Installation**

Pour configurer le projet frontend localement, suivez ces étapes:

1. **Clonez le dépôt:**
   ```bash
   git clone https://github.com/khalid-tourhzaoui/legal-ai-platform.git
   ```

2. **Accédez au répertoire du projet:**
   ```bash
   cd legal-ai-platform
   ```

3. **Installez les dépendances:**
   ```bash
   npm install
   ```

4. **Créez un fichier .env.local et ajoutez votre clé API:**
   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=votre_clé_openai
   ```

5. **Démarrez le serveur de développement:**
   ```bash
   npm run dev
   ```

6. Ouvrez votre navigateur et allez sur `http://localhost:3000` pour voir le projet.

## **🚀 Utilisation**

Voici comment utiliser les principales fonctionnalités de notre interface frontend:

### 1. **Consultation juridique par IA**
   - Utilisez le champ de texte principal pour poser une question juridique
   - L'interface affichera la réponse générée par l'IA avec une mise en forme appropriée
   - Les articles de loi pertinents seront automatiquement mis en évidence

### 2. **Changement de langue**
   - Utilisez le sélecteur de langue dans l'en-tête pour changer la langue de l'interface
   - Toutes les questions et réponses seront automatiquement traduites

### 3. **Mode sombre/clair**
   - Basculez entre les thèmes clair et sombre selon vos préférences
   - Le mode s'adapte également automatiquement aux préférences système

## **⚠️ Avertissement légal**

Les informations fournies par Legal AI Morocco sont destinées à des fins d'information générale uniquement et ne constituent pas un avis juridique professionnel. Pour des conseils juridiques spécifiques, veuillez consulter un avocat qualifié.

## **📞 Contact**
- **Email:** [khalidtourhzaoui@gmail.com](mailto:khalidtourhzaoui@gmail.com)
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/khalid-tourhzaoui/)
- **Site Web:** [ khalid-tourhzaoui.com](https://khalid-tourhzaoui.vercel.app/contactme)
