class CourseContainer {
    constructor() {
        this.$controlElement = $("#course-container");
        this.courseList = [];
    }
    
    appendCourse(newCourse_) {
        this.courseList.push(newCourse_);
        this.$controlElement.children().first().append(newCourse_.$controlElement);
    }
    
    removeCourse(course_) {
        this.$controlElement.find(course_.$controlElement).detach();
        this.courseList.splice(this.courseList.indexOf(course_), 1);
        console.log("Removed: ", course_);
    }
    
    clear() {
        for (var i = 0; i < this.courseList.length; i++) {
            var currentCourse = this.courseList[i];
            this.$controlElement.find(currentCourse.$controlElement).detach();
        }
        this.courseList = [];
    }
}