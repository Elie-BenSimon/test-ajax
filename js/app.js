const app = {
    init: function() {
        click.init();
        autoSizeTextarea.init();
    },
};

document.addEventListener('DOMContentLoaded', app.init);