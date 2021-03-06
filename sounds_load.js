/**************************************************************************
* SOUNDMANAGER CONFIG
***************************************************************************/
soundManager.useFlashBlock = false;
soundManager.bgColor = '#ffffff';
soundManager.debugMode = false;
soundManager.url = 'soundmanager/swf/';
soundManager.wmode = 'transparent'; // hide initial flash of white on everything except firefox/win32
soundManager.allowScriptAccess = 'always';
soundManager.useFastPolling = true;
soundManager.flashVersion = 9;
soundManager.flashLoadTimeout = 3000;
soundManager.useHTML5Audio = true;
var MUSIC = null;
var BEAT1_SND = null;
var BEAT2_SND = null;
var BEAT3_SND = null;
var BEAT4_SND = null;
var DEATH_SND = null;
// -- when ready, preload sounds
soundManager.onready(function() {
 
 
 
    MUSIC = soundManager.createSound({
      id: 'musa',
      url: 'musa.ogg',
      autoLoad: true,
      autoPlay: false,
      volume: 100

    });   

    DEATH_SND = soundManager.createSound({
      id: 'death',
      url: 'death.ogg',
      autoLoad: true,
      autoPlay: false,
      volume: 70
    });
 
 
    BEAT_SND = soundManager.createSound({
      id: 'heartbeat',
      url: 'beat.mp3',
      autoLoad: true,
      autoPlay: false,
      volume: 100
    }); 

    WIN_SND = soundManager.createSound({
      id: 'victory',
      url: 'win.mp3',
      autoLoad: true,
      autoPlay: false,
      volume: 100
    });
 
});
 
soundManager.ontimeout(function() {
    var smLoadFailWarning = 'Oh snap! : ' + (soundManager.hasHTML5 ? 'The flash portion of ' : '') + 'SoundManager 2 was unable to start. ';
    _log(smLoadFailWarning) ;
});