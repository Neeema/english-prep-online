$(document).ready(function() {
    
    autoPlayYouTubeModal();
    //http://jsfiddle.net/VjNFn/16/
    var calendar = $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyByK8XMmNj9XIy14Q7eBF6FtHd2_STf7UQ',
        events: {
            googleCalendarId: 'ufh3om1gibr3e12e1coicr3i64@group.calendar.google.com',
            color: 'gray', // an option!
            textColor: 'white' // an option!
        },
        header: {
            center: 'month' // buttons for switching between views
        },
        weekends: false,
        handleWindowResize: true,
        ignoreTimezone: false,
        allDaySlot: false,
        editable: true,
        events: {
            url: 'https://www.googleapis.com/calendar/v3/calendars/events?key=AIzaSyByK8XMmNj9XIy14Q7eBF6FtHd2_STf7UQ'
        },
        dayClick: dayClickCallback,
        eventClick: eventClickCallback,
        eventRender: function(event, element) {
            element.find(".fc-title").after($("<a tabindex='0' role='button' data-toggle='popover' data-trigger='focus' class='event-icon fa fa-trash-o'></a>"));
        },
        dayRender: function(date, cell) {
        //test
        },
        viewDisplay: function(view) {
            if (false) {
                var now = new Date();
                var end = new Date();
                end.setMonth(now.getMonth() + 11); //Adjust as needed
                
                var cal_date_string = view.start.getMonth() + '/' + view.start.getFullYear();
                var cur_date_string = now.getMonth() + '/' + now.getFullYear();
                var end_date_string = end.getMonth() + '/' + end.getFullYear();
                
                if (cal_date_string == cur_date_string) {
                    jQuery('.fc-button-prev').addClass("fc-state-disabled");
                } 
                else {
                    jQuery('.fc-button-prev').removeClass("fc-state-disabled");
                }
                
                if (end_date_string == cal_date_string) {
                    jQuery('.fc-button-next').addClass("fc-state-disabled");
                } 
                else {
                    jQuery('.fc-button-next').removeClass("fc-state-disabled");
                }
            }
        
        },
        selectable: true,
        selectHelper: true,
        stick: true,
        select: selectCallback,
        timezone: "local"
    });


});


var dayClickCallback = function(date, allDay, jsEvent, view) {
    
    if (date.format() < moment().add(1, 'd').format("YYYY-MM-DD")) {
        $('#modalTitle').html("sorry!");
        $('#modalBody').html("<h1>Can't book in the past</h1>");
        //$('#eventUrl').attr('href',event.url);
        $('#fullCalModal').modal();
    } else {
        var calendar = $('#calendar');
        calendar.fullCalendar("changeView", "agendaDay");
        calendar.fullCalendar("gotoDate", date);
        calendar.fullCalendar('unselect');
    }
}

var selectCallback = function(start, end, allDay) {
    
    $('#session #startTime').val(start);
    $('#session #endTime').val(end);
    
    $("#calendar").fullCalendar('renderEvent', 
    {
        title: "session",
        start: start,
        end: end,
    }, 
    true);

    // $('#modalTitle').html(event.title);
    // $('#modalBody').html(event.description);
    // $('#eventUrl').attr('href',event.url);
    // $('#fullCalModal').modal();
}

var eventClickCallback = function(calEvent, jsEvent, view) {
  
    console.log("clikcing")
    if ($(jsEvent.target).is("a.fa-trash-o")) {
        $(this).popover({
            html: true,
            placement: 'right',
            container: 'body',
            animation: true,
            title: function() {
                return "Remove?";
            },
            content: function() {
                return "TODO: ADD REMOVE BUTTON?";
            }
        });
    }

}

function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function() {
        var theModal = $(this).data("target"), 
        videoSRC = $(this).attr("data-theVideo"), 
        videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function() {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
        $(theModal).click(function() {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
    });
}

Date.prototype.toGoogleString = function() {
    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    return this.getFullYear() + '-' 
    + pad(this.getMonth() + 1) + '-' 
    + pad(this.getDate()) + 'T' 
    + pad(this.getHours()) + ':' 
    + pad(this.getMinutes()) + ':' 
    + pad(this.getSeconds());
};

