// var a;
//
// $(document).ready(function(){
//   // a = $('.alpha').get(0);
//   a.load();
//   a.currentTime = 2441;
//   a.play();
// });

// Declare variables
var myAudio,
    currentTime,
    duration,
    bufferedEnd,
    audioStartTime;

function initPlayer(audio) {



  $('.playerUI-play').click(function(){


    return false;
  });
}

$(document).ready(function(){

  var myAudio = document.getElementById('my-audio');
  // myAudio.load();
  // if (myAudio) {
    // initPlayer(myAudio);
    myAudio.load();
    // myAudio.addEventListener('canplay', function () {
      myAudio.currentTime = 1000;
      // myAudio.play();
    // });
  // }


  // }
//
//   // Load the audio
//   myAudio.load();
//   duration = myAudio.duration;
//
//   // Retrieve the desired start time for the audio
//   audioStartTime = 1000;
//
//   myAudio.oncanplay = function() {
//     myAudio.currentTime = 1000;
//   }
//
//
//     // myAudio.currentTime = 1000;
// // myAudio.play();
// // myAudio.pause();
//
//
//



  // setInterval(function() {
  //
  //   if ( myAudio.buffered.length >= 1  ) {
  //     duration = myAudio.duration;
  //     var bufferedEnd = myAudio.buffered.end(myAudio.buffered.length - 1);
  //     document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
  //   }
  // }, 1000);







  // myAudio.addEventListener('progress', function() {
  //   if ( myAudio.buffered.length >= 1  ) {
  //     var bufferedEnd = myAudio.buffered.end(myAudio.buffered.length - 1);
  //   }
  //   var duration =  myAudio.duration;
  //   if (duration > 0) {
  //     document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
  //   }
  // });
  //




  // myAudio.addEventListener('timeupdate', function() {
  //   var duration =  myAudio.duration;
  //   if (duration > 0) {
  //     document.getElementById('progress-amount').style.width = ((myAudio.currentTime / duration)*100) + "%";
  //   }
  // });

});
