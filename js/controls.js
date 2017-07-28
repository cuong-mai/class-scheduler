function importData() {
    $.each(gCurrentTermData.courseList, function () {
        var courseData = this;
        var newCourse = new Course(courseData);
        gCourseList.push(newCourse);
        gImportCourseContainer.appendCourse(newCourse);
        gCourseContainer.appendCourse(newCourse);
        gScheduleOverview.appendCourse(newCourse);
    });
}

function toggleCollapseIcon() {
    $(this).toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
}

function generateSchedules() {
    gRightPanel.hideSchedulePage(gSchedulePageOverview);
    gSchedulePageResult = new SchedulePage("result", gSectionClosedInfoList, gDayDisabledList);
    
    $(".spinner-wrapper").fadeIn(200, function () {
        gSectionCombList = combineSections(gCourseList);
        for (var i = 0; i < gSectionCombList.length; i++) {
            gScheduleResultList[i] = new Schedule("result", gDayDisabledList);
            var sectionList = gSectionCombList[i];
            for (var j = 0; j < sectionList.length; j++) {
                gScheduleResultList[i].appendSection(sectionList[j]);
            }
            gSchedulePageResult.appendSchedule(gScheduleResultList[i]);
        }
        gRightPanel.appendSchedulePage(gSchedulePageResult);
        $(".spinner-wrapper").fadeOut(200);
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
