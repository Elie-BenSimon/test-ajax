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

            // stockage et récupération de l'état de l'élément "pre" associé (editable ou non)
            const preElement = event.target.parentNode.parentNode.querySelector('pre');
            let isEditable = preElement.getAttribute("contentEditable");
            isEditable = (isEditable === 'true');

            // si l'élément "pre" associé est editable on le ferme
            if (isEditable) {
                click.post();
            }

            // sinon on ferme ceux eventuellement ouvert, et l'élément pre associé au bouton cliqué devient editable
            else {
                if (click.elementEditable != null) {
                    click.post();
                }
                event.target.textContent = "quit editing";
                preElement.setAttribute("contenteditable", "true");
                preElement.focus();
                click.elementEditable = preElement;
            }
        }

        // si c'est un élément "pre"
        else if (event.target.classList.contains('blocInfoPre')) {

            // s'il n'est pas editable le potentiel élément "pre" editable est fermé
            if (event.target.getAttribute("contentEditable") === "false") {
                click.post();
            }
        }

        // sinon, le potentiel élément "pre" editable est fermé
        else {
            click.post();
        }
    },

    post: function () {
        if (click.elementEditable != null) {

            // stockage des informations à passer en requête
            const id = click.elementEditable.id;
            const value = click.elementEditable.textContent;
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

    // utilise le début des id pour renvoyer le type d'element
    getIdType: function (str) {
        if (str.indexOf('editButton') >= 0) {
            return 'editButton';
        }
        else if (str.indexOf('blocInfoPre') >= 0) {
            return 'blocInfoPre';
        }
        else {
            return 'other';
        }
    },

    // ferme un élément "pre" entré en paramètre
    close: function (element) {
        if (element != null) {
            const buttonElement = click.elementEditable.parentNode.querySelector(".editButton");
            buttonElement.textContent = "Edit content";
            element.setAttribute("contenteditable", "false");
            click.elementEditable = null;
        }
    },

    // ferme les "pre" et réinitialise les bouton edit
    closeAllPre: function () {
        // ferme tous les "pre" editable
        const preElementList = document.querySelectorAll('pre');
        for (preElement of preElementList) {
            preElement.setAttribute("contenteditable", "false");
        }

        // réinitialise le texte des boutons edit
        const buttonElementList = document.querySelectorAll('button');
        for (buttonElement of buttonElementList) {
            if (buttonElement.textContent === "quit editing") {
                buttonElement.textContent = "edit content";
            }
        }
        //click.post();
    }
}





