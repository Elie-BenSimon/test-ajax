const autoSizeTextarea = {
    init: function() {
        const textAreaElementsList = document.querySelectorAll(".blocInfoTextarea");

        for (let i = 0; i < textAreaElementsList.length; i++) {
            textAreaElementsList[i].setAttribute("style", "min-height:" + (textAreaElementsList[i].scrollHeight) + "px;overflow-y:hidden;");
            textAreaElementsList[i].addEventListener("input", autoSizeTextarea.OnInput, false);
        }
    },

    onInput: function() {
        const textareaElementEditable = document.querySelectorAll(".textAreaEditable");
        for(textareaElement of textareaElementEditable) {
            textareaElement.style.minHeight = (textareaElement.scrollHeight) + "px";
        }
    }
}