class Course {
    constructor(courseData_) {
        this.courseData = courseData_;
//        this.scheduleIndex = scheduleIndex_;
        this.sectionList = [];
        this.activeSectionIndex = null;
        this.$viewElement = $($.parseHTML('<div class="course"></div>'));
        var index = 0;
        var courseCode = this.courseData.code;
        var numberOfSections = this.courseData.sectionList.length;
        this.$controlElement = $($.parseHTML(
            '<div id="course-' + index + '" class="row">' +
                '<div class="col-sm-12">' +
                    '<div class="row row-of-left-panel row-course-heading">' +
                        '<div class="col-sm-6 col-of-left-panel">' + 
                            '<input type="checkbox" checked>' +
                            '<label class="label-course">Course ' + (index + 1) + '</label>' +  
                            '<input type="text" class="input-large" value="' + courseCode + '">' +   
                        '</div>' +
                        '<div class="col-sm-6 col-of-left-panel">' +
                            '<label>No. of sections</label>' + 
                            '<span class="button-delete"></span>' +
                            '<input type="number" class="input-large" min="1" value="' + numberOfSections + '">' +   
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ));
        
        for (var i = 0; i < courseData_.sectionList.length; i++) {
            var sectionData = courseData_.sectionList[i];
            var newSection = new Section(this.courseData.code, sectionData);
            this.appendSection(newSection);
        }
    }
    
    appendSection(newSection_) {
        this.sectionList.push(newSection_);
        this.$controlElement.children().first().append(newSection_.$controlElement);
        this.$viewElement.append(newSection_.$viewElement);
    }
}