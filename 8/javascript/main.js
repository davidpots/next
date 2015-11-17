var trackIndex = 0,
    tracks =  [
              	{
              	  "show"       : "The Joe Rogan Experience",
              	  "episode"    : "Jay Leno",
              	  "timestamp"  : "8:49",
              	  "url_img"    : "http://static.libsyn.com/p/assets/0/8/6/8/08688b90de11f9ab/JREiTunesImage.jpg",
              	  "url_mp3"    : "http://traffic.libsyn.com/joeroganexp/p692.mp3"
              	},
              	{
              	  "show"       : "Nerdist",
              	  "episode"    : "Robert Rodriguez",
              	  "timestamp"  : "8:31",
              	  "url_img"    : "http://static.libsyn.com/p/assets/3/c/4/5/3c45b257669e76d7/nerdistlogo.jpg",
              	  "url_mp3"    : "http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/nerdist/Nerdist_718_-_Robert_Rodriguez.mp3"
              	},
              	{
              	  "show"       : "Reply All",
              	  "episode"    : "DMV Nation",
              	  "timestamp"  : "1:32",
              	  "url_img"    : "http://i1.sndcdn.com/avatars-000116177580-6q9skc-original.jpg",
              	  "url_mp3"    : "http://www.podtrac.com/pts/redirect.mp3/feeds.soundcloud.com/stream/218017796-replyall-34-dmv-nation.mp3"
              	},
              	{
              	  "show"       : "Imaginary Worlds",
              	  "episode"    : "Being Batman (For Now)",
              	  "timestamp"  : "0:07",
              	  "url_img"    : "http://static.libsyn.com/p/assets/e/0/8/4/e084f450a5bc024f/Imaginary_Worlds3.jpg",
              	  "url_mp3"    : "http://traffic.libsyn.com/imaginaryworlds/Being_Batman_For_Now.mp3"
              	},
              	{
              	  "show"       : "Reconcilable Differences",
              	  "episode"    : "Devouring Essence (John Siracusa Explains Destiny)",
              	  "timestamp"  : "42:22",
              	  "url_img"    : "https://relayfm.s3.amazonaws.com/uploads/broadcast/image/18/broadcast_thumbnail_rd_artwork.png",
              	  "url_mp3"    : "http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/recdiffs/Reconcilable_Differences_008.mp3"
              	},
              	{
              	  "show"       : "Fresh Air",
              	  "episode"    : "Marc Maron's Experience Interviewing President Obama",
              	  "timestamp"  : "0:23",
              	  "url_img"    : "http://media.npr.org/images/podcasts/2013/primary/fresh_air.png",
              	  "url_mp3"    : "http://pd.npr.org/anon.npr-mp3/npr/fa/2015/06/20150622_fa_01.mp3?dl=1"
              	}
              ]


function loadTrack() {
  track = tracks[trackIndex];
  $('.player-show').text(track.show);
  $('.player-episode').text(track.episode);
  $('.player-img').attr('src',track.url_img);
  trackIndex++;
}

window.onload = function(){

  loadTrack();

  $('.player-next').click(function(){
    loadTrack();
    return false;
  });

}
