'use strict';

function onHomeyReady(Homey) {

  const token = document.getElementById('api_token');
  const debug = document.getElementById('debug');

  const save = document.getElementById('save');
  const test = document.getElementById('test');

  const status = document.getElementById('status');

  function setStatus(text, css) {

    status.textContent = text;

    status.className = 'status-text ' + css;

  }

  Homey.get('api_token', function(err, value) {

    if (err) {
      return Homey.alert(err.message || err);
    }

    if (value) {
      token.value = value;
    }

  });

  Homey.get('debug', function(err, value) {

    if (err) {
      return Homey.alert(err.message || err);
    }

    debug.checked = value === true;

  });

  save.addEventListener('click', function() {

    Homey.set('api_token', token.value, function(err) {

      if (err) {
        return Homey.alert(err.message || err);
      }

      Homey.set('debug', debug.checked, function(err) {

        if (err) {
          return Homey.alert(err.message || err);
        }

        setStatus('Instellingen opgeslagen', 'status-success');

      });

    });

  });

  test.addEventListener('click', function() {

    setStatus(
      'Verbindingstest volgt in de volgende stap…',
      'status-neutral'
    );

  });

  Homey.ready();

}