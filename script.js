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

function hideelements(){
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

 document.querySelector('.thispc').style.display = 'block';
 document.querySelector('.screen').style.display = 'none';
// decreasebattery();

//this pc left collapes show and hide

function showhidecollapesthispc(){
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
