// on pose un event listener sur tout le document
document.addEventListener('click', handleClick);

// quand un click a lieu
function handleClick(event) {
    //event.preventDefault();

    // récupérer la nature de l'élément sur lequel on a cliqué
    const idInString = event.target.id;
    switch (getIdType(idInString)) {

        // si cest un bouton "edit"
        case 'editButton':
            // récupération de l'élément "pre" associé
            const preElement = event.target.parentNode.querySelector('pre');
            // est ce que ce dernier est editable?
            let isEditable = preElement.getAttribute("contentEditable");
            isEditable = (isEditable === 'true');
            
            // si l'élément "pre" associé est editable on le ferme
            if (isEditable) {
                closeAllPre();
            }
            // sinon on ferme ceux eventuellement ouvert, et l'élément pre associé au bouton cliqué devient editable
            else {
                event.target.textContent = "quit editing";
                preElement.setAttribute("contenteditable", "true");
                preElement.focus();
            }
            break;

        // si c'est un élément "pre"
        case 'blocInfoPre':
            // s'il n'est pas editable le potentiel élément "pre" editable est fermé
            if (event.target.getAttribute("contentEditable") === "false") {
                closeAllPre();
            }
            break;

        // sinon, le potentiel élément "pre" editable est fermé
        default: closeAllPre();
            closeAllPre();
            break;
    }
}

// utilise le début des id pour renvoyer le type d'element
function getIdType(str) {
    if (str.indexOf('editButton') >= 0) {
        return 'editButton';
    }
    else if (str.indexOf('blocInfoPre') >= 0) {
        return 'blocInfoPre';
    }
    else {
        return 'other';
    }
}


function closeAllPre() {
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
}

