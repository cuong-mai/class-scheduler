// Message - displayed when/after generating schedules
//
class Message {
    // Constructor
    //
    constructor(imageType_, text_) {
        switch (imageType_) {
            case "noresult":
                this.imageUrl = "images/no_result_64_2.png";
                break;
            case "loading":
                this.imageUrl = "images/spinner_loading.gif";
                break;
        }
        this.$viewElement = $($.parseHTML(
            '<div class="row row-message">' +
                '<div class="col-sm-12 height-100-percent">' +
                    '<div class="message-wrapper">' +
                        '<img class="message-image" src="' + this.imageUrl + '">' +
                        '<p class="message-text">' + 
                            text_ +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' 
        ));
    }
    
}