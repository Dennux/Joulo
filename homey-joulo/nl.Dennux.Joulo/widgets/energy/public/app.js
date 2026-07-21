function render(data) {

    if (!data.success) {

        document.getElementById('credits').textContent = 'Geen gegevens';
        document.getElementById('kwh').textContent = '';
        document.getElementById('sessions').textContent = '';

        return;

    }

    document.getElementById('credits').textContent =
        '€ ' + Number(data.totals.ereCredits).toFixed(2);

    document.getElementById('kwh').textContent =
        Number(data.totals.kwh).toLocaleString('nl-NL') + ' kWh';

    document.getElementById('sessions').textContent =
        data.totals.sessions + ' sessies';

}

async function load(Homey) {

    try {

        const data = await Homey.api('GET', '/totals');

        console.log(data);

        render(data);

    } catch (err) {

        console.error(err);

    }

}

function onHomeyReady(Homey) {

    Homey.ready();

    load(Homey);

}