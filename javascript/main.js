// -----------------------------------------------------------------------------
// Variable setup
// -----------------------------------------------------------------------------

        var label_playNextTrack = "PLAY SOMETHING NEW";
        var label_loadingNextTrack = "Loading...";

        var nextTracks = ["http://traffic.libsyn.com/joeroganexp/p692.mp3",
                          "http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/recdiffs/Reconcilable_Differences_008.mp3",
                          "http://www.pots.fm/downloads/2015-03-27--dad-rock--blood-on-the-tracks.mp3",
                          "http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/songexploder/SongExploder40.mp3",
                          "http://traffic.libsyn.com/timferriss/TFS_Sacca_Ep.mp3",
                          "http://feeds.soundcloud.com/stream/204451292-thetalkshow-118a.mp3",
                          "http://podcastdownload.npr.org/anon.npr-podcasts/podcast/510019/403604283/npr_403604283.mp3",
                          "http://podcastdownload.npr.org/anon.npr-podcasts/podcast/381444908/400179647/npr_400179647.mp3",
                          "http://traffic.libsyn.com/lorepodcast/Lore1.mp3",
                          "http://traffic.libsyn.com/macintoshfm/macintoshfm01.mp3"];
        var trackIndex = 0;

        var audioCurrent,
            audioNext,
            audioAlpha,
            audioBeta,
            audioDethroned,
            audioTransition;

        var transitioning = false;

        var audioDuration = null,       // make "playerDuration" ?
            audioBuffered = null,       // make "playerBuffered" ?
            audioCurrentTime = null;    // make "playerCurrentTime" ?

// -----------------------------------------------------------------------------
// Common functions
// -----------------------------------------------------------------------------

        function playAudio(audio){
            audio.play();
            $('.playerUI').removeClass('playStatus--paused');
            $('.playerUI').addClass('playStatus--playing');
        }

        function pauseAudio(audio){
            audio.pause();
            $('.playerUI').removeClass('playStatus--playing');
            $('.playerUI').addClass('playStatus--paused');
        }

        function forwardAudio(){
            pauseAudio(audioCurrent);
            audioCurrent.currentTime += 15;
            playAudio(audioCurrent);
        }

        function backAudio(){
            pauseAudio(audioCurrent);
            audioCurrent.currentTime -= 15;
            playAudio(audioCurrent);
        }

        function shutOffStaticWhenReady(audio) {
          initialTime = audio.currentTime;
          console.log("Initial time: " + initialTime);
          setTimeout(function(){
            updatedTime = audio.currentTime;
            console.log("Updated time: " + updatedTime);
            console.log("---");
            if (initialTime == updatedTime) {
              // Not playing yet. Run it again!
              setTimeout(function(){
                shutOffStaticWhenReady(audio);
              }, 100);
            } else {
              // Plyaing. Pause the static.
              audioTransition.pause();
            }
          },200);
        }

        function toHHMMSS(seconds) {
            var sec_num = parseInt(seconds, 10);
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            return (hours ? hours + ':' : '') + (hours ? ('0' + minutes).slice(-2) : minutes) + ':' + ('0' + seconds).slice(-2);
        }

        function debugViewer(){
          // console.log("---");
          // console.log("Current time: " + audioCurrent.currentTime);
          // console.log("Duration: " + audioCurrent.duration);

          $('.debug-alpha-CurrentTime').text(audioAlpha.currentTime);
          $('.debug-alpha-Duration').text(audioAlpha.duration);
          if ( audioAlpha.buffered.length >= 1  ) {
            $('.debug-alpha-Buffered').text( audioAlpha.buffered.end(audioAlpha.buffered.length-1) );
          }

          $('.debug-beta-CurrentTime').text(audioBeta.currentTime);
          $('.debug-beta-Duration').text(audioBeta.duration);
          if ( audioBeta.buffered.length >= 1  ) {
            $('.debug-beta-Buffered').text( audioBeta.buffered.end(audioBeta.buffered.length-1) );
          }

          // Found this cool trick at the URL below. if you don't do this, it throws an error should the value be zero / nonexistent
          // http://stackoverflow.com/questions/22137299/jquery-uncaught-indexsizeerror-failed-to-execute-error

            // console.log("Buffered: " + audioCurrent.buffered.end(audioCurrent.buffered.length-1));
          // }

          setTimeout(function(){
            debugViewer();
          }, 1000);
        }

        function initPlayerUI() {
          // check if the duration is still the NaN default, via http://stackoverflow.com/questions/2652319/how-do-you-check-that-a-number-is-nan-in-javascript
          if ( !isNaN(parseFloat( audioCurrent.duration )) ) {

            $('.playerUI-currentTime').text( toHHMMSS(audioCurrent.currentTime) ); // find the other place this line lives, move it to function

            audioDuration = toHHMMSS(audioCurrent.duration);
            $('.playerUI-duration').text(audioDuration);

            $('.playerUI-seekBack').css('visibility','visible');
            $('.playerUI-seekForward').css('visibility','visible');
            $('.playerUI-play').css('visibility','visible');
            $('.playerUI-pause').css('visibility','visible');

            $('.playerUI-nextTrack').text(label_playNextTrack);

            return true;
          } else {
            return false;
          }
        }

        function playerTimeClear() {
          // When track is changed, reset the user-facing duration and current time
          $('.playerUI-currentTime').text("-:--");
          $('.playerUI-duration').text("-:--");
          $('.playerUI-progress').css('width', "0%" );

          $('.playerUI-seekBack').css('visibility','hidden');
          $('.playerUI-seekForward').css('visibility','hidden');
          $('.playerUI-play').css('visibility','hidden');
          $('.playerUI-pause').css('visibility','hidden');

          $('.playerUI-nextTrack').text( label_loadingNextTrack );
        }

        function playerTimeUpdater() {

            audioCurrent.addEventListener('timeupdate', function(e) {
              if ( transitioning == false ) {
                $('.playerUI-currentTime').text( toHHMMSS(audioCurrent.currentTime) ); // find the other place this line lives, move it to function
                var playPercent = 100 * (audioCurrent.currentTime / audioCurrent.duration);
                $('.playerUI-progress').css('width', playPercent + "%" );
              }
            });

        }


