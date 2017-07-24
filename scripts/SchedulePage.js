class SchedulePage {
    constructor() {
        this.$viewElement = $($.parseHTML(
            '<div class="row row-schedule-container">' +
                '<div class="col-sm-12 height-100-percent">' +
                '</div>' +
            '</div>'
        ));
    }
    
    appendSchedule(schedule_) {
        this.$viewElement.children().first().append(schedule_.$scheduleElem);
    }
    
    
}