$(document).ready(function() {

    autoPlayYouTubeModal();
    $('#calendar').fullCalendar({
        weekends : false,
        googleCalendarApiKey: 'AIzaSyAWRBsQtQUXh7_lPIQO5qma8fwDCR6Zmrc',
        events: {
            googleCalendarId: 'rhm51ep2l0lu0igfjtd03iif30@group.calendar.google.com',
            color: 'yellow',   // an option!
            textColor: 'black' // an option!
        },


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

