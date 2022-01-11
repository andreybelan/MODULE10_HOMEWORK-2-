
const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const btn = document.querySelector('.j-btn-test');
    const error = () => {
      status.textContent = 'Невозможно получить ваше местоположение';
    }
      const success = (position) => {
      console.log('position', position);
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
    
      status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = 'Ссылка на карту';
    }
      btn.addEventListener('click', () => {
      mapLink.href = '';
      mapLink.textContent = '';
      
      if (!navigator.geolocation) {
        status.textContent = 'Геолокация не поддерживается вашим браузером';
      } else {
        status.textContent = 'Моё местоположение';
        navigator.geolocation.getCurrentPosition(success, error);

        const geoError = () => {
            writeToScreen(`<span style="color: red;">GEO: Невозможно получить ваше местоположение</span>`)
          }
      }
    });
    document.addEventListener("DOMContentLoaded", () => {
      const echoUrl = "wss://echo.websocket.org/"
      const geoUrl = "https://www.openstreetmap.org/"

      const inpMsg = document.getElementById("inpMsg")
      const btnSend = document.getElementById("btnSend")
      const btnGeo = document.getElementById("btnGeo")
      const output = document.getElementById("output")

      let echo, connected = false

      echo = new WebSocket(echoUrl)

      echo.onopen = evt => {
        connected = true
      }     
        btnSend.addEventListener("click", e => {
        const m = inpMsg.value
        if (m.length > 0 && connected) {
          writeToScreen(`<span style="color: green;">SENT: ${m}</span>`)
          echo.send(m)
        }
        inpMsg.value = ""
      })

      const geoSuccess = ({ coords: { latitude, longitude } }) => {
       
        writeToScreen(`<span style="color: brown;">GEO: Широта: ${latitude}, долгота: ${longitude}</span>`)
        writeToScreen(`<a href="${geoUrl}/#map=14/${latitude}/${longitude} target="_blank"">Посмотреть на карте</a>`)
      }

      
    })



    




