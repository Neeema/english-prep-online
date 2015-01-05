$(document).ready(function() {
    
    autoPlayYouTubeModal();
    //http://jsfiddle.net/VjNFn/16/
    //.fullCalendar( 'clientEvents' [, idOrFilter ] )
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
        selectable: true,
        selectHelper: true,
        stick: true,
        timezone: "local",
        events: {
            url: 'https://www.googleapis.com/calendar/v3/calendars/events?key=AIzaSyByK8XMmNj9XIy14Q7eBF6FtHd2_STf7UQ'
        },
        dayClick: dayClickCallback,
        eventClick: eventClickCallback,
        eventRender: function(event, element) {
            element.find(".fc-title").after($("<a tabindex='0' role='button' data-toggle='popover' data-trigger='focus' class='event-icon fa fa-trash-o fa-lg'></a>"));
        },
        dayRender: function(date, cell) {
        //test
        },
        select: selectCallback
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

var selectCallback = function(start, end, jsEvent, view) {

    //TODO: remove icon should be created when user selects. 
    //if the view was month, user didnt select any dates!
    if (view.name !== "month") {
        var calendar = $('#calendar');
        var m = moment();

        addCalanderEvent(" title", start, end);
    }






// $('#modalTitle').html(event.title);
// $('#modalBody').html(event.description);
// $('#eventUrl').attr('href',event.url);
// $('#fullCalModal').modal();
}

var eventClickCallback = function(calEvent, jsEvent, view) {
    var calendar = $('#calendar');
    if ($(jsEvent.target).is("a.fa-trash-o")) {
        var current_trigger = $(this);
        current_trigger.popover({
            html: true,
            placement: 'top',
            container: 'body',
            animation: true,
            title: "<span class='text-info'>Remove this session? </span> <button type='button' id='close' class='close no-action'>&times;</button>",
            content: "<div class='text-center'><button type='button' class='yes-action btn btn-success'>Yes</button> <button type='button' class='btn btn-danger no-action'> No </button></div>"
        });
        
        var current_popover = current_trigger.data('bs.popover').tip();
        
        current_popover.find('button.no-action').click(function() {
            current_trigger.popover('hide');
            current_trigger.popover('destroy');
        });
        
        current_popover.find('button.yes-action').click(function() {
            current_trigger.popover('hide');
            current_trigger.popover('destroy');
            current_trigger.remove();
            current_trigger.css('display', 'none');
            calendar.fullCalendar('removeEvents', calEvent._id);
        });
    }

}


var addCalanderEvent = function addCalanderEvent(title, start, end) 
{
    var eventObject = {
        title: "test",
        start: start,
        end: end
    };
     
    $('#calendar').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
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

