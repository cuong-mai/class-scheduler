// Global Variables
var gDayDisabledList = [];
var gSectionClosedInfoList = [];

var gOverlay;
var gTooltipHandler;
var gWelcomeDialog;
var gImportDialog;
var gCourseContainer;
var gRightPanel;
var gSchedulePageOverview;
var gSchedulePageResult;
var gScheduleOverview;
var gScheduleResultList = new Array();
var gCurrentTermData;
var gCourseList = [];
var gCourseSelectedList = [];
var gCourseSelectedListTemp = [];
var gSectionCombList = new Array();

$(document).ready(function () {
    init();
    assignEvents();
});

function init() {
    $("#tooltip-comment").tooltip();   
    gTooltipHandler = setInterval(toggleCommentTooltip, 180000);

    gCurrentTermData = data.termList[0];
    
    gOverlay = new Overlay();
    gOverlay.show();

    gWelcomeDialog = new WelcomeDialog();
    gWelcomeDialog.show();

    gImportDialog = new ImportDialog();
    
    gRightPanel = new RightPanel();
    gSchedulePageOverview = new SchedulePage("overview", gSectionClosedInfoList, gDayDisabledList);
    gRightPanel.appendSchedulePage(gSchedulePageOverview);
    
    gScheduleOverview = new Schedule("overview", gDayDisabledList);
    gSchedulePageOverview.appendSchedule(gScheduleOverview);
    
    
    gCourseContainer = new CourseContainer();
    for (var i = 0; i < 2; i++) {
        var emptyCourse = new Course(gEmptyCourseData);
        gCourseContainer.appendCourse(emptyCourse);
    }
    
    for (var i = 0; i < gCurrentTermData.courseList.length; i++) {
        var courseData = gCurrentTermData.courseList[i];
        var newCourse = new Course(courseData);
        gCourseList.push(newCourse);
        gImportDialog.appendCourse(newCourse);
    }
}

function assignEvents() {
    $(".button-comment").bind("click", stopCommentToolTip);
    $(".accordion-toggle").click(toggleCollapseIcon);
    $("#button-import").click(showImportDialog);
    $("#button-generate").click(generateSchedules);
    $(window).resize(gWelcomeDialog.adjustVideoSize);
}
