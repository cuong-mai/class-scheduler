class ImportCourseContainer {
    constructor() {
        this.$viewElement = $(".row-import-course-container");
    }
    
    appendCourse(course_) {
        this.$viewElement.find("tbody").append(course_.$importElement);
    }
}