'use strict';

function onHomeyReady(Homey) {

  const token = document.getElementById('api_token');
  const debug = document.getElementById('debug');
  const sessionLimit = document.getElementById('session_limit');

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

  Homey.get('session_limit', function(err, value) {

    if (err) {
      return Homey.alert(err.message || err);
    }

    sessionLimit.value = value || 25;

  });

  save.addEventListener('click', function() {

    let limit = Number(sessionLimit.value);

    if (isNaN(limit)) {
      limit = 25;
    }

    limit = Math.min(50, Math.max(5, limit));

    sessionLimit.value = limit;

    Homey.set('api_token', token.value, function(err) {

      if (err) {
        return Homey.alert(err.message || err);
      }

      Homey.set('debug', debug.checked, function(err) {

        if (err) {
          return Homey.alert(err.message || err);
        }

        Homey.set('session_limit', limit, function(err) {

          if (err) {
            return Homey.alert(err.message || err);
          }

          setStatus(
            'Instellingen opgeslagen.',
            'status-success'
          );

        });

      });

    });

  });

  test.addEventListener('click', async function() {

    setStatus(
      'Verbinding testen...',
      'status-neutral'
    );

    try {

      await Homey.api(
        'GET',
        '/testConnection'
      );

      setStatus(
        '✅ Verbinding geslaagd.',
        'status-success'
      );

    } catch (error) {

      setStatus(
        `❌ ${error.message}`,
        'status-error'
      );

    }

  });

  Homey.ready();

}