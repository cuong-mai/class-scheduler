function importData() {
    $.each(gCurrentTermData.courseList, function () {
        var courseData = this;
        var newCourse = new Course(courseData);
        gCourseList.push(newCourse);
        gScheduleOverview.appendCourse(newCourse);
        gCourseContainer.appendCourse(newCourse);
    });
}

function generateSchedules() {
    gScheduleOverview.$scheduleElem.fadeOut(200, function () {
        $(".spinner-wrapper").fadeIn(200, function () {
            gSectionCombList = combineSections(gCourseList);
            for (var i = 0; i < gSectionCombList.length; i++) {
                gScheduleResult[i] = new Schedule(i + 1);
                var sectionList = gSectionCombList[i];
                for (var j = 0; j < sectionList.length; j++) {
                    gScheduleResult[i].appendSection(sectionList[j]);
                }
            }
            $(".spinner-wrapper").fadeOut(200);
        });
    });    
}
