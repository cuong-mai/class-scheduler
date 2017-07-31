// Schedule class

class Schedule {
    constructor(scheduleType_, dayDisabledList_) {
        this.scheduleType = scheduleType_;
        this.daysDisableList = dayDisabledList_;
        this.init();
    }
    
    init() {
        this.courseList = [];
        this.sectionList = [];
        this.classList = new Array();
        for (var i =0; i < NUM_DAYS_PER_WEEK; i++) {
            this.classList[DAYS_OF_WEEK[i]] = new Array();
        }
        
        // Schedule Element
        var scheduleId = scheduleProperty(this.scheduleType).SCHEDULE_ID_PREFIX;
        var scheduleClass = scheduleProperty(this.scheduleType).SCHEDULE_CLASS; 
        var colClass = (this.scheduleType == SCHEDULE_OVERVIEW_TYPE ? 12 : 10);
        var $viewElement = $($.parseHTML(
            '<div id="row-schedule-' + scheduleId + '" class="row row-schedule row-schedule-' + scheduleClass + '">' +
            '<div class="col-sm-1 height-100-percent col-schedule-number">'+ "." + '</div>' + 
            '<div class="col-sm-' + colClass + ' height-100-percent">' +    
            '<div class="row height-100-percent">' +
            '<div class="col-sm-12 height-100-percent">' + 
            '<div class="row-label-schedule-day"></div>' +
            '<div class="col-label-schedule-time"></div>' +
            '<div class="display-schedule">' +
            '<table id="table-schedule-' + scheduleId + '" class="table-schedule"></table>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-1 height-100-percent col-button-view">' +
            '<div>' +
            '<button class="button-export">Export</button>' + 
            '<button class="button-view">View</button>' +
            '</div>' +
            '</div>' + 
            '</div>'
        )); 

        // Add row and labels day
        var $rowLabelScheduleDayElem = $viewElement.find(".row-label-schedule-day");
        for (var i = 0; i < NUM_DAYS_PER_WEEK; i++) {
            var $labelScheduleDayElem = $($.parseHTML(
                '<div class="label-schedule-day">' +
                '<span>' + DAYS_OF_WEEK[i] + '</span>' +
                '<input type="checkbox" class="checkbox-schedule-day checkbox-schedule-day-' + DAYS_OF_WEEK[i] + '" checked>' +
                '</div>'
            ));
            $rowLabelScheduleDayElem.append($labelScheduleDayElem);

            var thisSchedule = this;
            var objectPassed = {schedule: thisSchedule, dayOfweek: null, $checkbox: null};
            $labelScheduleDayElem.children("input").unbind();
            $labelScheduleDayElem.children("input").bind("click", function () {
                objectPassed.dayOfweek = $(this).prop("class").split("-")[5];
                objectPassed.$checkbox = $(this);
                toggleEnableDay.call(objectPassed);
            });
        }

        // Add column and labels time
        var $colLabelScheduleTimeElem = $viewElement.find(".col-label-schedule-time");
        var timeArray = toTimeArray(MIN_TIME, MAX_TIME);
        for (var i = 0; i < scheduleProperty(this.scheduleType).NUM_LABELS_SCHEDULE_TIME; i++) {
            var $labelScheduleTimeElem = $($.parseHTML(
                '<div class="label-schedule-time">' + timeArray[i] + '</div>'
            ));
            $colLabelScheduleTimeElem.append($labelScheduleTimeElem);
        }

        // Add row and columns of Table Schedule
        var $tableScheduleElem = $viewElement.find(".table-schedule");
        for (var row = 0; row < scheduleProperty(this.scheduleType).NUM_TABLE_SCHEDULE_ROWS; row++) {
            var $rowElem = $($.parseHTML('<tr></tr>'));
            for (var cell = 0; cell < NUM_DAYS_PER_WEEK; cell++) {
                var $cellElem = $($.parseHTML('<td></td>'));
                $rowElem.append($cellElem);
            }
            $tableScheduleElem.append($rowElem);
        }

        // Append Element to parent
        this.$viewElement = $viewElement;

        // Update View
        this.updateView();
    }
    
    updateView() {
        // Column Schedule Number and Column Button View
        if (this.scheduleType == SCHEDULE_OVERVIEW_TYPE) {
            var $colScheduleNumber = this.$viewElement.find(".col-schedule-number");
            $colScheduleNumber.css({
                "display": "none"
            });
            var $colButtonView = this.$viewElement.find(".col-button-view");
            $colButtonView.css({
                "display": "none"
            });
        }
        
        // Row Label Day
        var $rowLabelDayElem = this.$viewElement.find(".row-label-schedule-day");
        $rowLabelDayElem.css({
            "top": 0 + "%",
            "left": TABLE_SCHEDULE_LEFT + "%",
            "height": TABLE_SCHEDULE_TOP + "%",
            "width": (100 - TABLE_SCHEDULE_LEFT) + "%",
            
        });
        
        // Label Day
        $.each(this.$viewElement.find(".label-schedule-day"), function(index, elem) {
            $(elem).css({
                "bottom": LABEL_SCHEDULE_DAY_BOTTOM + "%",
                "left": ((100 / NUM_DAYS_PER_WEEK) * index) + "%",
                "width": (100 / NUM_DAYS_PER_WEEK) + "%",
                "font-size": LABEL_SCHEDULE_FONT_SIZE + "pt"
            });   
        });
        
        // Checkbox Label Day
        var thisSchedule = this;
        $.each(thisSchedule.$viewElement.find(".checkbox-schedule-day"), function (index, elem) {
            $(elem).prop("checked", thisSchedule.daysDisableList.indexOf($(elem).prop("class").split("-")[5]) < 0);
            $(elem).prop("disabled", scheduleProperty(thisSchedule.scheduleType).CHECKBOX_SCHEDULE_DAY_IS_DISABLED);
        });
        
        // Column Label Time
        var $colLabelTimeElem = this.$viewElement.find(".col-label-schedule-time");
        $colLabelTimeElem.css({
            "top": TABLE_SCHEDULE_TOP + "%",
            "left": 0 + "%",
            "height": (100 - TABLE_SCHEDULE_TOP) + "%",
            "width": TABLE_SCHEDULE_LEFT + "%"
        });
        
        // Label Time
        $.each(this.$viewElement.find(".label-schedule-time"), function(index, elem) {
            var height = LABEL_SCHEDULE_TIME_HEIGHT;
            var top = (100 / (scheduleProperty(this.scheduleType).NUM_LABELS_SCHEDULE_TIME - 1)) * 
                index - height / 2.5;
            $(elem).css({
                "top": top + "%",
                "right": LABEL_SCHEDULE_TIME_RIGHT + "%",
                "height": height + "%",
                "font-size": LABEL_SCHEDULE_FONT_SIZE + "pt"
            });   
        });
     
        // Display Schedule
        var $displayScheduleElem = this.$viewElement.find(".display-schedule");
        $displayScheduleElem.css({
            "top": TABLE_SCHEDULE_TOP + "%", 
            "left": TABLE_SCHEDULE_LEFT + "%",
            "height": (100 - TABLE_SCHEDULE_TOP) + "%",
            "width": (100 - TABLE_SCHEDULE_LEFT) + "%"
        });
    }
    
