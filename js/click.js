const click = {

    init: function() {
        // on pose un event listener sur tout le document
        document.addEventListener('click', click.handleClick);
        click.elementEditable = null;
    },

    // quand un click a lieu
    handleClick: function(event) {
    
        // récupérer la nature de l'élément sur lequel on a cliqué
        const idInString = event.target.id;
        switch (click.getIdType(idInString)) {
    
            // si cest un bouton "edit"
            case 'editButton':
                // stockage et récupération de l'état de l'élément "pre" associé (editable ou non)
                const preElement = event.target.parentNode.parentNode.querySelector('pre');
                let isEditable = preElement.getAttribute("contentEditable");
                isEditable = (isEditable === 'true');
                
                // si l'élément "pre" associé est editable on le ferme
                if (isEditable) {
                    click.close(click.elementEditable)();
                }
                // sinon on ferme ceux eventuellement ouvert, et l'élément pre associé au bouton cliqué devient editable
                else {
                    if (click.elementEditable != null) {
                        click.close(click.elementEditable);
                    }
                    event.target.textContent = "quit editing";
                    preElement.setAttribute("contenteditable", "true");
                    preElement.focus();
                    click.elementEditable = preElement;
                }
                break;
    
            // si c'est un élément "pre"
            case 'blocInfoPre':
                // s'il n'est pas editable le potentiel élément "pre" editable est fermé
                if (event.target.getAttribute("contentEditable") === "false") {
                    click.close(click.elementEditable);
                }
                break;
    
            // sinon, le potentiel élément "pre" editable est fermé
            default:
                click.close(click.elementEditable);
                break;
        }
    },

    post: function(id, value) {
        let form = document.createElement('form');
        form.method = 'GET';
        form.innerHTML = `<input name=${id} value=${value} type='hidden'>`;
        document.body.append(form);
        form.submit();
    },
    
    // utilise le début des id pour renvoyer le type d'element
    getIdType: function(str) {
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

    close: function(element) {
        if (element != null) {
            const buttonElement = click.elementEditable.parentNode.querySelector(".editButton");
            buttonElement.textContent = "Edit content";
            element.setAttribute("contenteditable", "false");
            click.elementEditable = null;
        }
    },

    closeAllPre: function() {
        // ferme tous les "pre" editable
        const preElementList = document.querySelectorAll('pre');
        for(preElement of preElementList) {
            preElement.setAttribute("contenteditable", "false");
        }
    
        // modifie le texte du bouton quit editing
        const buttonElementList = document.querySelectorAll('button');
        for(buttonElement of buttonElementList) {
            if (buttonElement.textContent === "quit editing") {
                buttonElement.textContent = "edit content";
            }
        }
        //click.post();
    }
}





