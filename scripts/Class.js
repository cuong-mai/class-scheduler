class Class {
    constructor(courseCode_, sectionCode_, teacher_, color_, classData_,zOrder_) {
        this.courseCode = courseCode_;
        this.sectionCode = sectionCode_;
        this.teacher = teacher_;
        this.color = color_;
        this.classData = classData_;
        this.zOrder = zOrder_;
//        this.scheduleIndex = scheduleIndex_;
        this.$viewElement = $($.parseHTML(
            '<div class="class">' + 
                '<label class="label-class">' + this.courseCode + '-</label>' +
                '<label class="label-class label-class-hideable">' + this.sectionCode + '-</label>' +
                '<label class="label-class">' + this.teacher + '</label>' +
                '<br>' +
                '<label class="label-class label-class-hideable">' + time24ToAP(this.classData.startTime) + '-</label>' +
                '<label class="label-class label-class-hideable">' + time24ToAP(this.classData.endTime) + '</label>' +
            '</div>'
        ));
        
        var courseIndex = 0;
        var sectionIndex = 0;
        var classIndex = 0;
        var startTime = this.classData.startTime;
        var endTime = this.classData.endTime;

        this.$controlElement = $($.parseHTML(
            '<div id="class-' + courseIndex + '-' + sectionIndex + '-' + classIndex + '" class="row row-of-left-panel">' +
                '<div class="col-sm-3 col-of-left-panel">' +
                    '<div class="row-label">' +
                        '<input type="checkbox" checked>' +
                        '<label>Day ' + (classIndex + 1) + '</label>' +   
                    '</div>' +
                    '<select class="input-large">' +
                        '<option value="Monday">Mon</option>' +
                        '<option value="Tuesday">Tue</option>' +
                        '<option value="Wednesday">Wed</option>' +
                        '<option value="Thursday">Thu</option>' +
                        '<option value="Friday">Fri</option>' +
                        '<option value="Saturday">Sat</option>' +
                        '<option value="Sunday">Sun</option>' +
                    '</select> ' +
                '</div>' +
                '<div class="col-sm-4 col-of-left-panel">' +
                    '<div class="row-label">' +
                        '<label>Start time</label>' +   
                    '</div>' +
                    '<input type="time" class="input-large" min="00:00" value="' + startTime + '">' +   
                '</div>' +
                '<div class="col-sm-5 col-of-left-panel">' +
                    '<div class="row-label">' +
                        '<label>End time</label>' +   
                        '<span class="button-delete"></span>' +   
                    '</div>' +
                    '<input type="time" class="input-large" min="00:00" value="' + endTime + '">' +   
                '</div>' +
            '</div>'
        ));
        
        this.updateView();
    }
    
    // TODO: Pass zOrder here instead of in constructor
    updateView() {
        var position = timeToPosition(this.classData, this.zOrder);
        this.$viewElement.css({
            "top": position.top + "%", 
            "left": position.left + "%",
            "height": position.height + "%",
            "width": position.width + "%",
             "background-color": this.color
//            "border": "2px solid " + this.color
        });
        this.$viewElement.find(".label-class-hideable").css({
//            "display": scheduleProperty(this.scheduleIndex).LABEL_CLASS_HIDEABLE_CSS_DISPLAY    
//            "display": "none"
        });
    }
}