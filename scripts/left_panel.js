var leftPanel = {
    appendCourseContainer(courseContainer_) {
        
    }
};




// Old version
//function toCourseElem(index_, courseCode_, numberOfSections_) {
//    var str = 
//        '<div id="course-' + index_ + '" class="row">' +
//            '<div class="col-sm-12">' +
//                '<div class="row row-of-left-panel row-course-heading">' +
//                    '<div class="col-sm-6 col-of-left-panel">' + 
//                        '<label class="label-course">Course ' + (index_ + 1) + '</label>' +  
//                        '<input type="text" class="input-large" value="' + courseCode_ + '">' +   
//                    '</div>' +
//                    '<div class="col-sm-6 col-of-left-panel">' +
//                        '<label>No. of sections</label>' + 
//                        '<span class="button-delete"></span>' +
//                        '<input type="number" class="input-large" min="1" value="' + numberOfSections_ + '">' +   
//                    '</div>' +
//                '</div>' +
//            '</div>' +
//        '</div>';
//    var elem = $.parseHTML(str);
//    return elem;
//}
//
//function toSectionElem(courseIndex_, sectionIndex_, sectionCode_,
//                        sectionTeacher_, numberOfDays_, sectionColor_) {
//    var str =
//        '<div id="section-' + courseIndex_ + '-' + sectionIndex_ + '" class="row row-section">' +
//            '<div class="col-sm-12">' +    
//                '<div class="row row-of-left-panel">' +
//                    '<div class="col-sm-6 col-of-left-panel">' +
//                        '<input type="checkbox" checked>' +
//                        '<label>Section ' + (sectionIndex_ + 1) + '</label>' +   
//                    '</div>' +
//                    '<div class="col-sm-6 col-of-left-panel">' +
//                        '<span class="button-delete"></span>' +   
//                    '</div>' + 
//                '</div>' +
//                
//                '<div class="row row-of-left-panel">' +
//                    '<div class="col-sm-3 col-of-left-panel">' +
//                        '<label>Code</label>' +   
//                        '<input type="text" class="input-large" value="' + sectionCode_ + '">' +   
//                    '</div>' +
//                    '<div class="col-sm-4 col-of-left-panel">' +
//                        '<label>Teacher(s)</label>' +   
//                        '<input type="text" class="input-large" value="' + sectionTeacher_ + '">' +      
//                    '</div>' +
//                    '<div class="col-sm-3 col-of-left-panel">' +
//                        '<label>Days</label>' +   
//                        '<input type="number" class="input-large" min="1" value="' + numberOfDays_ + '">' +      
//                    '</div>' +
//                    '<div class="col-sm-2 col-of-left-panel">' +
//                        '<label>Color</label>' +   
//                        '<input type="color" class="input-large" value="' + sectionColor_ + '">' +      
//                    '</div>' +
//                '</div>' +
//            '</div>' +
//        '</div>';
//    var elem =  $.parseHTML(str);
//    return elem;
//}
//
//function toDayElem(courseIndex_, sectionIndex_, dayIndex_, dayOfWeek_, startTime_, endTime_) {
//    var str = 
//        '<div id="day-' + courseIndex_ + '-' + sectionIndex_ + '-' + dayIndex_ + '" class="row row-of-left-panel">' +
//            '<div class="col-sm-3 col-of-left-panel">' +
//                '<div class="row-label">' +
//                    '<input type="checkbox" checked>' +
//                    '<label>Day ' + (dayIndex_ + 1) + '</label>' +   
//                '</div>' +
//                '<select class="input-large">' +
//                    '<option value="Monday">Mon</option>' +
//                    '<option value="Tuesday">Tue</option>' +
//                    '<option value="Wednesday">Wed</option>' +
//                    '<option value="Thursday">Thu</option>' +
//                    '<option value="Friday">Fri</option>' +
//                    '<option value="Saturday">Sat</option>' +
//                    '<option value="Sunday">Sun</option>' +
//                '</select> ' +
//            '</div>' +
//            '<div class="col-sm-4 col-of-left-panel">' +
//                '<div class="row-label">' +
//                    '<label>Start time</label>' +   
//                '</div>' +
//                '<input type="time" class="input-large" min="00:00" value="' + startTime_ + '">' +   
//            '</div>' +
//            '<div class="col-sm-5 col-of-left-panel">' +
//                '<div class="row-label">' +
//                    '<label>End time</label>' +   
//                    '<span class="button-delete"></span>' +   
//                '</div>' +
//                '<input type="time" class="input-large" min="00:00" value="' + endTime_ + '">' +   
//            '</div>' +
//        '</div>';
//    var elem = $.parseHTML(str);
//    $(elem).find("select").val(dayOfWeek_);
//    return elem;
//}
//
//// Left Panel Object
//var leftPanelView = {
//    // Update view - the child elements inside
//    updateView: function (data_) {
//        var currentTerm = data_.termList[0];
//        var $courseContainerElem = $("#course-container");
//        
//        // TODO: Create a separate function to empty the children
//        $courseContainerElem.children().first().empty();    
//
//        // Add Course Element
//        $.each(currentTerm.courseList, function (courseIndex, value) {
//            var courseCode = this.code;
//            var numberOfSections = this.sectionList.length;
//            
//            var $courseElem = $(toCourseElem(courseIndex, courseCode, numberOfSections));
//            
//            // Add Section Element
//            $.each(this.sectionList, function (sectionIndex, value) {
//                var sectionCode = this.code;
//                var sectionTeacher = this.teacher;
//                var sectionColor = this.color;
//                var numberOfDays = this.classList.length;
//                var $sectionElem = $(toSectionElem(courseIndex, sectionIndex, sectionCode, sectionTeacher, numberOfDays, sectionColor));
//                
//                // Add Day Element
//                $.each(this.classList, function (dayIndex, value) {
//                    var dayOfWeek = this.dayOfWeek;
//                    var startTime = this.startTime;
//                    var endTime = this.endTime;
//                    var dayElem = $(toDayElem(courseIndex, sectionIndex, dayIndex, dayOfWeek, startTime, endTime));
//                    $sectionElem.children().first().append(dayElem);
//                });
//                $courseElem.children().first().append($sectionElem);
//            });
//            
//            $courseContainerElem.children().first().append($courseElem);
//        });
//    }
//};
