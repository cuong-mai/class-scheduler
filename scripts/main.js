// Global Variables
var gCourseContainer;
var gScheduleOverview;
var gScheduleResult = new Array();
var gCurrentTermData;
var gCourseList = [];
var gSectionCombList = new Array();

$(document).ready(function () {
    init();
    assignEvents();
    
//    importData(); 
});

function init() {
    gScheduleOverview = new Schedule(0);
    gCourseContainer = new CourseContainer;
    gCurrentTermData = data.termList[0];
}

function assignEvents() {
    $("#button-import").click(importData);
    $("#button-generate").click(generateSchedules);
}

function test8() {
}

function test7() {
    console.log(combineSections(gCourseList));
}

function test6() {
    console.log("Overlapping: ", isSectionListOverlapping([gCourseList[0].sectionList[0], gCourseList[0].sectionList[1]],
                                     gCourseList[4].sectionList[0]));
    var x = {"name": "James"};
    var array1 = [x, 2, 3];
    var array2 = appendToNewArray(array1, 99);
    x.name = "Modified";
    console.log(array2);
}


function test5() {
    var scheduleOverview = new Schedule(0);
    var courseContainer = new CourseContainer;
    
    var currentTermData = data.termList[0];
    $.each(currentTermData.courseList, function () {
        var courseData = this;
        var newCourse = new Course(courseData);
        scheduleOverview.appendCourse(newCourse);
        courseContainer.appendCourse(newCourse);
    });
}

function test4() {
//    var scheduleOverview2 = new Schedule(1);
//    var scheduleOverview3 = new Schedule(2);
    var scheduleOverview = new Schedule(0);

    var currentTermData = data.termList[0];
    $.each(currentTermData.courseList, function () {
        var courseData = this;
        var newCourse = new Course(courseData);
        scheduleOverview.appendCourse(newCourse);
    });
}

function test3() {
    var $elem1 = $();
    var $elem2 = $($.parseHTML("<div>Elem 2</div>"));
    var $elem3 = $($.parseHTML("<div>Elem 3</div>"));

    $elem1 = $elem1.add($elem2);
    $elem2.append($elem3);
    console.log($elem1);
    console.log($elem2);
}

function test2() {
    var scheduleOverview = new Schedule(0);
    var currentTermData = data.termList[0];
    $.each(currentTermData.courseList, function () {
        var courseCode = this.code;
        $.each(this.sectionList, function () {
            scheduleOverview.appendSection(courseCode, this);
        });
    });

}

function test1() {

    var scheduleOverview = new Schedule(0);
    var classTmp1 = new Class("TMP001", "SAA", "Teacher1", "red", 
                              {"dayOfWeek": "Sunday", "startTime": "09:00", "endTime": "11:00"}, "1/1", scheduleOverview);
    var classTmp2 = new Class("TMP002", "SAA", "Teacher2", "blue", 
                              {"dayOfWeek": "Sunday", "startTime": "13:00", "endTime": "15:00"}, "1/1", scheduleOverview);
    var $jointClassViewElem = classTmp1.$viewElement.add(classTmp2.$viewElement);
    $jointClassViewElem.css(
        {
           "background-color": "grey" 
        });
    var currentTerm = data.termList[0];
    $.each(currentTerm.courseList, function () {
        var courseCode = this.code;
        $.each(this.sectionList, function () {
            var sectionCode = this.code;
            var teacher = this.teacher;
            var color = this.color;
            $.each(this.classList, function () {
                var day = this;
                scheduleOverview.addClass(courseCode, sectionCode, teacher, color, day, "1/1");    
            });
        });
    });
}