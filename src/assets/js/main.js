$(document).ready(function() {

    autoPlayYouTubeModal();
    var calendar = $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyByK8XMmNj9XIy14Q7eBF6FtHd2_STf7UQ',
        events: {
            googleCalendarId: 'ufh3om1gibr3e12e1coicr3i64@group.calendar.google.com',
            color: 'gray',   // an option!
            textColor: 'white' // an option!
        },
        header: {
            center: 'month' // buttons for switching between views
        },
        weekends : false,
        handleWindowResize : true,
        allDaySlot : false,
        dayClick : function(date, allDay, jsEvent, view) {
            //debugger;
            //calendar.fullCalendar("changeView", "agendaDay");
            //TODO: You need move this to its function
            //var n = $("#calendar").noty({
            //    text: "text",
            //    type: "alert",
            //    closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop']
            //    animation: {
            //        open: 'animated bounceInLeft', // Animate.css class names
            //        close: 'animated bounceOutLeft', // Animate.css class names
            //        easing: 'swing', // unavailable - no need
            //        speed: 500 // unavailable - no need
            //    }
            //});

            $('#modalTitle').html(event.title);
            $('#modalBody').html(event.description);
            $('#eventUrl').attr('href',event.url);
            $('#fullCalModal').modal();
            if (date.format() < moment().add(1, 'd').format("YYYY-MM-DD")) {
                $('#modalTitle').html("sorry!");
                $('#modalBody').html("<h1>Can't book in the past</h1>");
                //$('#eventUrl').attr('href',event.url);
                $('#fullCalModal').modal();
            }

        },
        dayRender: function(date, cell){
            debugger;
            //if smaller than today, make them disabled.
            if (date.format() < moment().add(1, 'd').format("YYYY-MM-DD")) {

                $(cell).addClass('disabled');
                $(cell).addClass('bg-danger');

            }
        },
        viewDisplay   : function(view) {
            debugger;
            var now = new Date();
            var end = new Date();
            end.setMonth(now.getMonth() + 11); //Adjust as needed

            var cal_date_string = view.start.getMonth()+'/'+view.start.getFullYear();
            var cur_date_string = now.getMonth()+'/'+now.getFullYear();
            var end_date_string = end.getMonth()+'/'+end.getFullYear();

            if(cal_date_string == cur_date_string) { jQuery('.fc-button-prev').addClass("fc-state-disabled"); }
            else { jQuery('.fc-button-prev').removeClass("fc-state-disabled"); }

            if(end_date_string == cal_date_string) { jQuery('.fc-button-next').addClass("fc-state-disabled"); }
            else { jQuery('.fc-button-next').removeClass("fc-state-disabled"); }
        },
        selectable: true,
        selectHelper : true,
        select: function(start, end, allDay)
        {
            debugger;


            //calendar.fullCalendar('unselect');
        },
        contentHeight: 700,
        eventLimit : 1,
        timezone : "local",
        events: {
            url: 'calendar/insert'
            //timezone: theTimezone //jstz.determine().name()
        }


    });


});



function autoPlayYouTubeModal(){
  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function() {
    var theModal = $(this).data( "target" ),
    videoSRC = $(this).attr( "data-theVideo" ),
    videoSRCauto = videoSRC+"?autoplay=1" ;
    $(theModal+' iframe').attr('src', videoSRCauto);
    $(theModal+' button.close').click(function () {
        $(theModal+' iframe').attr('src', videoSRC);
    });
    $(theModal).click(function () {
        $(theModal+' iframe').attr('src', videoSRC);
    });
  });
}

