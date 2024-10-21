// Sélectionner tout le texte des publications de réseaux sociaux
let posts = document.querySelectorAll('.post-content, .article, .fb-post-text');

// Analyser le texte des publications
posts.forEach((post, index) => {
    let content = post.innerText || post.textContent;

    // Envoyer le contenu au background script pour analyse
    chrome.runtime.sendMessage({
        action: 'analyzeContent',
        text: content,
        index: index
    });
});

// Sélectionner toutes les images de la page
let images = document.querySelectorAll('img');

// Analyser les images
images.forEach((img, index) => {
    let imageUrl = img.src;

    // Envoyer l'URL de l'image au background script pour analyse
    chrome.runtime.sendMessage({
        action: 'analyzeImage',
        imageUrl: imageUrl,
        index: index
    });
});

// Écouter les réponses du background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'flagContent' && message.isProblematic) {
        let post = posts[message.index];
        if (post) {
            post.style.border = "2px solid red";
            post.insertAdjacentHTML('beforeend', '<div style="color:red;">Attention : Contenu potentiellement inapproprié.</div>');
        }
    } else if (message.action === 'flagImage' && message.isImageProblematic) {
        let img = images[message.index];
        if (img) {
            img.style.border = "2px solid red";
            img.insertAdjacentHTML('afterend', '<div style="color:red;">Attention : Image générée par IA détectée.</div>');
        }
    }
});