    appendCourse(newCourse_) {
        this.courseList.push(newCourse_);
        for (var i = 0; i < newCourse_.sectionList.length; i++) {
            var currentSection = newCourse_.sectionList[i];
            currentSection.scheduleType = this.scheduleType;
            for (var j = 0; j < currentSection.classList.length; j++) {
                var currentClass = currentSection.classList[j];
                currentClass.scheduleType = this.scheduleType;
                var dayOfWeek = currentClass.classData.dayOfWeek;
                var currentClassList = this.classList[dayOfWeek];
                this.insertToClassList(currentClassList, currentClass);
                this.arrangeClassListView(currentClassList);
            }
        }
        this.$viewElement.find(".display-schedule").append(newCourse_.$viewElement);
    }
    
    appendSection(newSection_) {
        newSection_.scheduleType = this.scheduleType;
        this.sectionList.push(newSection_);
        for (var i = 0; i < newSection_.classList.length; i++) {
            var currentClass = newSection_.classList[i];
            currentClass.scheduleType = this.scheduleType;
            var dayOfWeek = currentClass.classData.dayOfWeek;
            var currentClassList = this.classList[dayOfWeek];
            this.insertToClassList(currentClassList, currentClass);
            this.arrangeClassListView(currentClassList);
        }
        this.$viewElement.find(".display-schedule").append(newSection_.$viewElement);
    }
    
    insertToClassList(classList_, class_) {
        var startTime = class_.classData.startTime;
        var endTime = class_.classData.endTime;
        var len = classList_.length;
        var done = false;
        for (var i = 0; i < len; i++) {
            var currentStartTime = classList_[i].classData.startTime;
            var currentEndTime = classList_[i].classData.endTime;
            if (timeToNumber(startTime) < timeToNumber(currentStartTime) ||
                (timeToNumber(startTime) == timeToNumber(currentStartTime) &&
                 timeToNumber(endTime) <= timeToNumber(currentEndTime))
               ) {
                classList_.splice(i, 0, class_);
                done = true;
                break;
            }
        }
        if (!done) {
            classList_.push(class_);
        }
    }
    
    arrangeClassListView(classList_) {
        var classListLen = classList_.length;
        var subColumnList = new Array();
        subColumnList[0] = new Array();
        var subColumnCount = 1;
        var maxEndTimeClass = classList_[0];
        for (var i = 0; i < classListLen; i++) {
            var currentClass = classList_[i];
            if (timeToNumber(currentClass.classData.endTime) >= timeToNumber(maxEndTimeClass.classData.endTime)) {
                maxEndTimeClass = currentClass;
            }
            var done = false;
            for (var j = 0; j < subColumnCount; j++) {
                var currentSubColumn = subColumnList[j];
                if (currentSubColumn.length == 0 ||
                    !isClassOverlapping(currentClass, currentSubColumn[currentSubColumn.length - 1])) {
                    currentSubColumn.push(currentClass);
                    done = true;
                    break;
                }
            }
            if (!done) {
                subColumnList[subColumnCount] = new Array();
                subColumnList[subColumnCount].push(currentClass);
                subColumnCount += 1;
            }
            var nextClass;
            if (i < classListLen - 1) {
                nextClass = classList_[i+1];
            } else {
                nextClass = undefined;    
            }
            if (!isClassOverlapping(maxEndTimeClass, nextClass)) {
                for (var k = 0; k < subColumnCount; k++) {
                    for (var l = 0; l < subColumnList[k].length; l++) {
                        subColumnList[k][l].zOrder = (k + 1) + "/" + subColumnCount;
                        subColumnList[k][l].updateView();
                    }
                }
                subColumnList = new Array();
                subColumnList[0] = new Array();
                subColumnCount = 1;
            }
        }
    }
    
    clear() {
        for (var i = 0; i < this.courseList.length; i++) {
            var currentCourse = this.courseList[i];
            this.$viewElement.find(currentCourse.$viewElement).detach();
        }
        this.courseList = [];
        this.sectionList = [];
        this.classList = new Array();
        for (var i =0; i < NUM_DAYS_PER_WEEK; i++) {
            this.classList[DAYS_OF_WEEK[i]] = new Array();
        }
    }
}