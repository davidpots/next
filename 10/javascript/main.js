var myAudio;

$(window).bind("load", function() {

  myAudio = document.getElementById('alpha');
  myAudio.load();

  initPlayerUI();
  // // Setup the player duration
  // if ( !initPlayerUI() ) {
  //   setTimeout(initPlayerUI, 1000);
  // }

    
  $('.audioPlay').click(function(){
      // myAudio.currentTime = 3587;
      myAudio.currentTime = 2441;
      myAudio.play();
      return false;
  });

  myAudio.addEventListener('timeupdate', function(e) {
  });

  function initPlayerUI() {

    myAudio.ontimeupdate = function() {
      $('.player-time-current').text( toHHMMSS(myAudio.currentTime) );
      var playPercent = 100 * (myAudio.currentTime / myAudio.duration);
      $('.progress-played').css('width', playPercent + "%" );
    }
    
    setInterval(function(){
      if ( !isNaN(parseFloat( myAudio.duration )) ) {
        $('.player-time-current').text( toHHMMSS(myAudio.currentTime) );
        $('.player-time-total').text( toHHMMSS(myAudio.duration) );
      }
      
      if ( myAudio.currentTime > 0) {
        $('.progress-played').addClass('progress-played--playing');
      } else {
        $('.progress-played').removeClass('progress-played--playing');
      }

      if ( myAudio.buffered.length >= 1  ) {
        var bufferedPercent = 100 * (myAudio.buffered.end(myAudio.buffered.length-1) / myAudio.duration);
        $('.progress-buffered').css('width', bufferedPercent + "%" );
      };
      
    }, 1000);
  }







  var timeline = $('.progress');
  //Makes timeline clickable
  $(timeline).click(function(event){
    
    var percentDestination = 100 * ( event.pageX - $(timeline).offset().left ) / timeline.width();
    $('.progress-played').css('width', percentDestination + "%" );
    myAudio.pause();
    myAudio.currentTime = (percentDestination / 100) * myAudio.duration;
    myAudio.play();

    
  	// moveplayhead(event);
  	// myAudio.currentTime = myAudio.duration * clickPercent(event);
    

    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(e) {
    	// return (e.pageX - timeline.offsetLeft) / timeline.width();
    }
     
    function moveplayhead(e) {
    	// var newMargLeft = e.pageX - timeline.offsetLeft;
      //       
    	// if (newMargLeft = 0 && newMargLeft = timelineWidth) {
    	// 	playhead.style.marginLeft = newMargLeft + "px";
    	// }
    	// if (newMargLeft  0) {
    	// 	playhead.style.marginLeft = "0px";
    	// }
    	// if (newMargLeft  timelineWidth) {
    	// 	playhead.style.marginLeft = timelineWidth + "px";
    	// }
    }

  });















  function toHHMMSS(seconds) {
      var sec_num = parseInt(seconds, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      return (hours ? hours + ':' : '') + (hours ? ('0' + minutes).slice(-2) : minutes) + ':' + ('0' + seconds).slice(-2);
  }

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
