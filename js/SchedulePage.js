class SchedulePage {
    constructor(schedulePageType_, sectionClosedInfoList_, dayDisabledList_) {
        this.schedulePageType = schedulePageType_;

        var type = scheduleProperty(this.schedulePageType).TYPE;
        var sectionClosedInfoListStr = (sectionClosedInfoList_.length > 0 ? "" : "None");
        for (var i = 0; i < sectionClosedInfoList_.length; i++) {
            sectionClosedInfoListStr = sectionClosedInfoListStr + sectionClosedInfoList_[i] +
                (i < sectionClosedInfoList_.length - 1 ? ", " : "");
        }
        var dayDisabledListStr = (dayDisabledList_.length > 0 ? "" : "None");
        for (var i = 0; i < dayDisabledList_.length; i++) {
            dayDisabledListStr = dayDisabledListStr + dayDisabledList_[i].substr(0, 3) +
                (i < dayDisabledList_.length - 1 ? ", " : "");
        }
        var filterInfo = (schedulePageType_ == "overview" ? "" : (" (section(s) off: " + sectionClosedInfoListStr + 
            " | day(s) off: " + dayDisabledListStr + 
            ")"));
        this.$infoElement = $($.parseHTML(
            '<span class="label-schedule-page-info">' + type + " " + filterInfo + '</span>'
        ));
        
        this.$viewElement = $($.parseHTML(
            '<div class="row row-schedule-container">' +
                '<div class="col-sm-12 height-100-percent">' +
                '</div>' +
            '</div>'
        ));
    }
    
    appendSchedule(schedule_) {
        this.$viewElement.children().first().append(schedule_.$viewElement);
    }
    
    
}