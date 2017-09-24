// Import Course Dialog
//
class ImportDialog {
    // Constructor
    //
    constructor(data_) {
        this.data = data_;
        this.courseList = [];
        this.courseSelectedList = [];
        
        this.$dialogElement = $(".row-import-dialog");
        
        this.$dialogElement.find(".label-import-updated").text("Data updated on: " + this.data.updated);
        
        this.$courseContainerElement = this.$dialogElement.find(".row-import-course-container");
        
        this.loadInstitution(this.data);
        this.loadProgram(this.data.institutionList[0]);
        this.loadTerm(this.data.institutionList[0].programList[0]);

        var thisImportDialog = this;
        
        this.$dialogElement.find(".select-program").unbind();
        this.$dialogElement.find(".select-program").bind("change", function () {
            setProgram.call(thisImportDialog);
        });

        this.$dialogElement.find("#button-import-cancel").unbind();
        this.$dialogElement.find("#button-import-cancel").bind("click", function () {
            cancelImport.call(thisImportDialog);
        });
        
        this.$dialogElement.find("#button-import-ok").unbind();
        this.$dialogElement.find("#button-import-ok").bind("click", function () {
            importData.call(thisImportDialog);
        });
    }
    
    // Load Instition list from data
    //
    loadInstitution(data_) {
        for (var i = 0; i < data_.institutionList.length; i++) {
            var $newOptionElement = $($.parseHTML(
                '<option>' + data_.institutionList[i].name + '</option>'
            ));
            this.$dialogElement.find(".select-institution").append($newOptionElement);
        }
    }

    // Load Program list from data
    //
    loadProgram(institutionData_) {
        this.$dialogElement.find(".select-program").empty();
        for (var i = 0; i < institutionData_.programList.length; i++) {
            var $newOptionElement = $($.parseHTML(
                '<option>' + institutionData_.programList[i].code + '</option>'
            ));
            this.$dialogElement.find(".select-program").append($newOptionElement);
        }
    }
    
    // Load Term list from data
    //
    loadTerm(programData_) {
        this.$dialogElement.find(".select-term").empty();
        for (var i = 0; i < programData_.termList.length; i++) {
            var $newOptionElement = $($.parseHTML(
                '<option>' + programData_.termList[i].name + '</option>'
            ));
            this.$dialogElement.find(".select-term").append($newOptionElement);
        }
    }
    
    // Append a course to course list
    //
    appendCourse(course_) {
        this.courseList.push(course_);
        this.$courseContainerElement.find("tbody").append(course_.$importElement);
    }
    
    // Set course list
    //
    setCourseList(courseList_) {
        this.clear();
        for (var i = 0; i < courseList_.length; i++) {
            this.appendCourse(courseList_[i]);
        }
    }
    
    // Clear course list
    //
    clear() {
        this.courseList = [];
        this.$courseContainerElement.find("tbody").empty();
    }
    
    // Show the Dialog
    //
    show() {
        this.$dialogElement.slideDown(400);
    }
    
    // Hide the Dialog
    //
    hide() {
        this.$dialogElement.slideUp(300);
    }
}