// function isAudioReady() {
//   if ( !isNaN(parseFloat( myAudio.duration )) ) {
//     return true;
//   } else {
//     return false;
//   }    
// }

var myAudio;

window.onload = function(){

  myAudio = document.getElementById('alpha');
  myAudio.load();
    
  $('.audioPlay').click(function(){
      myAudio.currentTime = 10;
      myAudio.play();
      return false;
  });






  var isAudioReady = setInterval(function(){
    if ( !isNaN(parseFloat( myAudio.duration )) ) {
      audioIsReady = true;
      $('.audioPlay').show();
      clearInterval(isAudioReady);
    } else {
      audioIsReady = false;
    }   
  }, 250);

  // setInterval(function(){
  //   if (isAudioReady) {
  //     console.log("audio is ready!");
  //   }    
  // }, 250);




    // -----------------------------------------------------------------------------
    // Debug
    // -----------------------------------------------------------------------------

        myAudio.addEventListener('canplay', function(e) {
          $('.debug-canplay').text("TRUE");
        });

        setInterval(function(){

          $('.debug-currentTime').text(myAudio.currentTime);
          $('.debug-duration').text(myAudio.duration);
              
          if ( myAudio.buffered.length >= 1  ) {
            $('.debug-buffered').text(myAudio.buffered.end(myAudio.buffered.length-1));
          };

        }, 250);

}
