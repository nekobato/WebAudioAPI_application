// Generated by CoffeeScript 1.8.0
(function() {
  var buffer, context, ext, init, loadSound, playSound, s, sounds, url, _i, _len;

  url = 'http://sota1235.net/webAudioAPI/sound/';

  ext = '.wav';

  sounds = ['#snare', '#hihat', '#bass'];

  buffer = [];

  context = null;

  init = function(callback) {
    var AudioContext, e;
    if (callback == null) {
      callback = function() {};
    }
    try {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      return callback(null, context);
    } catch (_error) {
      e = _error;
      return callback('Web Audio API is not supported in this browser');
    }
  };

  loadSound = function(context, url, callback) {
    var request;
    if (callback == null) {
      callback = function() {};
    }
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    return request.onload = function() {
      return context.decodeAudioData(request.response, function(buffer) {
        return callback(buffer);
      });
    };
  };

  playSound = function(context, buffer, time) {
    var source;
    source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    return source.start(time);
  };

  window.onload = init(function(err, con) {
    return context = con;
  });

  for (_i = 0, _len = sounds.length; _i < _len; _i++) {
    s = sounds[_i];
    loadSound(context, url + s.substring(1) + ext, function(buf) {
      return buffer.push(buf);
    });
  }

  $(function() {
    $('#snare').click(function() {
      return playSound(context, buffer[0], 0);
    });
    $('#hihat').click(function() {
      return playSound(context, buffer[1], 0);
    });
    $('#bass').click(function() {
      return playSound(context, buffer[2], 0);
    });
    return $('#start').click(function() {
      var eighthNoteTime, i, j, startTime, tempo, time, _j, _results;
      startTime = context.currentTime + 0.100;
      tempo = 150;
      eighthNoteTime = (60 / tempo) / 2;
      _results = [];
      for (i = _j = 0; _j <= 1; i = ++_j) {
        time = startTime + i * 8 * eighthNoteTime;
        playSound(context, buffer[0], time);
        playSound(context, buffer[0], time + 4 * eighthNoteTime);
        playSound(context, buffer[1], time + 2 * eighthNoteTime);
        playSound(context, buffer[1], time + 6 * eighthNoteTime);
        _results.push((function() {
          var _k, _results1;
          _results1 = [];
          for (j = _k = 0; _k <= 7; j = ++_k) {
            _results1.push(playSound(context, buffer[2], time + j * eighthNoteTime));
          }
          return _results1;
        })());
      }
      return _results;
    });
  });

}).call(this);
