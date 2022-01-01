const autoSizeTextarea = {
    init: function() {
        const textAreaElementsList = document.querySelectorAll(".blocInfoTextarea");

        for (let i = 0; i < textAreaElementsList.length; i++) {
            textAreaElementsList[i].setAttribute("style", "height:" + (textAreaElementsList[i].scrollHeight) + "px;overflow-y:hidden;");
            textAreaElementsList[i].addEventListener("input", autoSizeTextarea.OnInput, false);
        }
    },

    onInput: function() {
        const textareaElementEditable = document.querySelector(".textAreaEditable");
        textareaElementEditable.style.height = "auto";
        textareaElementEditable.style.height = (textareaElementEditable.scrollHeight) + "px";
    }
}