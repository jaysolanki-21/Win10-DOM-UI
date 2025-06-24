function showdateandtime() {
    setInterval(() => {
        let time = new Date().toLocaleTimeString();
        let hour = time.split(':')[0];
        let minute = time.split(':')[1];
        let second = time.split(':')[2];
        let ampm = time.split(' ')[1];
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (ampm == 'PM') {
            hour = Number(hour) + 12;
        }

        document.querySelector('.datetime span').innerHTML = `${hour}:${minute}`
    }, 1000);
}

showdateandtime();

function decreasebattery() {
    let battery = document.querySelector('.batterypercent');
    let percent = 100;
    setInterval(() => {
        percent -= 1;
        battery.style.width = `${percent}%`;
    }, 1000);
}

function hideelements() {
    document.querySelector('.thispc').style.display = 'none';
}

hideelements();



document.querySelector('.thispc .titlebar .first .right .close').addEventListener('click', () => {
    document.querySelector('.screen').style.display = 'block';
    document.querySelector('.thispc').style.display = 'none';
})

document.querySelector('.homescreen .screen .icons .homethispc').addEventListener('click', () => {
    document.querySelector('.thispc').style.display = 'block';
    document.querySelector('.screen').style.display = 'none';
})

document.querySelector('.thispc').style.display = 'none';
document.querySelector('.screen').style.display = 'block';
// decreasebattery();

//this pc left collapes show and hide

function showhidecollapesthispc() {
    let menu = document.querySelector('.thispccontent .left .menus')
    document.querySelector('.thispc .left .collapes')
        .addEventListener('click', () => {
            if (menu.style.display == 'flex') {
                menu.style.display = 'none';
                // document.querySelector('.thispc .left .rightarrow').style.display = 'block';
                // document.querySelector('.thispc .left .downarrow').style.display = 'none';
            } else {
                menu.style.display = 'flex';
                // document.querySelector('.thispc .left .rightarrow').style.display = 'none';
                // document.querySelector('.thispc .left .downarrow').style.display = 'block';
            }
        })
}

showhidecollapesthispc();

function showhidedrivers() {
    let drivers = document.querySelector('.thispccontent .right .driverscreen .drivers');
    document.querySelector('.thispccontent .right .driverscreen .driversheading').addEventListener('click', () => {
        if (drivers.style.display === 'flex') {
            drivers.style.display = 'none';
        } else {
            drivers.style.display = 'flex';
        }
    });
}

showhidedrivers();

function shownotification() {
    let flag = 0;
    let notification = document.querySelector('.homescreen .notification');
    document.querySelector('.notificationicon').addEventListener('click', () => {
        if (flag == 0) {
            notification.style.right = '0';
            flag = 1;
        } else {
            notification.style.right = '-25%';
            flag = 0;
        }
    })
}

shownotification();

if (!localStorage.getItem("notification")) {
  localStorage.setItem("notification", JSON.stringify({
    location: "off",
    batterysaver: "off",
    bluetooth: "off",
    nightlight: "off",
    mobilehotspot: "off",
    airplanemode: "off",
    nearbysharing: "off",
    allsetting: "off",
    network: "off",
    connect: "off",
    project: "off",
    screensnip: "off",
    wifi: "off",
    sound: "100"
  }));
}

const notifSettings = JSON.parse(localStorage.getItem("notification"));

const classToKeyMap = {
  location: "location",
  batterysaver: "batterysaver",
  bluetooth: "bluetooth",
  nightlight: "nightlight",
  mobilehotspot: "mobilehotspot",
  airplanemode: "airplanemode",
  nearbysharing: "nearbysharing",
  allsetting: "allsetting",
  network: "network",
  connect: "connect",
  project: "project",
  screensnip: "screensnip"
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".notificationbutton").forEach(button => {
    for (let className of button.classList) {
      const key = classToKeyMap[className.toLowerCase()];
      if (key) {
        if (notifSettings[key] === "on") {
          button.classList.add("active");
        }
        button.addEventListener("click", () => toggleState(button, key));
        break;
      }
    }
  });
});

