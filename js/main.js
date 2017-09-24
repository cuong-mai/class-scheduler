// Main

// Global Variables
//
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
var gCurrentInsitutionIndex = 0;
var gCurrentProgramIndex = 0;
var gCurrentTermIndex = 0;
var gCourseList = [];
var gCourseSelectedList = [];
var gCourseSelectedListTemp = [];
var gSectionCombList = new Array();

// Main - when document ready
//
$(document).ready(function () {
    init();
    assignEvents();
});

// Initialize elements and data
//
function init() {
    
    $("#tooltip-comment").tooltip();   
    gTooltipHandler = setInterval(toggleCommentTooltip, 180000);
    
    gOverlay = new Overlay();
    gOverlay.show();
    
    gWelcomeDialog = new WelcomeDialog();
    gWelcomeDialog.show();
    
    gImportDialog = new ImportDialog(data);
    
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
    
    loadData(gCurrentInsitutionIndex, gCurrentProgramIndex, gCurrentTermIndex);
    gImportDialog.setCourseList(gCourseList);
}

// Assign event handlers
//
function assignEvents() {
    $(".button-comment").bind("click", stopCommentToolTip);
    $(".accordion-toggle").click(toggleCollapseIcon);
    $("#button-import").click(showImportDialog);
    $("#button-generate").click(generateSchedules);
    $(window).resize(gWelcomeDialog.adjustVideoSize);
}
