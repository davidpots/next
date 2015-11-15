window.onload = function(){

  var myAudio = document.getElementById('alpha');
    
  $('.audioPlay').click(function(){
      myAudio.currentTime = 10;
      myAudio.play();
      return false;
  });

}
