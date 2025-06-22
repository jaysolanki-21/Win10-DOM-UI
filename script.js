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

if(notificationState.wifi == "on"){
    document.querySelector('.right .wifi').style.display = 'flex';
    document.querySelector('.right .wifioff').style.display = 'none';
}else{
    document.querySelector('.right .wifi').style.display = 'none';
    document.querySelector('.right .wifioff').style.display = 'flex';
}

if(notificationState.airplane == "on"){
    document.querySelector('.right .airplane').style.display = 'flex';
    document.querySelector('.right .wifi').style.display = 'none';
    document.querySelector('.right .wifioff').style.display = 'none';
}else{
    document.querySelector('.right .airplane').style.display = 'none';
}

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
  const mutedIcon = document.querySelector(".volumemuted");
  const lowIcon = document.querySelector(".volumelow");
  const fullIcon = document.querySelector(".volumefull");

  mutedIcon.classList.remove("active");
  lowIcon.classList.remove("active");
  fullIcon.classList.remove("active");

  if (volume === 0) {
    mutedIcon.classList.add("active");
  } else if (volume <= 50) {
    lowIcon.classList.add("active");
  } else {
    fullIcon.classList.add("active");
  }
}

function setupVolumeSlider() {
  const slider = document.getElementById("volumeSlider");
  if (!slider) return;

  let settings = getNotificationSettings();
  slider.value = parseInt(settings.sound);
  updateVolumeIcon(parseInt(settings.sound));

  slider.addEventListener("input", function () {
    const volume = parseInt(this.value);
    settings.sound = volume.toString();
    saveNotificationSettings(settings);
    updateVolumeIcon(volume);
  });
}

function initVolumeModule() {
  initializeNotificationSettings();
  setupVolumeSlider();
}

document.addEventListener("DOMContentLoaded", initVolumeModule);

document.querySelector('.right .volumefull').addEventListener('click', () => {
  const popup = document.querySelector('.volume-popup');

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
});

document.querySelector('.right .volumelow').addEventListener('click', () => {
  const popup = document.querySelector('.volume-popup');

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
});

document.querySelector('.right .volumemuted').addEventListener('click', () => {
  const popup = document.querySelector('.volume-popup');

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
});


