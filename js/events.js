function showWelcomeDialog() {
    gOverlay.show();
}

function startApp() {
    gWelcomeDialog.stopVideo();
    gWelcomeDialog.hide();
    gOverlay.hide();
}

function loadData(institutionIndex_, programIndex_, termIndex_) {
    gCourseList = [];
    var currentTermData = data.institutionList[institutionIndex_].programList[programIndex_].termList[termIndex_];
    for (var i = 0; i < currentTermData.courseList.length; i++) {
        var currentCourseData = currentTermData.courseList[i];
        var newCourse = new Course(currentCourseData);
        gCourseList.push(newCourse);
    }
} 

function showCommentTooltip() {
    $("#tooltip-comment").tooltip("show");   
}

function hideCommentTooltip() {
    $("#tooltip-comment").tooltip("hide");   
}

function toggleCommentTooltip() {
    showCommentTooltip();
    setTimeout(hideCommentTooltip, 5000);
}

function stopCommentToolTip() {
    clearInterval(gTooltipHandler);
}

function showImportDialog() {
    gOverlay.show();
    gImportDialog.show();
}

function setProgram() {
    var thisImportDialog = this;
    gCourseSelectedListTemp = [];
    gCurrentProgramIndex = thisImportDialog.$dialogElement.find(".select-program option:selected").index();
    
    thisImportDialog.loadTerm(data.institutionList[gCurrentInsitutionIndex].programList[gCurrentProgramIndex]);
    
    loadData(gCurrentInsitutionIndex, gCurrentProgramIndex, 0);
    
    thisImportDialog.setCourseList(gCourseList);
}

function toggleSelectCourse() {
    var objectPassed = this;
    var course = objectPassed.course;
    var selected = objectPassed.checked;
    if (selected) {
        gCourseSelectedListTemp.push(course);
    } else {
        gCourseSelectedListTemp.splice(gCourseSelectedListTemp.indexOf(course), 1);
    }
}

function importData() {
    gCourseSelectedList = gCourseSelectedListTemp;
    gCourseContainer.clear();
    gScheduleOverview.clear();
    
    for (var i = 0; i < gCourseSelectedList.length; i++) {
        var currentCourse = gCourseSelectedList[i];
        gCourseContainer.appendCourse(currentCourse);
        gScheduleOverview.appendCourse(currentCourse);
    }
    
    gRightPanel.navigateSchedulePage(0 - gRightPanel.currentSchedulePageIndex);
    
    if (gCourseSelectedList.length > 0) {
        $("#button-generate").prop("disabled", false);
    }
    
    gImportDialog.hide();
    gOverlay.hide();
}

function cancelImport() {
    var thisImportDialog = this;
    thisImportDialog.hide();
    gOverlay.hide();
}

function toggleCollapseIcon() {
    $(this).toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
}

function toggleEnableSection() {
    var clickedSection = this;
    var sectionInfo = clickedSection.courseCode + "-" + clickedSection.sectionData.code;
    if (!clickedSection.isOpen) {
        clickedSection.open();
        if (gSectionClosedInfoList.indexOf(sectionInfo) >=0 ) {
            gSectionClosedInfoList.splice(gSectionClosedInfoList.indexOf(sectionInfo), 1);
        }
    } else {
        clickedSection.close();
        if (gSectionClosedInfoList.indexOf(sectionInfo) < 0 ) {
            gSectionClosedInfoList.push(sectionInfo);
        }
    }
}

function toggleEnableDay() {
    var objectPassed = this;
    var $changedCheckbox = objectPassed.$checkbox;
    var schedule = objectPassed.schedule;
    var dayOfWeek = objectPassed.dayOfweek;
    if ($changedCheckbox.prop("checked")) {
        if (gDayDisabledList.indexOf(dayOfWeek) >= 0) {
            gDayDisabledList.splice(gDayDisabledList.indexOf(dayOfWeek), 1);
        }
        for (var i = 0; i < schedule.classList[dayOfWeek].length; i++) {
            var currentClass = schedule.classList[dayOfWeek][i];
            parentSection(gCourseList, currentClass).enable();
        }
    } else {
        if (gDayDisabledList.indexOf(dayOfWeek) < 0) {
            gDayDisabledList.push(dayOfWeek);
        }
        for (var i = 0; i < schedule.classList[dayOfWeek].length; i++) {
            var currentClass = schedule.classList[dayOfWeek][i];
            parentSection(gCourseList, currentClass).disable();
        }
    }
}

function generateSchedules() {
//    gRightPanel.hideSchedulePage(gSchedulePageOverview);
    gSchedulePageResult = new SchedulePage("result", gSectionClosedInfoList, gDayDisabledList);

    $(".row-message-loading").fadeIn(200, function () {
        gSectionCombList = combineSections(gCourseSelectedList);
        if (gSectionCombList.length > 0) {
            for (var i = 0; i < gSectionCombList.length; i++) {
                gScheduleResultList[i] = new Schedule("result", gDayDisabledList);
                var sectionList = gSectionCombList[i];
                for (var j = 0; j < sectionList.length; j++) {
                    gScheduleResultList[i].appendSection(sectionList[j]);
                }
                gSchedulePageResult.appendSchedule(gScheduleResultList[i]);
            }
        } else {
            var message = new Message("noresult", "No possible schedule <br> Please enable some other sections or days");
            gSchedulePageResult.appendSchedule(message);
        }
        $(".row-message-loading").hide();
        gRightPanel.appendSchedulePage(gSchedulePageResult);
    });
}

function navigateSchedule(direction_) {
    if (direction_ == "back") {
        for (var i = 0; i < gScheduleResultList.length; i++) {
            gScheduleResultList[i].hide();
        }
        gScheduleOverview.show();
        $(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_disabled.png");
        $(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_enabled.png");
    } 

    if (direction_ == "forward") {
        gScheduleOverview.hide();
        for (var i = 0; i < gScheduleResultList.length; i++) {
            gScheduleResultList[i].show();
        }
        $(".button-navigation-schedule-back").prop("src", "images/button_schedule_back_enabled.png");
        $(".button-navigation-schedule-forward").prop("src", "images/button_schedule_forward_disabled.png");
    }
}


