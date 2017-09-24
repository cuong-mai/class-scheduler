// Course Container (of Left Panel);
//
class CourseContainer {
    // Constructor
    //
    constructor() {
        this.$controlElement = $("#course-container");
        this.courseList = [];
    }
    
    // Append a course to its data and display
    //
    appendCourse(newCourse_) {
        this.courseList.push(newCourse_);
        this.$controlElement.children().first().append(newCourse_.$controlElement);
    }
    
    // Remove a course from its data and display
    //
    removeCourse(course_) {
        this.$controlElement.find(course_.$controlElement).detach();
        this.courseList.splice(this.courseList.indexOf(course_), 1);
        console.log("Removed: ", course_);
    }
    
    // Clear all courses from its data and display
    //
    clear() {
        for (var i = 0; i < this.courseList.length; i++) {
            var currentCourse = this.courseList[i];
            this.$controlElement.find(currentCourse.$controlElement).detach();
        }
        this.courseList = [];
    }
}