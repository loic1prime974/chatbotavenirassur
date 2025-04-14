// Fonction pour initialiser les événements de clic
function initFaqEvents() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });
}

// Charger les données au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour charger le contenu du fichier texte
    fetch('./questions.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossible de charger le fichier: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(text => {
            // Traiter le texte pour extraire les questions et réponses
            const faqItems = parseQuestionsAndAnswers(text);
            
            // Afficher les questions et réponses
            displayFAQ(faqItems);
            
            // Masquer le message de chargement
            document.querySelector('.loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier:', error);
            document.querySelector('.loading').textContent = `Erreur lors du chargement des questions fréquentes: ${error.message}`;
        });
});

// Fonction pour analyser le texte et extraire les questions et réponses
function parseQuestionsAndAnswers(text) {
    const faqItems = [];
    const lines = text.split('\n');
    
    let currentQuestion = '';
    let currentAnswer = '';
    let isCollectingAnswer = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Détecter une nouvelle question
        if (line.startsWith('Q:')) {
            // Si nous avions déjà une question et une réponse, les ajouter à notre liste
            if (currentQuestion && currentAnswer) {
                faqItems.push({
                    question: currentQuestion,
                    answer: currentAnswer
                });
            }
            
            // Commencer une nouvelle question
            currentQuestion = line.substring(2).trim();
            currentAnswer = '';
            isCollectingAnswer = true;
        } 
        // Si nous collectons une réponse et que la ligne n'est pas vide
        else if (isCollectingAnswer && line && !line.startsWith('Q:')) {
            // Ajouter cette ligne à la réponse actuelle
            if (currentAnswer) {
                currentAnswer += '\n' + line;
            } else {
                currentAnswer = line;
            }
        }
    }
    
    // Ajouter la dernière question/réponse si elle existe
    if (currentQuestion && currentAnswer) {
        faqItems.push({
            question: currentQuestion,
            answer: currentAnswer
        });
    }
    
    return faqItems;
}

// Fonction pour afficher les questions et réponses dans le DOM
function displayFAQ(faqItems) {
    const container = document.getElementById('general-faq');
    
    faqItems.forEach((item, index) => {
        // Créer l'élément de question
        const questionDiv = document.createElement('div');
        questionDiv.className = 'faq-question';
        questionDiv.textContent = item.question;
        questionDiv.setAttribute('data-index', index);
        
        // Créer l'élément de réponse
        const answerDiv = document.createElement('div');
        answerDiv.className = 'faq-answer';
        answerDiv.style.display = 'none';
        
        // Formater la réponse avec des paragraphes
        const paragraphs = item.answer.split('\n').filter(p => p.trim());
        paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            answerDiv.appendChild(p);
        });
        
        // Ajouter un gestionnaire d'événements pour afficher/masquer la réponse
        questionDiv.addEventListener('click', function() {
            const isVisible = answerDiv.style.display === 'block';
            answerDiv.style.display = isVisible ? 'none' : 'block';
            questionDiv.classList.toggle('active', !isVisible);
        });
        
        // Ajouter les éléments au conteneur
        container.appendChild(questionDiv);
        container.appendChild(answerDiv);
    });
}
