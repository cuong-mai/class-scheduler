class CourseContainer {
    constructor() {
        this.$controlElement = $("#course-container");
        this.courseList = [];
    }
    
    appendCourse(newCourse_) {
        this.courseList.push(newCourse_);
        this.$controlElement.children().first().append(newCourse_.$controlElement);
        this.$controlElement.children().first().append($($.parseHTML(
            '<div class="row-break">' +
            '</div>'
        )));
    }
}