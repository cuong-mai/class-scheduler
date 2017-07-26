// Global Variables
var gDayDisabledList = [];
var gSectionClosedInfoList = [];
var gCourseContainer;
var gRightPanel;
var gSchedulePageOverview;
var gSchedulePageResult;
var gScheduleOverview;
var gScheduleResultList = new Array();
var gCurrentTermData;
var gCourseList = [];
var gSectionCombList = new Array();

$(document).ready(function () {
    init();
    assignEvents();
    
    importData(); 
    
    
});

function init() {
    gRightPanel = new RightPanel();
    gSchedulePageOverview = new SchedulePage("overview", gSectionClosedInfoList, gDayDisabledList);
    gRightPanel.appendSchedulePage(gSchedulePageOverview);
    
    gScheduleOverview = new Schedule("overview", gDayDisabledList);
    gSchedulePageOverview.appendSchedule(gScheduleOverview);
    
    gCourseContainer = new CourseContainer();
    
    gCurrentTermData = data.termList[0];
}

function assignEvents() {
    $("#button-import").click(importData);
    $("#button-generate").click(generateSchedules);
}
