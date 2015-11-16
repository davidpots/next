var myAudio,myAudioB;

$(window).bind("load", function() {

  myAudio = document.getElementById('alpha');
  myAudio.load();

  myAudioB = document.getElementById('beta');
  myAudioB.load();
    
  $('.audioPlay').click(function(){
      // myAudio.currentTime = 3587;
      myAudio.currentTime = 2441;
      myAudio.play();
      return false;
  });

  // -----------------------------------------------------------------------------
  // Is player ready?
  // -----------------------------------------------------------------------------

        var isAudioReady = setInterval(function(){
          if ( !isNaN(parseFloat( myAudio.duration )) ) {
            audioIsReady = true;
            $('.audioPlay').show();
            clearInterval(isAudioReady);
          } else {
            audioIsReady = false;
          }   
        }, 250);


  // -----------------------------------------------------------------------------
  // Debug
  // -----------------------------------------------------------------------------

        var debugBoxHTML = "<div class='debug-box'>\
                              <p><strong>Current time:</strong> <span class='debug-currentTime'>--</span></p>\
                              <p><strong>Duration:</strong> <span class='debug-duration'>--</span></p>\
                              <p><strong>Buffered:</strong> <span class='debug-buffered'>--</span></p>\
                              <p><strong>canplay:</strong> <span class='debug-canplay'>--</span></p>\
                              <p><strong>canplaythrough:</strong> <span class='debug-canplaythrough'>--</span></p>\
                            </div>";

        $( ".audioSource audio" ).each(function(i,obj) {
          setupDebug(obj);
        });

        function setupDebug(audio) {

          $(debugBoxHTML).insertAfter(audio);
          
          var parentDiv = $(audio).parent();

          audio.addEventListener('canplaythrough', function(e) {
            $(parentDiv).find('.debug-canplaythrough').text("TRUE");
          });

          audio.addEventListener('canplay', function(e) {
            $(parentDiv).find('.debug-canplay').text("TRUE");
          });

          setInterval(function(){

            $(parentDiv).find('.debug-currentTime').text(audio.currentTime);
            $(parentDiv).find('.debug-duration').text(audio.duration);
                
            if ( audio.buffered.length >= 1  ) {
              $(parentDiv).find('.debug-buffered').text(audio.buffered.end(audio.buffered.length-1));
            };

          }, 250);
          
        }

});
