/* Module gérant le clic sur toute la page */
const click = {

    init: function () {

        // on pose un event listener sur tout le document
        document.addEventListener('click', click.handleClick);
        click.elementEditable = null;
        click.xmlhttp = new XMLHttpRequest();
    },

    // quand un click a lieu
    handleClick: function (event) {

        // si la cible du clic est un bouton "edit"
        if (event.target.classList.contains('editButton')) {

            // s'il s'agit d'un bouton d'un tableau
            if (event.target.classList.contains('tableButton')) {

                // récupération de tous les textarea constituant le tableau
                const textareaElementsList = event.target.parentNode.parentNode.querySelectorAll('[data-idTable="1"]');
                let readonly = textareaElementsList[0].getAttribute("readonly");
                readonly = (readonly != null);
                
                // si la première cellule du tableau est editable on ferme toutes les cellules du tableau et on met à jour la db
                if (readonly === false) {
                    click.postAjax();
                }

                // sinon, toutes les cellules du tableau deviennent editable
                else {
                    if (click.elementEditable != null) {
                        click.postAjax();
                    }
                    click.elementEditable = [];
                    event.target.textContent = "quit editing";
                    event.target.classList.add("quitEditButton");
                    for(textareaElement of textareaElementsList) {
                        textareaElement.removeAttribute("readonly");
                        textareaElement.classList.add("textAreaEditable");
                        click.elementEditable.push(textareaElement);
                    }
                }
            }

            // s'il s'agit d'un bouton d'un bloc de texte
            else {
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
                    event.target.classList.add("quitEditButton");
                    textareaElement.removeAttribute("readonly");
                    textareaElement.focus();
                    textareaElement.classList.add("textAreaEditable");
                    click.elementEditable[0] = textareaElement;
                }
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
            textareaElement.value = "ya plus qu'à remplir ça!";
            click.elementEditable = textareaElement;

            // div bloc info
            const divBlocElement = document.createElement("div");
            divBlocElement.className = "blocInfo";
            divBlocElement.append(divHeaderElement);
            divBlocElement.append(textareaElement);
            
            // ajout du nouveau bloc dans le document
            sectionElement = document.getElementById("sectionBlocInfo");
            sectionElement.append(divBlocElement);

            // le retour de la requête AJAX met à jour les id des éléments
            // je ne sais pas pourquoi, mais des retours à ligne squattaient les id...
            click.xmlhttp.onload = function() {
                textareaElement.id = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
                editButtonElement.id = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            };
            click.xmlhttp.open("GET","./php/newData.php",true);
            click.xmlhttp.send();
        }

        // sinon si un textarea est editable on le ferme, et on met à jour la db
        else if (click.elementEditable != null) {
            click.postAjax();
        }
    },

    // met à jour la base de données sans recharger la page
    postAjax: function() {
        for (elementEditable of click.elementEditable) {
            const idData = elementEditable.id;
            // les simplequotes doivent être échapés pour ne pas faire buguer l'update query
            contentData = elementEditable.value.replace(/(?:')/g, "''");
            const objectData = {id:idData, content:contentData};
            const jsonData = JSON.stringify(objectData);
            click.xmlhttp.open("POST", "./php/updateDatabase.php", true);
            click.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            click.xmlhttp.send(jsonData);
            
            // utilisé pour du debugage
            //console.log("postAjax se lance")
            click.xmlhttp.onload = function() {console.log(this.responseText)}
        }
        click.close(elementEditable);
    },

    // ferme un élément textarea entré en paramètre
    close: function (element) {
        if (element != null) {
            const buttonElement = document.querySelector(".quitEditButton");
            buttonElement.textContent = "Edit content";
            buttonElement.classList.remove("quitEditButton");

            for (element of click.elementEditable) {
                element.setAttribute("readonly", "true");
                element.classList.remove("textAreaEditable");
            }
            click.elementEditable = null;
        }
    },
}





