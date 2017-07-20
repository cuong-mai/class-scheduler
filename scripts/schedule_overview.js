// Schedule Overview Object

var scheduleOverview = {
    tableScheduleIndex: TABLE_SCHDEDULE_OVERVIEW_INDEX,
    classList: [],

    updateView: function () {
        var parentHeight = $tableScheduleElemList[this.tableScheduleIndex].parent().height();
        var parentWidth = $tableScheduleElemList[this.tableScheduleIndex].parent().width();
        $tableScheduleElemList[this.tableScheduleIndex].css({
            "margin-top": TABLE_SCHEDULE_TOP + "px", 
            "margin-left": TABLE_SCHEDULE_LEFT + "px",
            "height": (parentHeight - TABLE_SCHEDULE_TOP) + "px",
            "width": (parentWidth - TABLE_SCHEDULE_LEFT) + "px",
            "background-color": "grey"
        });
    },
    
    addClass: function (day_, color_, zOrder_) {
        var newClass = new Class(day_, color_, zOrder_, this.tableScheduleIndex);
        this.classList.push(newClass);
        newClass.updateView();
    }
};





