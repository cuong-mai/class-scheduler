// Welcome Dialog start screen
//
class WelcomeDialog {
    // Constructor
    //
    constructor() {
        this.$viewElement = $(".row-welcome-dialog");
        this.$viewElement.find(".button-start").unbind();
        this.$viewElement.find(".button-start").bind("click", startApp);
        this.adjustVideoSize();
    }
    
    // Show the Dialog
    //
    show() {
        this.$viewElement.slideDown(400);
    }
    
    // Hide the Dialog
    //
    hide() {
        this.$viewElement.slideUp(300);
    }
    
    // Adjust YouTube video ifram responsively
    //
    adjustVideoSize() {
        var $rowWelcomeVideo = $(".row-welcome-video");
        var $welcomeVideoContainer = $(".welcome-video-container");
        var parentHeight = $rowWelcomeVideo.height();
        var parentWidth = $rowWelcomeVideo.width();
        var height;
        var width;
        var marginTop;
        var marginLeft;
        
        if (parentWidth / parentHeight >= 16 / 9) {
            height = parentHeight;
            width = parentHeight / 9 * 16;
        } else {
            width = parentWidth;
            height = parentWidth / 16 * 9;
        }
        
        marginTop = (parentHeight - height) / 2;
        marginLeft = (parentWidth - width) / 2;
        
        $welcomeVideoContainer.css({
            "height": height + "px",    
            "width": width + "px",
            "margin-top": marginTop + "px",
            "margin-left": marginLeft + "px"
        });
    }
    
    // Stop playing the video
    //
    stopVideo() {
        this.$viewElement.find("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    }
}