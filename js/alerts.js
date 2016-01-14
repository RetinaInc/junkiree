/*

Junkiree v3.5.1
Copyright (C) 2015 by Dinesh Khadka [http://junkiree.github.io]


*/

// Experimental and buggy as FUUCK!!

var startNotif = true;
var count = true;
var hideForNow = true;
var tdelays = {
    't1': 900000,
    't2': 1800000,
    't3': 3600000
};


/*
    - Gets the time remaining in milliseconds
    - Sets that as the timeout
    - Once time runs out, it fires a callback and the recursion kickstarts. Which then refreshes everything
*/

// TODO: If the Schedules are changed mid program. The notifications are shown at the previous groups time
function alertify(nomessage) {
    console.log("Running code");
    var timer;
    var delay = localStorage.NotifyID;
    var ti = new Date(); 
    var tiTemplate = `${ti.getHours()} : ${ti.getMinutes()} : ${ti.getSeconds()}`
    var curTime = ToMilliseconds(tiTemplate);
    var status = TimeStatus(curTime, Millify());
    var timetick = status[2] - curTime;
    var delayedTime = status[2] - parseInt(tdelays[delay], 10);
    var msgTemplate = `${normalizeTime(tdelays[delay])[1]}  Minutes left until ${(status[0] == true) ? 'power on' : 'power off'}`

   
    if (curTime > delayedTime) {
        timer = setTimeout(alertify, timetick);
        hideForNow = true;
        console.log("Current time is greater than the first alarm: " + normalizeTime(timetick));
       
    }
    else{
        if (hideForNow == false){
            NotifyUser('Junkiree', 'img/notification.png', msgTemplate);
        }
        timer = setTimeout(alertify, parseInt(delayedTime - curTime))
        hideForNow = false;
        console.log("setting time out for the next ");
        console.log(normalizeTime(parseInt(delayedTime - curTime)))
    }




    
}




// The code below checks for new scedules and figures out if this is the first run
if (localStorage.ScheduleJSON != null) {
    localStorage.Notify == 'true' && alertify()
    if (localStorage.AutoUpdate == 'true' && localStorage.lastUpdate != DateObject.getDay()) {
            console.log("Checked For a Update!")
            ParseRemoteSchedule(ScheduleURL);
            localStorage.setItem('lastUpdate', DateObject.getDay());

        }
} else {
    chrome.tabs.create({
        'url': 'first-run.html',
        'selected': true
    });

}
