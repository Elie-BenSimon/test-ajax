const autoSizeTextarea = {
    init: function() {
        const textAreaElementsList = document.querySelectorAll(".blocInfoTextarea");

        for (let i = 0; i < textAreaElementsList.length; i++) {
            console.log("dans la boucle");
            textAreaElementsList[i].setAttribute("style", "height:" + (textAreaElementsList[i].scrollHeight) + "px;overflow-y:hidden;");
            textAreaElementsList[i].addEventListener("input", autoSizeTextarea.OnInput, false);
        }
    },

    onInput: function() {
        const textareaElementEditable = document.querySelector(".textAreaEditable");
        console.log(textareaElementEditable);
        textareaElementEditable.style.height = "auto";
        textareaElementEditable.style.height = (textareaElementEditable.scrollHeight) + "px";
        console.log("onInput se lance");
    }
}