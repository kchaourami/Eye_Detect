// Créer un élément de menu contextuel lors de l'installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
    // Créer un menu contextuel pour analyser les images
    chrome.contextMenus.create({
        id: "analyzeImage",
        title: "Analyser cette image",
        contexts: ["image"] 
    });

    // Créer un menu contextuel pour analyser le texte
    chrome.contextMenus.create({
        id: "analyzeText",
        title: "Analyser ce texte pour fake news",
        contexts: ["selection"] 
    });
});

// Écouter l'événement de clic sur le menu contextuel
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Fonction pour analyser les images
    const analyzeImage = (imageUrl) => {
        fetch('https://api-inference.huggingface.co/models/Nahrawy/AIorNot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Remplacez par votre clé API Hugging Face
                'Authorization': 'votre clé API Hugging Face' 
            },
            // Passer l'URL de l'image
            body: JSON.stringify({ inputs: imageUrl }) 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau, réponse non valide');
                }
                return response.json(); 
            })
            .then(data => {
                // Vérifier la structure des données renvoyées par l'API
                if (!data || !Array.isArray(data) || data.length === 0) {
                    throw new Error("Réponse de l'API non valide");
                }

                // Récupérer les scores pour "ai" et "real"
                const aiScore = data.find(item => item.label === "ai")?.score || 0;
                const realScore = data.find(item => item.label === "real")?.score || 0;

                // Notification avec les scores
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'Analyse d\'image',
                    message: `Score IA : ${aiScore.toFixed(2)}\nScore réel : ${realScore.toFixed(2)}\n${aiScore > 0.60 ? "Cette image est générée par l'IA." : "Cette image est probablement réelle."}`
                });
            })
            .catch(error => {
                console.error('Erreur d\'analyse :', error);
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'Erreur d\'analyse',
                    message: 'Impossible d\'analyser l\'image. Vérifiez l\'URL ou réessayez plus tard.'
                });
            });
    };

    // Fonction pour analyser le texte
    const analyzeText = (selectedText) => {
        fetch('https://api-inference.huggingface.co/models/jy46604790/Fake-News-Bert-Detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Remplacez par votre clé API Hugging Face
                'Authorization': 'votre clé API Hugging Face' 
            },
            // Passer le texte sélectionné
            body: JSON.stringify({ inputs: selectedText }) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réseau, réponse non valide');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const fakeNewsScore = data[0][0].label === "LABEL_0" ? data[0][0].score : 0;
            const realNewsScore = data[0][1].label === "LABEL_1" ? data[0][1].score : 0;
    
            // Ajout d'une vérification pour des phrases factuelles connues
            const knownTruths = ["The earth is round", "Water boils at 100 degrees Celsius", "The sky is blue"];
            const isKnownTruth = knownTruths.some(truth => selectedText.includes(truth));
    
            if (isKnownTruth) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'Analyse de texte',
                    message: `Cette information est vraie.}`
                });
            } else {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon48.png',
                    title: 'Analyse de texte',
                    message: `${fakeNewsScore > 0.60 ? "Cette information est probablement une fake news." : "Cette information semble réelle."}`
                });
            }
        })
        .catch(error => {
            console.error('Erreur d\'analyse :', error);
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Erreur d\'analyse',
                message: 'Impossible d\'analyser le texte. Vérifiez la sélection ou réessayez plus tard.'
            });
        });
    };
    

    // Vérifier quel menu contextuel a été cliqué
    if (info.menuItemId === "analyzeImage") {
        // Appeler la fonction d'analyse d'image
        analyzeImage(info.srcUrl); 
    }

    if (info.menuItemId === "analyzeText") {
        // Appeler la fonction d'analyse de texte
        analyzeText(info.selectionText); 
    }
});
