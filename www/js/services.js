var app = angular.module('services', ['ionic', 'controllers', 'dbService'])



app.service('TimerService', function () {

    this.init = function(duration) {
        rem_minutes = Math.floor(duration / 60);
        rem_seconds = duration % 60;
        minutes = 0;
        seconds = 0;
        return (rem_minutes + ":" + ((rem_seconds < 10) ? "0" + rem_seconds : rem_seconds));
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
