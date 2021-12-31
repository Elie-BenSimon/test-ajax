/* Module gérant le clic sur toute la page */
const click = {

    init: function () {

        // on pose un event listener sur tout le document
        document.addEventListener('click', click.handleClick);
        click.elementEditable = null;
    },

    // quand un click a lieu
    handleClick: function (event) {

        // si la cible du clic est un bouton "edit"
        if (event.target.classList.contains('editButton')) {

            // stockage et récupération de l'état de l'élément textarea associé
            const textareaElement = event.target.parentNode.parentNode.querySelector('.blocInfoTextarea');
            let readonly = textareaElement.getAttribute("readonly");
            readonly = (readonly != null);
            console.log(textareaElement);
            console.log(readonly);

            // si l'élément textarea associé est editable on le ferme et on met à jour la db
            if (readonly === false) {
                click.postAjax();
            }

            // sinon l'élément textarea associé au bouton cliqué devient editable
            else {
                // si un autre textarea est editable, on le ferme et on met à jour la db
                if (click.elementEditable != null) {
                    click.postAjax();
                }
                event.target.textContent = "quit editing";
                textareaElement.removeAttribute("readonly");
                textareaElement.focus();
                click.elementEditable = textareaElement;
                click.elementEditable.classList.add("textAreaEditable");
            }
        }

        // si c'est un élément textarea
        else if (event.target.classList.contains('blocInfoTextarea')) {

            // s'il n'est pas editable et qu'un autre textarea est ouvert on le ferme
            if (event.target.getAttribute("readonly") != null && click.elementEditable != null) {
                click.postAjax();
            }
        }

        // sinon, le potentiel élément "pre" editable est fermé
        else if (click.elementEditable != null) {
            click.postAjax();
        }
    },

    // passe les éléments à modifier en GET
    post: function() {
        if (click.elementEditable != null) {

            // stockage des informations à passer en requête
            const id = click.elementEditable.id;
            const value = click.elementEditable.innerHTML;
            let form = document.createElement('form');
            form.method = 'GET';

            // input stockant l'id de l'élément modifié
            let hiddenfield = document.createElement('input');
            hiddenfield.type = 'hidden';
            hiddenfield.name = 'idToUpdate';
            hiddenfield.value = id;
            form.append(hiddenfield);

            // input stockant l'id de l'élément modifié
            hiddenfield = document.createElement('input');
            hiddenfield.type = 'hidden';
            hiddenfield.name = 'contentToUpdate';
            hiddenfield.value = value;
            form.append(hiddenfield);

            // ajout du form au document
            document.body.append(form);
            form.submit();
        }
    },

    // met à jour la base de données sans recharger la page
    postAjax: function() {
        const xmlhttp = new XMLHttpRequest();
        const id = click.elementEditable.id;
        const content = click.elementEditable.value;
        xmlhttp.open("GET",`./php/updateDatabase.php?idToUpdate=${id}&contentToUpdate=${content}`,true);
        xmlhttp.send();
        click.close(click.elementEditable);
    },

    // utilise le début des id pour renvoyer le type d'element
    getIdType: function (str) {
        if (str.indexOf('editButton') >= 0) {
            return 'editButton';
        }
        else if (str.indexOf('blocInfoTextarea') >= 0) {
            return 'blocInfoTextarea';
        }
        else {
            return 'other';
        }
    },

    // ferme un élément textarea entré en paramètre
    close: function (element) {
        if (element != null) {
            const buttonElement = click.elementEditable.parentNode.querySelector(".editButton");
            buttonElement.textContent = "Edit content";
            element.setAttribute("readonly", "true");
            element.classList.remove("textAreaEditable");
            click.elementEditable = null;
        }
    },

    // ferme les "pre" et réinitialise les boutons edit
    closeAllPre: function () {
        // ferme tous les "pre" editable
        const textareaElementList = document.querySelectorAll('pre');
        for (textareaElement of textareaElementList) {
            textareaElement.setAttribute("contenteditable", "false");
        }

        // réinitialise le texte des boutons edit
        const buttonElementList = document.querySelectorAll('button');
        for (buttonElement of buttonElementList) {
            if (buttonElement.textContent === "quit editing") {
                buttonElement.textContent = "edit content";
            }
        }
    }
}





