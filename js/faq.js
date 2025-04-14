

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
    const faqData = [
        {
            "question": "Qu'est-ce qu'un courtier en assurance ?",
            "reponse": "Un courtier en assurance est un professionnel indépendant qui sert d'intermédiaire entre vous et les compagnies d'assurance. Il recherche et compare les offres pour vous proposer la solution la plus adaptée à vos besoins et à votre budget."
        },
        {
            "question": "Comment choisir la bonne assurance habitation ?",
            "reponse": "Pour choisir la bonne assurance habitation, il faut prendre en compte plusieurs facteurs : la valeur de votre logement et de vos biens, les risques spécifiques à votre région, vos besoins en termes de garanties (dégâts des eaux, vol, incendie, etc.) et votre budget. Un courtier peut vous aider à évaluer ces éléments et à trouver l'offre la plus adaptée."
        },
        {
            "question": "Quelle est la différence entre l'assurance au tiers et l'assurance tous risques ?",
            "reponse": "L'assurance au tiers (responsabilité civile) est l'assurance minimum obligatoire qui couvre les dommages que vous pourriez causer à autrui. L'assurance tous risques couvre en plus les dommages subis par votre propre véhicule, même si vous êtes responsable de l'accident."
        },
        {
            "question": "Comment déclarer un sinistre ?",
            "reponse": "Pour déclarer un sinistre, contactez votre assureur ou votre courtier dans les délais prévus par votre contrat (généralement 5 jours ouvrés, 2 jours en cas de vol). Fournissez tous les documents nécessaires (constat, photos, factures, etc.) et suivez les instructions de votre interlocuteur pour la suite de la procédure."
        },
        {
            "question": "Puis-je résilier mon contrat d'assurance à tout moment ?",
            "reponse": "Depuis la loi Hamon de 2015, vous pouvez résilier votre contrat d'assurance auto, moto ou habitation à tout moment après un an d'engagement. Pour les autres types d'assurances, les conditions de résiliation sont précisées dans votre contrat."
        }
    ];

    // Fonction pour créer les éléments de la FAQ
    function createFaqElements() {
        const faqContainer = document.querySelector('.faq-container');
        
        // Supprimer le message de chargement
        faqContainer.innerHTML = '';
        
        // Créer un élément pour chaque question/réponse
        faqData.forEach((item, index) => {
            // Créer les éléments
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            const question = document.createElement('div');
            question.className = 'faq-question';
            question.textContent = item.question;
            
            const reponse = document.createElement('div');
            reponse.className = 'faq-reponse';
            reponse.textContent = item.reponse;
            reponse.style.display = 'none'; // Cacher la réponse par défaut
            
            // Ajouter un écouteur d'événement pour afficher/masquer la réponse
            question.addEventListener('click', function() {
                // Toggle la classe active sur la question
                this.classList.toggle('active');
                
                // Afficher ou masquer la réponse
                if (reponse.style.display === 'none') {
                    reponse.style.display = 'block';
                } else {
                    reponse.style.display = 'none';
                }
            });
            
            // Ajouter les éléments au conteneur
            faqItem.appendChild(question);
            faqItem.appendChild(reponse);
            faqContainer.appendChild(faqItem);
        });
    }

    // Dans un cas réel, vous chargeriez les données depuis un fichier JSON
    // fetch('data/faq.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         faqData = data;
    //         createFaqElements();
    //     })
    //     .catch(error => {
    //         console.error('Erreur lors du chargement des données:', error);
    //         document.querySelector('.loading').textContent = 'Erreur lors du chargement des questions fréquentes.';
    //     });

    // Pour cet exemple, nous utilisons directement les données en dur
    createFaqElements();
});
