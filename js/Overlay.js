// Overlay - dark transparent - to hide backround when Dialogs show
//
class Overlay {
    constructor() {
        this.$viewElement = $(".overlay");
    }
    
    show() {
        this.$viewElement.fadeIn(200);
    }
    
    hide() {
        this.$viewElement.fadeOut(300);
    }
}