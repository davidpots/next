// Custom Audio Player 101
// via hacking apart this: http://demo.codesamplez.com/javascript/audio
// -------------------------------------------------------------------------------

// Variable setup
var audio;
var audioDuration = null,
    audioBuffered = null,
    audioCurrentTime = null;


// -----------------------------------------------------------------------------
// Common audio functions
// -----------------------------------------------------------------------------

        function playAudio(){
            audio.play();
            $('.playerUI').removeClass('playStatus--paused');
            $('.playerUI').addClass('playStatus--playing');
        }

        function pauseAudio(){
            audio.pause();
            $('.playerUI').removeClass('playStatus--playing');
            $('.playerUI').addClass('playStatus--paused');
        }

        function forwardAudio(){
            pauseAudio();
            audio.currentTime += 15;
            playAudio();
        }

        function backAudio(){
            pauseAudio();
            audio.currentTime -= 15;
            playAudio();
        }


        // Convert seconds to time format, via http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
        function toHHMMSS(seconds) {
            var sec_num = parseInt(seconds, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            return (hours ? hours + ':' : '') + (hours ? ('0' + minutes).slice(-2) : minutes) + ':' + ('0' + seconds).slice(-2);
        }


        function explode(){
          console.log("---");
          console.log("Current time: " + audio.currentTime);
          console.log("Duration: " + audio.duration);

          // Found this cool trick at the URL below. if you don't do this, it throws an error should the value be zero / nonexistent
          // http://stackoverflow.com/questions/22137299/jquery-uncaught-indexsizeerror-failed-to-execute-error
          if ( audio.buffered.length >= 1  ) {
            console.log("Buffered: " + audio.buffered.end(audio.buffered.length-1));
          }

          // check if the duration is still the NaN default, via http://stackoverflow.com/questions/2652319/how-do-you-check-that-a-number-is-nan-in-javascript
          if ( !isNaN(parseFloat( audio.duration )) ) {
            audioDuration = toHHMMSS(audio.duration);
            console.log(audioDuration);
            $('.playerUI-duration').text(audioDuration);
          }

          setTimeout(explode, 1000);
        }





// Page load events
$(document).ready(function(){

  $('a.play').click(function(){
    playAudio();
    return false;
  });

  $('a.pause').click(function(){
    pauseAudio();
    return false;
  });

  $('a.forward').click(function(){
    forwardAudio();
    return false;
  });

  $('a.back').click(function(){
    backAudio();
    return false;
  });


  // Weirdly -- when I did this line w/ jQuery, it returned undefined
  // I wonder if this is a clue on how to do it with jQuery? http://stackoverflow.com/questions/32069940/html5-audio-duration-returns-undefined-jquery
  // audio = document.getElementById('audioDemo');
  audio = $('#audioDemo').get(0);

  function timeUpdate() {
  	var playPercent = 100 * (audio.currentTime / audio.duration);
  	$('#playerUI-progressPlayed').css('width', playPercent + "%" );
  }

  audio.addEventListener('timeupdate', function(e) {
    $('.playerUI-currentTime').text( toHHMMSS(audio.currentTime) );
    timeUpdate();
  });

  explode();

  $('#magicLink').click(function(){
    pauseAudio();
    $('#audioTransition').get(0).currentTime += 5;
    $('#audioTransition').get(0).play();

    setTimeout(function(){
      $('#audioTransition').get(0).pause();
      $('#audioBeta').get(0).play();
    }, 2000);

    return false;
  });


});