$(document).ready(function(){


    // ------------------------------------------------------------------------
    // PlayerUI: click Events
    // ------------------------------------------------------------------------

            // Modify current track

            $('.playerUI-play').click(function(){
              playAudio(audioCurrent);
              return false;
            });

            $('.playerUI-pause').click(function(){
              pauseAudio(audioCurrent);
              return false;
            });

            $('.playerUI-seekForward').click(function(){
              forwardAudio();
              return false;
            });

            $('.playerUI-seekBack').click(function(){
              backAudio();
              return false;
            });


    // ------------------------------------------------------------------------
    // Initial setup
    // ------------------------------------------------------------------------



            // for debugging only
            audioAlpha = $('.audioAlpha').get(0);
            audioBeta = $('.audioBeta').get(0);

            // 
            audioCurrent    = $('.audioAlpha').get(0);
            audioNext       = $('.audioBeta').get(0);
            audioTransition = $('.audioTransition').get(0);

            // Load the transition audio's track
            $(audioTransition).load();
            
            // Load the alpha player's first track
            audioTransition.oncanplay = function() {
              $(audioCurrent).attr('src',nextTracks[trackIndex]);
              trackIndex++;
              $(audioCurrent).load();
            }
            
            // Load the beta player's first track
            audioCurrent.oncanplay = function() {
              $(audioNext).attr('src',nextTracks[trackIndex]);
              trackIndex++;
              $(audioNext).load();
            }


            $('.playerLaunch').click(function(){
              $(this).hide();
              $('.playerUI').show();

              $('.playerUI-nextTrack').text(label_playNextTrack);

              // Setup the player duration
              if ( !initPlayerUI() ) {
                setTimeout(initPlayerUI, 1000);
              }

              // Start the playerTimeUpdater
              playerTimeUpdater();

              // Debug viewer
              debugViewer();
              
              $('.playerUI-nextTrack').click();

              return false;
            });



            // Change to next track

            $('.playerUI-nextTrack').click(function(){

              transitioning = true;

              // Pause audioCurrent
              pauseAudio(audioCurrent);
              audioDethroned = audioCurrent;

              playerTimeClear();

              // Start transition audio
              audioTransition.currentTime += Math.random() * (15 - 5) + 5;
              audioTransition.play();

              // Prepare next audio
              //      Do this to tell Mobile Safari "it is okay to play this audio [when called later on from the settimeout]"
              //     via http://stackoverflow.com/questions/10983731/html5-audio-object-doesnt-play-on-ipad-when-called-from-a-settimeout
              playAudio(audioNext);
              pauseAudio(audioNext);

              // Play next audio after delay
              setTimeout(function(){


                audioCurrent = audioNext;

                // Setup the player duration
                if ( !initPlayerUI() ) {
                  setTimeout(initPlayerUI, 1000);
                }

                playAudio(audioCurrent);

                shutOffStaticWhenReady(audioCurrent);

                audioNext = audioDethroned;

                $(audioNext).attr('src',nextTracks[trackIndex]);
                $(audioNext).load();
                audioNext.oncanplay = function() {
                  audioNext.currentTime = 100;
                }
                trackIndex++;

                transitioning = false;
                playerTimeUpdater();
              }, 2000);

              // When next audio is confirmed to be playing, prep next audio
              // ...



              return false;
            });



});
