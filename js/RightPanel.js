class RightPanel {
    constructor() {
        this.$viewElement = $("#right-panel");
        
        var thisRightPanel = this;
        this.$viewElement.find(".button-navigation-schedule-forward").unbind();
        this.$viewElement.find(".button-navigation-schedule-forward").bind("click", function () {
            thisRightPanel.navigateSchedulePage(1);
        });
        this.$viewElement.find(".button-navigation-schedule-back").unbind();
        this.$viewElement.find(".button-navigation-schedule-back").bind("click", function () {
            thisRightPanel.navigateSchedulePage(-1);
        });
        
        this.schedulePageList = [];
        this.currentSchedulePageIndex = -1;
    }
    
    appendSchedulePage(schedulePage_) {
        if (this.currentSchedulePageIndex >=0) {
            this.hideSchedulePage(this.schedulePageList[this.currentSchedulePageIndex]);
            this.$viewElement.find(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_enabled.png");
            this.$viewElement.find(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_disabled.png");
        }
        
        this.$viewElement.children().first().children().first().children().first().append(schedulePage_.$infoElement);
        this.$viewElement.children().first().append(schedulePage_.$viewElement);
        
        this.schedulePageList.push(schedulePage_);
        this.currentSchedulePageIndex = this.schedulePageList.length - 1;
        
        this.$viewElement.children().first().children().first().children().first().
        find(".label-schedule-page-number").text("Page " + (this.currentSchedulePageIndex + 1) + "/" + this.schedulePageList.length);
    }
    
    hideSchedulePage(schedulePage_) {
        this.$viewElement.find(schedulePage_.$infoElement).hide();
        this.$viewElement.find(schedulePage_.$viewElement).fadeOut(200);
    }
    
    showSchedulePage(schedulePage_) {
        this.$viewElement.find(schedulePage_.$infoElement).show();
        this.$viewElement.find(schedulePage_.$viewElement).fadeIn(200);
    }
    
    navigateSchedulePage(pageCount_) {
        if ((pageCount_ > 0 && this.currentSchedulePageIndex < this.schedulePageList.length - 1) ||
            ((pageCount_ < 0 && this.currentSchedulePageIndex > 0))) {
            this.hideSchedulePage(this.schedulePageList[this.currentSchedulePageIndex]);
            this.showSchedulePage(this.schedulePageList[this.currentSchedulePageIndex + pageCount_]);
            this.currentSchedulePageIndex += pageCount_;
            
            this.$viewElement.children().first().children().first().children().first().
            find(".label-schedule-page-number").text("Page " + (this.currentSchedulePageIndex + 1) + "/" + this.schedulePageList.length);
            
            if (this.currentSchedulePageIndex > 0) {
                this.$viewElement.find(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_enabled.png");
            } else {
                this.$viewElement.find(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_disabled.png");
            }
            if (this.currentSchedulePageIndex < this.schedulePageList.length - 1) {
                this.$viewElement.find(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_enabled.png");
            } else {
                this.$viewElement.find(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_disabled.png");
            }
        }
    }
    
//    appendMessage(message_) {
//        if (this.currentSchedulePageIndex >=0) {
//            this.hideSchedulePage(this.schedulePageList[this.currentSchedulePageIndex]);
//            this.$viewElement.find(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_enabled.png");
//            this.$viewElement.find(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_disabled.png");
//        }
//        
//        this.$viewElement.children().first().children().first().children().first().append(schedulePage_.$infoElement);
//        this.$viewElement.children().first().append(schedulePage_.$viewElement);
//        
//        this.schedulePageList.push(schedulePage_);
//        this.currentSchedulePageIndex = this.schedulePageList.length - 1;
//        
//        this.$viewElement.children().first().children().first().children().first().
//        find(".label-schedule-page-number").text("Page " + (this.currentSchedulePageIndex + 1) + "/" + this.schedulePageList.length);
//        
//    }
}