class ImportDialog {
    constructor() {
        this.courseList = [];
        this.courseSelectedList = [];
        
        this.$dialogElement = $(".row-import-dialog");
        this.$courseContainerElement = this.$dialogElement.find(".row-import-course-container");
        
        var thisImportDialog = this;
        
        this.$dialogElement.find("#button-import-cancel").unbind();
        this.$dialogElement.find("#button-import-cancel").bind("click", function () {
            cancelImport.call(thisImportDialog);
        });
        
        this.$dialogElement.find("#button-import-ok").unbind();
        this.$dialogElement.find("#button-import-ok").bind("click", function () {
            importData.call(thisImportDialog);
        });
    }
    
    appendCourse(course_) {
        this.courseList.push(course_);
        this.$courseContainerElement.find("tbody").append(course_.$importElement);
    }
    
    show() {
        this.$dialogElement.slideDown(400);
    }
    
    hide() {
        this.$dialogElement.slideUp(300);
    }
}