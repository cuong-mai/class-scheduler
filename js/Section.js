class Section {
    constructor(courseCode_, sectionData_) {
        this.courseCode = courseCode_;
        this.sectionData = sectionData_;
        this.scheduleType = "";
        this.isOpen = true;
        this.isEnable = true;
        this.classList = [];
        this.$viewElement = $($.parseHTML('<div class="section"></div>'));

        var courseIndex = 0;
        var sectionIndex = 0;
        var sectionCode = this.sectionData.code;
        var sectionTeacher = this.sectionData.teacher;
        var sectionColor = this.sectionData.color;
        var numberOfClasses = this.sectionData.classList.length;
        this.$controlElement = $($.parseHTML(
            '<div id="section-' + courseIndex + '-' + sectionIndex + '" class="row row-section">' +
                '<div class="col-sm-12">' +    
                    '<div class="row row-of-left-panel">' +
                        '<div class="col-sm-6 col-of-left-panel">' +
                            '<input type="checkbox" checked>' +
                            '<label>Section ' + (sectionIndex + 1) + '</label>' +   
                        '</div>' +
                        '<div class="col-sm-6 col-of-left-panel">' +
                            '<span class="button-delete"></span>' +   
                        '</div>' + 
                    '</div>' +
                    
                    '<div class="row row-of-left-panel">' +
                        '<div class="col-sm-3 col-of-left-panel">' +
                            '<label>Code</label>' +   
                            '<input type="text" class="input-large" value="' + sectionCode + '">' +   
                        '</div>' +
                        '<div class="col-sm-4 col-of-left-panel">' +
                            '<label>Teacher(s)</label>' +   
                            '<input type="text" class="input-large" value="' + sectionTeacher + '">' +      
                        '</div>' +
                        '<div class="col-sm-3 col-of-left-panel">' +
                            '<label>Classes</label>' +   
                            '<input type="number" class="input-large" min="1" value="' + numberOfClasses + '">' +      
                        '</div>' +
                        '<div class="col-sm-2 col-of-left-panel">' +
                            '<label>Color</label>' +   
                            '<input type="color" class="input-large" value="' + sectionColor + '">' +      
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ));
        
        for (var i = 0; i < sectionData_.classList.length; i++) {
            var classData = sectionData_.classList[i];
            var newClass = new Class(this.courseCode, this.sectionData.code, this.sectionData.teacher, 
                this.sectionData.color, classData, "1/1");
            this.appendClass(newClass);
        }
    }
    
    appendClass(newClass_) {
        newClass_.scheduleType = this.scheduleType;
        this.classList.push(newClass_);
        this.$controlElement.children().first().append(newClass_.$controlElement);
        this.$viewElement.append(newClass_.$viewElement);
        
        var thisSection = this;
        this.$viewElement.unbind();
        this.$viewElement.bind("click", function () {
            toggleEnableSection.call(thisSection);
        });
    }
    
    open() {
        this.isOpen = true;
        if (this.isOpen && this.isEnable) {
            this.$viewElement.children().css({
                "filter": "opacity(100%)"
            });            
        }
        for (var i = 0; i < this.classList.length; i++) {
            var currentClass = this.classList[i];
            currentClass.open();
        }
    }

    close() {
        this.isOpen = false;
        this.$viewElement.children().css({
            "filter": "opacity(40%)"
        });
        for (var i = 0; i < this.classList.length; i++) {
            var currentClass = this.classList[i];
            currentClass.close();
        }
    }
    
    enable() {
        this.isEnable = true;
        if (this.isOpen && this.isEnable) {
            this.$viewElement.children().css({
                "filter": "opacity(100%)"
            });            
        }
    }
    
    disable() {
        this.isEnable = false;
        this.$viewElement.children().css({
            "filter": "opacity(40%)"
        });
    }
} // End of Class Section