function toggleState(button, key) {
  const state = JSON.parse(localStorage.getItem("notification"));
  state[key] = state[key] === "on" ? "off" : "on";
  localStorage.setItem("notification", JSON.stringify(state));

  button.classList.toggle("active", state[key] === "on");
}

const notificationState = JSON.parse(localStorage.getItem("notification"));

const volume = parseInt(notificationState.sound); 

if (volume === 0) {
  document.querySelector('.right .volumemuted').style.display = 'flex';
  document.querySelector('.right .volumelow').style.display = 'none';
  document.querySelector('.right .volumefull').style.display = 'none';
} else if (volume <= 50) {
  console.log("sjsj");
  document.querySelector('.right .volumemuted').style.display = 'none';
  document.querySelector('.right .volumelow').style.display = 'flex';
  document.querySelector('.right .volumefull').style.display = 'none';
} else {
  console.log("hello");
  document.querySelector('.right .volumemuted').style.display = 'none';
  document.querySelector('.right .volumelow').style.display = 'none';
  document.querySelector('.right .volumefull').style.display = 'block';
}

function initializeNotificationSettings() {
  if (!localStorage.getItem("notification")) {
    localStorage.setItem("notification", JSON.stringify({
      sound: "100"
    }));
  }
}

function getNotificationSettings() {
  return JSON.parse(localStorage.getItem("notification"));
}

function saveNotificationSettings(settings) {
  localStorage.setItem("notification", JSON.stringify(settings));
}

function updateVolumeIcon(volume) {
  const taskMuted = document.querySelector('.right .volumemuted');
  const taskLow = document.querySelector('.right .volumelow');
  const taskFull = document.querySelector('.right .volumefull');

  const popupMuted = document.querySelector('.volume-popup .volumemuted');
  const popupLow = document.querySelector('.volume-popup .volumelow');
  const popupFull = document.querySelector('.volume-popup .volumefull');

  [taskMuted, taskLow, taskFull, popupMuted, popupLow, popupFull].forEach(el => {
    if (el) el.style.display = 'none';
  });

  if (volume === 0) {
    if (taskMuted) taskMuted.style.display = 'flex';
    if (popupMuted) popupMuted.style.display = 'block';
  } else if (volume <= 50) {
    if (taskLow) taskLow.style.display = 'flex';
    if (popupLow) popupLow.style.display = 'block';
  } else {
    if (taskFull) taskFull.style.display = 'flex';
    if (popupFull) popupFull.style.display = 'block';
  }
}

function setupVolumeSlider() {
  const slider = document.getElementById("volumeSlider");
  const volumeValue = document.getElementById("volumeValue"); // 👈

  if (!slider || !volumeValue) return;

  let settings = getNotificationSettings();
  const currentVolume = parseInt(settings.sound);

  slider.value = currentVolume;
  volumeValue.textContent = `${currentVolume}%`; // 👈
  updateVolumeIcon(currentVolume);

  slider.addEventListener("input", function () {
    const newVolume = parseInt(this.value);
    settings.sound = newVolume.toString();
    saveNotificationSettings(settings);

    volumeValue.textContent = `${newVolume}%`; // 👈
    updateVolumeIcon(newVolume);
  });
}


function initVolumeModule() {
  initializeNotificationSettings();
  setupVolumeSlider();

  const volume = parseInt(getNotificationSettings().sound);
  updateVolumeIcon(volume);
}

