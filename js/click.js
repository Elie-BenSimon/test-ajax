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

        // si c'est un bouton pour ajouter un nouveau bloc
        else if (event.target.id === "newBloc") {
            if (click.elementEditable != null) {
                click.postAjax();
            }

            // h3
            const h3Element = document.createElement("h3");
            h3Element.textContent = "Titre de votre infoBloc";

            // button "edit content"
            const editButtonElement = document.createElement("button");
            editButtonElement.className = "editButton";
            editButtonElement.textContent = "Edit Content";

            // div "header" du bloc info
            const divHeaderElement = document.createElement("div");
            divHeaderElement.className = "blocInfoHeader";
            divHeaderElement.append(h3Element);
            divHeaderElement.append(editButtonElement);

            // textarea
            const textareaElement = document.createElement("textarea");
            textareaElement.setAttribute("onInput", "autoSizeTextarea.onInput()");
            textareaElement.classList.add("blocInfoTextarea", "textAreaEditable");
            textareaElement.value = "wow c'est vachement interessant!";
            click.elementEditable = textareaElement;

            // div bloc info
            const divBlocElement = document.createElement("div");
            divBlocElement.className = "blocInfo";
            divBlocElement.append(divHeaderElement);
            divBlocElement.append(textareaElement);
            
            // ajout du nouveau bloc dans le document
            sectionElement = document.getElementById("sectionBlocInfo");
            sectionElement.append(divBlocElement);

            const xmlhttp = new XMLHttpRequest();
            const content = textareaElement.value
            xmlhttp.onload = function() {
                textareaElement.id = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
                editButtonElement.id = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            };
            xmlhttp.open("GET","./php/newData.php",true);
            xmlhttp.send();
        }

        // sinon si un textarea est editable on le ferme, et on met à jour la db
        else if (click.elementEditable != null) {
            click.postAjax();
        }
    },

    // met à jour la base de données sans recharger la page
    postAjax: function() {
        const xmlhttp = new XMLHttpRequest();
        const id = "id=" + click.elementEditable.id;
        // le contenu doit être encodé pour ne pas poser de problème si des caractère spéciaux sont dans le texte (& et % par exemple)
        // les caractères de retour à la ligne sont remplacés par des balise br pour être sur de les conserver
        const content = "&content=" + encodeURIComponent(click.elementEditable.value.replace(/(?:\r\n|\r|\n)/g, "<br>"));
        xmlhttp.open("POST", "./php/updateDatabase.php", true);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.send(id+content);
        click.close(click.elementEditable);
        
        // utilisé pour du debugage
        console.log("postAjax se lance")
        xmlhttp.onload = function() {console.log(this.responseText)}
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
}





