$(function () {
  // variables
  var mode = 0; // App mode
  var timeCounter = 0; // time counter
  var lapCounter = 0; // lap counter
  var action; // variable for setInterval
  var lapNumber = 0; // Number of laps
  // minutes,seconds,centiseconds for time and lap
  var timeMinutes,
    timeSeconds,
    timeCentiSeconds,
    lapMinutes,
    lapSeconds,
    lapCentiSeconds;
  //
  // On App load show start and lap buttons
  hideshowButtons("#startButton", "#lapButton");
  //
  // Click on start button
  $("#startButton").click(function () {
    //  mode on
    mode = 1;
    //  show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //  start counter
    startAction();
  });

  //
  // Click on stop button
  $("#stopButton").click(function () {
    //  show resume and reset buttons
    hideshowButtons("#resumeButton", "#resetButton");
    //  stop counter
    clearInterval(action);
  });

  //
  // Click on resume button
  $("#resumeButton").click(function () {
    //  show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //  start counter
    startAction();
  });

  //
  // Click on reset button
  $("#resetButton").click(function () {
    //  reload the page
    window.location.reload();
  });

  //
  // Click on lap button
  $("#lapButton").click(function () {
    //  if mode is on
    if (mode) {
      // stop action
      clearInterval(action);
      // reset lap and print lap details
      lapCounter = 0;
      addLap();
      // start counter
      startAction();
    }
  });

  // functions
  //
  //   Funtion to determine buttons to show
  function hideshowButtons(x, y) {
    $(".controls").hide();
    $(x).show();
    $(y).show();
  }
  //
  //   Funtion to start counter
  function startAction() {
    action = setInterval(function () {
      timeCounter++;
      if (timeCounter == 100 * 60 * 100) {
        timeCounter = 0;
      }
      lapCounter++;
      if (lapCounter == 100 * 60 * 100) {
        lapCounter = 0;
      }
      updateTime();
    }, 10);
  }

  //
  //   updateTime: converts counters to min, sec and centiseconds
  function updateTime() {
    // For timeCounter
    // 1min = 60secs * 100centisecs = 6,000centisecs
    timeMinutes = Math.floor(timeCounter / 6000);
    // 1sec = 100centisecs
    timeSeconds = Math.floor((timeCounter % 6000) / 100);
    timeCentiSeconds = (timeCounter % 6000) % 100;
    // Access the html element to print the values
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiSeconds));

    // For lapCounter
    // 1min = 60secs * 100centisecs = 6,000centisecs
    lapMinutes = Math.floor(lapCounter / 6000);
    // 1sec = 100centisecs
    lapSeconds = Math.floor((lapCounter % 6000) / 100);
    lapCentiSeconds = (lapCounter % 6000) % 100;

    // Access the html element to print the values
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiSeconds));
  }

  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  //   function to print lap details
  function addLap() {
    lapNumber++;
    var myLapDetails =
      "<div class='lap'>" +
      "<div class='laptimetitle'>" +
      "Lap" +
      lapNumber +
      "</div>" +
      "<div class='laptime'>" +
      "<span>" +
      format(lapMinutes) +
      "</span>" +
      ":<span>" +
      format(lapSeconds) +
      "</span>" +
      ":<span>" +
      format(lapCentiSeconds) +
      "</span>" +
      "</div>" +
      "</div>";
    $(myLapDetails).prependTo("#laps");
  }
});
