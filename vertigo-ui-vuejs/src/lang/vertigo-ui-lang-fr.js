export default {
        ajaxErrors: {
            code401: 'Non autoris&eacute;, essayez de vous reconnecter',
            code403: 'Vous n&quote;avez pas les droits suffisants pour effectuer cette action',
            code404: 'API introuvable',
            code405: 'API non autoris&eacute;e',
            code500: 'Erreur serveur'
        },
        comments: {
            title : "Commentaires",
            inputLabel : "Insérer un commentaire ici",
            actionlabel : "Publier",
            cancel :"Annuler",
            save : "Sauver"
        },
        chatbot: {
            errorMessage: "Une erreur est survenue lors de l'envoi du message",
            tryAgain: "Essayez de nouveau",
            suggestedAnswers : "Réponses suggérées",
            inputPlaceHolder : "Ecrire un message",
            restartMessage : "Redémarrage de la conversation"
        },
        facets : {
            showAll : "Voir plus",
            showLess : "Voir moins"
        },
        notifications : {
            days : "jours",
            hours : "heures",
            minutes : "min",
            seconds : "s",
			serverLost : "Reconnexion au serveur en cours...",
        },
        commands : {
            globalPlaceholder : "Taper / pour afficher les commandes disponibles",
            executeCommand : "Appuyer sur entrée pour executer la commande",
            linkLabel : "Voir les détails"
        },
		uploader : {
			clear_all : "Annuler tout",
			remove : "Supprimer",
			add : "Ajouter des fichiers",
			abort : "Annuler",
			download : "Télécharger",
			fileErrorUnknown : "Erreur inconnue : Ce fichier ne peut pas être envoyé",
			fileErrorTooBig : "Le fichier est trop volumineux",
			fileErrorTooBigSize: (size) => `La taille d'un fichier ne doit pas dépasser ${Math.round(size/1024/1024)} Mo`,
			fileErrorMaxTotalSize: (size) => `La taille totale des fichiers ne doit pas dépasser ${Math.round(size/1024/1024)} Mo`,
			fileErrorAccept: (accept) => `Type de fichier invalide. Seuls les fichiers de type '${accept}' sont acceptés`,
			fileCountError: (max) => `Le champ peut contenir au maximum ${max} document${max>1?'s':''}`,
			progress : "Progression",
			estimated : "Temps restant",
			unit_b : "o",
			unit_kb : "Ko",
			unit_mb : "Mo",
			unit_gb : "Go"
		},
        handles : {
            placeholder : "Entrer un handle de la forme type/code"
        }
    };
