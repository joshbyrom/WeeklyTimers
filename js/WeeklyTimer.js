var dateInfo = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };

var numberToDay = function (n) {
    return dateInfo[n];
};

var stringToDayNumber = function (s) {
    var compareTo = s.substring(0, 2).toLowerCase();

    var value, firstThree;
    for (var key in dateInfo) {
        value = dateInfo[key];
        firstThree = value.substring(0, 2).toLowerCase();
        
        if (compareTo === firstThree) {
            return key;
        }
    }
};

var dist = function (date, sday, sTime, extra) {
    var n = stringToDayNumber(sday);

    var hours = sTime.split(':')[0],
        minutes = sTime.split(':')[1],
        seconds = sTime.split(':')[2];

    var dayDist = n - date.getDay(),
        hourDist = hours - date.getHours(),
        minuteDist = minutes - date.getMinutes(),
        secondDist = seconds - date.getSeconds();

    if (dayDist < 0) {
        dayDist += 7;
    }

    if (hourDist < 0) {
        hourDist += 24;
        
        if (dayDist === 0) {
            dayDist += 7;
        }
    }

    if (minuteDist < 0) {
        minuteDist += 60;
    }

    if (secondDist < 0) {
        secondDist += 60;
    }

    if (secondDist > 60) {
        secondDist -= 60;
        minuteDist += 1;
    }

    if (minuteDist > 60) {
        minuteDist -= 60;
        hourDist += 1;
    }

    if (hourDist > 24) {
        dayDist += 1;
        hourDist -= 24;
    }

    return [dayDist, hourDist, minuteDist, secondDist, extra];
}

var shortestTime = function (distances) {
    var shortest = null;

    distances.forEach(function (entry) {
        if (shortest === null) shortest = entry;
        else {
            if (entry[0] < shortest[0]) {
                shortest = entry;
            } else if (entry[0] === shortest[0] &&
                       entry[1] < shortest[1]) {
                shortest = entry;
            } else if (entry[0] === shortest[0] &&
                       entry[1] === shortest[1] &&
                       entry[2] < shortest[2]) {
                shortest = entry;
            } else if (entry[0] === shortest[0] &&
                       entry[1] === shortest[1] &&
                       entry[2] === shortest[2] &&
                       entry[3] < shortest[3]) {
                shortest = entry;
            }
        }
    });

    return shortest;
}

var getNextTime = function () {
    var resultDays = 0,
        resultHours = 0,
        resultMinutes = 0,
        resultSeconds = 0;

    var date = new Date();

    var target = shortestTime(dates.map(function (entry) {
        return dist(date, entry.date, entry.time, entry.event);
    }));

    return target;
};

var startTimer = function () {
    var timerElement = document.getElementById("timer");

    var target, time;
    setTimeout(function updateTimer() {
        target = getNextTime();

        time =  target.slice(0, 4).join(":");

        if (target[4] !== undefined) {
            target = '<div class="timer_event">' + target[4] + '</div><div class="timer_time">' + time + "</div>";
        }

        timerElement.innerHTML = target;
        setTimeout(updateTimer, 1000);
    }, 0);
};

startTimer();