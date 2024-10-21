# EYE-DETECT Extension

## Description
EYE-DETECT est une extension Web qui permet de détecter et analyser le contenu des réseaux sociaux pour identifier les fausses nouvelles, les images généré par IA.

## Fonctionnalités
- Analyse de texte pour détecter les fausses nouvelles.
- Analyse d'images pour détecter les images générées par IA.

## Installation
1. Téléchargez le dossier de l'extension.
2. Ouvrez Chrome, allez dans `chrome://extensions/`, activez le mode développeur.
3. Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier de l'extension.

## Utilisation
- Cliquez sur l'icône de l'extension dans la barre d'outils pour ouvrir la popup.
- Utilisez le bouton "Analyser maintenant" pour analyser le contenu de la page active.
- **Important :** Assurez-vous de configurer votre propre clé API Hugging Face dans le fichier `background.js`.

## Obtention d'une clé API Hugging Face
Pour utiliser les fonctionnalités complètes de cette extension, vous aurez besoin d'une clé API de Hugging Face. Voici comment vous pouvez obtenir une :
1. Allez sur le site web [Hugging Face](https://huggingface.co).
2. Créez un compte ou connectez-vous si vous en avez déjà un.
3. Naviguez vers la section API dans votre tableau de bord et suivez les instructions pour générer une nouvelle clé API.
4. Une fois obtenue, remplacez la clé API par défaut dans le fichier `background.js` par votre propre clé pour activer l'analyse.

## Technologies utilisées
- HTML/CSS pour l'interface utilisateur.
- JavaScript pour les scripts de fond et de contenu.
- API Hugging Face pour l'analyse de texte et d'images.

## Contribution
Les contributions sont les bienvenues. Veuillez soumettre vos pull requests sur GitHub.

## Licence
Cet projet est distribué sous la licence MIT.

