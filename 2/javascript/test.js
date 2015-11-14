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
  myAudio.load();

  myAudio.play();
  myAudio.pause();

  audioStartTime = 1000;

  duration = myAudio.duration;

    myAudio.currentTime = audioStartTime;
    myAudio.play();


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
