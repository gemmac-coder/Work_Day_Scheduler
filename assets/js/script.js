const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};

const renderCalenderEvents = () => {
  const schedulerEvents = JSON.parse(localStorage.getItem("schedulerEvents"));

  if (schedulerEvents !== null) {
    const currentHour = moment().hour();
    const timeBlocks = $(".container .row");
    console.log(timeBlocks);
    const callback = function () {
      const textArea = $(this).find("textarea");
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);
      if (timeBlockTime === currentHour) {
        textArea.removeClass("past").addClass("present");
      }
      if (timeBlockTime > currentHour) {
        textArea.removeClass("past").addClass("future");
      }
      const scheduledEvent = schedulerEvents[timeBlockTime];
      textArea.text(scheduledEvent);
    };

    timeBlocks.each(callback);
  } else {
    localStorage.setItem("schedulerEvents", JSON.stringify({}));
  }
};

const onClick = function (event) {
  const schedulerEvents = JSON.parse(localStorage.getItem("schedulerEvents"));
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);
  if (target.is("button")) {
    const key = target.attr("id");
    const value = target.parent().find("textarea").val();

    const newObject = {
      ...schedulerEvents,
      [key]: value,
    };

    localStorage.setItem("schedulerEvents", JSON.stringify(newObject));
    console.log(key, value);
    console.log(newObject);
  }
};

const onReady = () => {
  console.log("I am ready");
  $(".container").click(onClick);
  renderCurrentDate();

  renderCalenderEvents();
};

$(document).ready(onReady);

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
