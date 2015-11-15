var myAudio;

window.onload = function(){

  myAudio = document.getElementById('alpha');
    
  $('.audioPlay').click(function(){
      myAudio.currentTime = 10;
      myAudio.play();
      return false;
  });


  // WORKS ON DESKTOP, DOESN'T DO ANYTHING ON MOBILE
  //
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
