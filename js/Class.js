class Class {
    constructor(courseCode_, sectionCode_, teacher_, color_, classData_,zOrder_) {
        this.courseCode = courseCode_;
        this.sectionCode = sectionCode_;
        this.teacher = teacher_;
        this.color = color_;
        this.classData = classData_;
        this.zOrder = zOrder_;
        this.scheduleType = "";
        
        var courseIndex = 0;
        var sectionIndex = 0;
        var classIndex = 0;
        var courseCode = this.courseCode;
        var dayOfWeek = this.classData.dayOfWeek;
        var startTime = this.classData.startTime;
        var endTime = this.classData.endTime;
        
        this.$importElement = $($.parseHTML(
            '<td class="td-import-section">' +
                '<div id="" class="accordian-body collapse section-of-' + courseCode + '">' +
                    dayOfWeek +
                '</div>' +
            '</td>' +
            '<td class="td-import-section">' +
                '<div id="" class="accordian-body collapse section-of-' + courseCode + '">' +
                    time24ToAP(startTime) + ' - ' + time24ToAP(endTime) +
                '</div>' +
            '</td>'
        ));
        
        this.$controlElement = $($.parseHTML(
            '<div id="class-' + courseIndex + '-' + sectionIndex + '-' + classIndex + '" class="row row-of-left-panel" title="AAA">' +
                '<div class="col-sm-3 col-of-left-panel">' +
                    '<div class="row-label">' +
                        '<input type="checkbox" checked>' +
                        '<label>Class ' + '</label>' +   
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
        
        this.$controlElement.find("select").val(dayOfWeek);
        
        this.$viewElement = $($.parseHTML(
            '<div class="class">' + 
                '<label class="label-class">' + this.courseCode + '-</label>' +
                '<label class="label-class label-class-hideable">' + this.sectionCode + '-</label>' +
                '<label class="label-class">' + this.teacher + '</label>' +
                '<br>' +
                '<label class="label-class label-class-hideable">' + time24ToAP(this.classData.startTime) + '-</label>' +
                '<label class="label-class label-class-hideable">' + time24ToAP(this.classData.endTime) + '</label>' +
                '<div class="class-status">' +
                    '<label class="label-class-status">On</label>' +
                    '<div class="sign-class-status"></div>' +
                '</div>' +
            '</div>'
        ));
    }
    
    updateView() {
        var position = timeToPosition(this.classData, this.zOrder);
        this.$viewElement.css({
            "top": position.top + "%", 
            "left": position.left + "%",
            "height": position.height + "%",
            "width": position.width + "%",
             "background-color": this.color
        });
        this.$viewElement.find(".class-status").css({
            "display": scheduleProperty(this.scheduleType).CLASS_STATUS_CSS_DISPLAY,
            "background-color": this.color
        });
    }
    
    open() {
        this.$viewElement.find(".label-class-status").text("On");
        this.$viewElement.find(".sign-class-status").css({
            "background-color": "lightgreen"    
        });
    }

    close() {
        this.$viewElement.find(".label-class-status").text("Off");
        this.$viewElement.find(".sign-class-status").css({
            "background-color": "red"    
        });
    }
}