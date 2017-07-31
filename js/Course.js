class Course {
    constructor(courseData_) {
        this.courseData = courseData_;
        this.scheduleType = "";
        this.sectionList = [];
        var index = 0;
        var courseCode = this.courseData.code;
        var numberOfSections = this.courseData.sectionList.length;
        this.$importElement = $($.parseHTML(
            '<tr>' +
                '<td>' +
                    '<span class="accordion-toggle glyphicon glyphicon-chevron-right" data-toggle="collapse" data-target=".section-of-' + this.courseData.code + '">' +
                    '</span>' +
                '</td>' +   
                '<td><input type="checkbox" class="checkbox-import"></td>' +
                '<td>' + this.courseData.code + '</td>' +
                '<td>' + this.courseData.name + '</td>' +
                '<td>'+ numberOfSections + ' sections offered</td>' +
                '<td>Required for: ' + this.courseData.requiredTerm + ' term</td>' +
            '</tr>'
        ));
        
        var thisCourse = this;
        var objectPassed = {course: thisCourse, checked: false};
        this.$importElement.find(".checkbox-import").unbind();
        this.$importElement.find(".checkbox-import").bind("click", function () {
            objectPassed.checked = $(this).prop("checked");
            toggleSelectCourse.call(objectPassed);
        });

        this.$controlElement = $($.parseHTML(
            '<div id="course-' + '" class="row">' +
                '<div class="col-sm-12">' +
                    '<div class="row row-of-left-panel row-course-heading">' +
                        '<div class="col-sm-6 col-of-left-panel">' + 
                            '<input type="checkbox" checked>' +
                            '<label class="label-course">Course ' + '</label>' +  
                            '<input type="text" class="input-large" value="' + courseCode + '">' +   
                        '</div>' +
                        '<div class="col-sm-6 col-of-left-panel">' +
                            '<label>No. of sections</label>' + 
                            '<span class="button-delete"></span>' +
                            '<input type="number" class="input-large" min="1" value="' + numberOfSections + '">' +   
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row-break">' +
            '</div>'
        ));
        
        this.$viewElement = $($.parseHTML('<div class="course"></div>'));
        
        for (var i = 0; i < courseData_.sectionList.length; i++) {
            var sectionData = courseData_.sectionList[i];
            var newSection = new Section(this.courseData.code, sectionData);
            this.appendSection(newSection);
        }
    }
    
    appendSection(newSection_) {
        newSection_.scheduleType = this.scheduleType;
        this.sectionList.push(newSection_);
        this.$importElement = this.$importElement.add(newSection_.$importElement);
        this.$controlElement.children().first().append(newSection_.$controlElement);
        this.$viewElement.append(newSection_.$viewElement);
    }
}