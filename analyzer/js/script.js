// Generated by CoffeeScript 1.8.0
(function() {
  var analyser, context, getFreq, init, input;

  init = function(callback) {
    var AudioContext, context, e;
    if (callback == null) {
      callback = function() {};
    }
    try {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      return callback(null, context);
    } catch (_error) {
      e = _error;
      return callback('Web Audio API is not suppported in this browser');
    }
  };

  navigator.getUserMedia = navigator.webkitGetUserMedia;

  context = null;

  analyser = null;

  input = null;

  window.onload = function() {
    var i, _i, _results;
    init(function(err, con) {
      if (err) {
        alert(err);
        return;
      }
      context = con;
      analyser = context.createAnalyser();
      analyser.fftsize = 1024;
      return analyser.smoothingTimeContant = 0.9;
    });
    _results = [];
    for (i = _i = 0; _i <= 256; i = ++_i) {
      _results.push($('.analyser').append('<div id="' + i.toString() + '"></div>'));
    }
    return _results;
  };

  $('.start').click(function() {
    if (!navigator.getUserMedia) {
      return alert('WebRTC(getUserMedia) is not suppported...');
    } else {
      console.log('getUserMedia suppported.');
      return navigator.getUserMedia({
        audio: true
      }, function(stream) {
        input = context.createMediaStreamSource(stream);
        return input.connect(analyser);
      }, function(err) {
        return console.log('Error: ' + err);
      });
    }
  });

  getFreq = function() {
    var data, i, val, _i, _results;
    data = new Uint8Array(256);
    analyser.getByteFrequencyData(data);
    _results = [];
    for (i = _i = 0; _i <= 256; i = ++_i) {
      val = data[i];
      _results.push($('#' + i.toString()).text(val));
    }
    return _results;
  };

  setInterval(getFreq, 100);

}).call(this);
