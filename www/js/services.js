var app = angular.module('services', ['ionic', 'controllers', 'dbService'])



app.service('TimerService', function () {

    this.init = function() {
        time = gTimer.split(":");
        rem_minutes = parseInt(time[0]);
        rem_seconds = parseInt(time[1]);
        minutes = 0;
        seconds = 0;
        return gTimer;
    }

    this.tickDown = function() {
        if(rem_seconds == 0) {
            rem_minutes--;
            rem_seconds = 59;
        } else {
            rem_seconds--;
        }
        return this.updateDownValue();
    }
    
    this.tickUp = function() {
        if(seconds == 59) {
            seconds = 0;
            minutes++;
        } else {
            seconds++;
        }
        return this.updateUpValue();
    }

    this.updateDownValue = function() {
        if (rem_seconds < 10) {
            rem_seconds = "0" + rem_seconds;
        }
        return (rem_minutes + ":" + rem_seconds);
    }
    
    this.updateUpValue = function() {
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return (minutes + ":" + seconds);
    }

});
