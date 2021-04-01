const renderCurrentDate = () => {
  const dateTime = $("currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const renderCalenderEvents = () => {
  const schedulerEvents = JSON.parse.localStorage.getItem("schedulerEvents");

  if (schedulerEvents !== null) {
    // const currentHour = moment().hour();
    const currentHour = 1;
    const timeBlocks = $(".container .row");
    const callback = function () {
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);
      if (timeBlockTime === currentHour) {
        $(this).find("textarea").removeClass("past").addClass("present");
      }
      if (timeBlockTime > currentHour) {
        $(this).find("textarea").removeClass("past").addClass("future");
      }
    };

    timeBlocks.each(callback);
  } else {
    localStorage.setItem("schedulerEvents", JSON.stringify({ 9: "hello" }));
  }
};

const onReady = () => {
  renderCurrentDate();

  renderCalenderEvents();
};

$(document).ready(function (onReady) {
  console.log("I am ready");
});

// $(document).ready(onReady);

// date = moment().format("MMM Do YY");

//$("#currentDay").append(date);

// //const checkTime = function () {
// const currentTime = moment().format("HH");

// const hourBlock = $(".col-md-1 hour");

//   for (const index = 0; index < hourBlock.length, i++ ) {
// const hourBlockID = hourBlock[index].id;

// const timeBlockID = document.getElementById("hourBlock");

// $(hourBlock[index].id).removeClass(".present .past .future");

//  if (hourBlockID < currentTime) {
//   $(timeBlockID).addClass("past");
// }
//  else if (hourBlockID > currentTime) {
//  $(timeBlockID).addClass("future");
// }
//  else {
//  $(timeBlockID).addClass("present");
//  }
//  }
//  };
