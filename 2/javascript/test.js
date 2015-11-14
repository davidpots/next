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

$(document).ready(function(){

  myAudio = $('#my-audio').get(0);

  // Load the audio
  myAudio.load();
  duration = myAudio.duration;

  // Retrieve the desired start time for the audio
  audioStartTime = 1000;

  $('.playerUI-play').click(function(){
    myAudio.currentTime = audioStartTime;
    myAudio.play();
    return false;
  });




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