function setupVolumePopupToggle() {
  const popup = document.querySelector('.volume-popup');
  const taskbarIcons = document.querySelectorAll('.right .volumefull, .right .volumelow, .right .volumemuted');

  taskbarIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.addEventListener('click', (e) => {
    const isInsidePopup = popup.contains(e.target);
    const isIconClick = Array.from(taskbarIcons).some(icon => icon.contains(e.target));
    if (!isInsidePopup && !isIconClick) {
      popup.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initVolumeModule();
  setupVolumePopupToggle();
});


if (!localStorage.getItem("wifiPanel")) {
  localStorage.setItem("wifiPanel", JSON.stringify({
    wifi: "off",
    airplane: "off",
    hotspot: "off"
  }));
}

function getWifiState() {
  return JSON.parse(localStorage.getItem("wifiPanel"));
}

function saveWifiState(state) {
  localStorage.setItem("wifiPanel", JSON.stringify(state));
}

function updateWifiIcons() {
  const state = getWifiState();

  const wifiIcon = document.querySelector('.icon.wifi');
  const wifioffIcon = document.querySelector('.icon.wifioff');
  const airplaneIcon = document.querySelector('.icon.airplane');

  if (state.airplane === 'on') {
    airplaneIcon.style.display = 'block';
    wifiIcon.style.display = 'none';
    wifioffIcon.style.display = 'none';
  } else {
    airplaneIcon.style.display = 'none';
    if (state.wifi === 'on') {
      wifiIcon.style.display = 'block';
      wifioffIcon.style.display = 'none';
    } else {
      wifiIcon.style.display = 'none';
      wifioffIcon.style.display = 'block';
    }
  }
}

function togglePopup() {
  const popup = document.querySelector('.wifi-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

['.icon.wifi', '.icon.wifioff', '.icon.airplane'].forEach(selector => {
  const icon = document.querySelector(selector);
  if (icon) {
    icon.addEventListener('click', togglePopup);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const state = getWifiState();

  ['wifi', 'airplane', 'hotspot'].forEach(type => {
    const btn = document.querySelector(`.quick-toggle.${type}`);

    if (state[type] === 'on') btn.classList.add('active');
    if (state.airplane === 'on' && (type === 'wifi' || type === 'hotspot')) {
      btn.classList.add('disabled');
    }

    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;

      state[type] = state[type] === 'on' ? 'off' : 'on';
      btn.classList.toggle('active', state[type] === 'on');

      if (type === 'airplane') {
        const wifiBtn = document.querySelector('.quick-toggle.wifi');
        const hotspotBtn = document.querySelector('.quick-toggle.hotspot');

        if (state.airplane === 'on') {
          state.wifi = 'off';
          state.hotspot = 'off';

          wifiBtn.classList.remove('active');
          hotspotBtn.classList.remove('active');

          wifiBtn.classList.add('disabled');
          hotspotBtn.classList.add('disabled');
        } else {
          wifiBtn.classList.remove('disabled');
          hotspotBtn.classList.remove('disabled');
        }
      }

      saveWifiState(state);
      updateWifiIcons();
    });
  });

  updateWifiIcons(); 
});

document.addEventListener('click', (e) => {
  const popup = document.querySelector('.wifi-popup');
  const wifiIcons = document.querySelectorAll('.icon.wifi, .icon.wifioff, .icon.airplane');

  const clickedOnPopup = popup.contains(e.target);
  const clickedOnIcon = Array.from(wifiIcons).some(icon => icon.contains(e.target));

  if (!clickedOnPopup && !clickedOnIcon) {
    popup.style.display = 'none';
  }
});
const startButton = document.querySelector('.start.taskicon');
const startMenu = document.getElementById('start-menu');

startButton.addEventListener('click', () => {
  const isVisible = startMenu.style.display === 'flex';

  if (!isVisible) {
    startMenu.style.display = 'flex';
    startMenu.style.animation = 'slideUp 0.3s ease forwards';
  } else {
    startMenu.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
    startMenu.style.display = 'none';
  }
});
const contextMenu = document.getElementById('custom-context-menu');

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  contextMenu.style.display = 'block';
  contextMenu.style.left = `${e.pageX}px`;
  contextMenu.style.top = `${e.pageY}px`;
});

document.addEventListener('click', function (e) {
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = 'none';
  }
});
