var myAudio, audioBeta;

window.onload = function(){

  myAudio = document.getElementById('alpha');
  myAudio.load();
    
  $('.audioAlphaPlay').click(function(){
      myAudio.currentTime = 3587;
      myAudio.play();
      return false;
  });
  
  $('.audioBetaPlay').click(function(){
      audioBeta.currentTime = 2441;
      audioBeta.play();
      return false;
  });

  // Starts loading second audio
  myAudio.addEventListener('canplaythrough', function(e) {
    audioBeta = document.getElementById('beta');
    audioBeta.load();

    audioBeta.addEventListener('canplaythrough', function(e) {
      $('.debug-box--beta .debug-canplaythrough').text("TRUE");
    });

    audioBeta.addEventListener('canplay', function(e) {
      $('.debug-box--beta .debug-canplay').text("TRUE");
    });

  });


  // -----------------------------------------------------------------------------
  // Is player ready?
  // -----------------------------------------------------------------------------

        var isAudioReady = setInterval(function(){
          if ( !isNaN(parseFloat( myAudio.duration )) ) {
            audioIsReady = true;
            $('.audioAlphaPlay').show();
            clearInterval(isAudioReady);
          } else {
            audioIsReady = false;
          }   
        }, 250);




        var isAudioBetaReady = setInterval(function(){
          if ( !isNaN(parseFloat( audioBeta.duration )) ) {
            audioBetaIsReady = true;
            $('.audioBetaPlay').show();
            clearInterval(isAudioBetaReady);
          } else {
            audioBetaIsReady = false;
          }   
        }, 250);


  // -----------------------------------------------------------------------------
  // Debug
  // -----------------------------------------------------------------------------


        myAudio.addEventListener('canplaythrough', function(e) {
          $('.debug-box--alpha .debug-canplaythrough').text("TRUE");
        });

        myAudio.addEventListener('canplay', function(e) {
          $('.debug-box--alpha .debug-canplay').text("TRUE");
        });



        setInterval(function(){

          $('.debug-box--alpha .debug-currentTime').text(myAudio.currentTime);
          $('.debug-box--alpha .debug-duration').text(myAudio.duration);
              
          if ( myAudio.buffered.length >= 1  ) {
            $('.debug-box--alpha .debug-buffered').text(myAudio.buffered.end(myAudio.buffered.length-1));
          };








          
                  if ( audioBeta !== undefined) {


                    $('.debug-box--beta .debug-currentTime').text(audioBeta.currentTime);
                    $('.debug-box--beta .debug-duration').text(audioBeta.duration);
                        
                    if ( audioBeta.buffered.length >= 1  ) {
                      $('.debug-box--beta .debug-buffered').text(audioBeta.buffered.end(audioBeta.buffered.length-1));
                    };

                    
                  } 






        }, 250);








}
