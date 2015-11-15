var myAudio;

window.onload = function(){

  myAudio = document.getElementById('alpha');
    
  $('.audioPlay').click(function(){
      myAudio.currentTime = 10;
      myAudio.play();
      return false;
  });

  myAudio.addEventListener('canplay', function(e) {
    console.log('it can play!!!')
    $('body').css('backgroundColor','#ffffaa');
  });
  
  setInterval(function(){

  }, 250);
}
