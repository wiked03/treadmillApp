var app = angular.module('services', ['ionic', 'controllers', 'dbService'])



app.service('TimerService', function () {

    this.init = function(duration) {
        remaining = duration;
        start = 0;
        return this.formatTime(remaining);
    }

    this.tickDown = function() {
        if(remaining > 0) {
            remaining--;
        }
        return this.formatTime(remaining);
    }
    
    this.tickUp = function() {
        start++;
        return this.formatTime(start);
    }

    
    this.formatTime = function(time) {
        var min = Math.floor(time / 60);
        var sec = time % 60;
        return (min + ":" + ((sec < 10) ? "0" + sec : sec));
    }

});
