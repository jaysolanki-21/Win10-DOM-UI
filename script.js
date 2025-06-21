function showdateandtime(){
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

function decreasebattery(){
    let battery = document.querySelector('.batterypercent');
    let percent = 100;
    setInterval(() => {
        percent -= 1;
        battery.style.width = `${percent}%`;
    }, 1000);
}

// decreasebattery();

