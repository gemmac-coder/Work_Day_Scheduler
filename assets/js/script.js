//Displays current date
const renderCurrentDate = () => {
  const dateTime = $("#currentDay");
  const displayNow = moment().format("dddd, MMMM Do");
  dateTime.text(displayNow);
};
// Renders calendar events and retrieves scheduler events from local storage
const renderCalenderEvents = () => {
  const schedulerEvents = JSON.parse(localStorage.getItem("schedulerEvents"));
  // Dynamic colour coding based on if the timeblock is in the past, present or future
  if (schedulerEvents !== null) {
    const currentHour = moment().hour();
    const timeBlocks = $(".container .row");
    const callback = function () {
      const textArea = $(this).find("textarea");
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);
      // If the corresponding timeblock time is equal to the current hour, the present class is added to the timeblock
      if (timeBlockTime === currentHour) {
        textArea.removeClass("past").addClass("present");
      }
      // If the corresponding timeblock time is greater than the current hour, the future class is added to the timeblock
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
// Every time a timeblock button is clicked, the input from the textarea is saved in local storage
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
  }
};
// Loads dynamic date and saved calender events from local storage, adds click event listener to container
const onReady = () => {
  $(".container").click(onClick);
  renderCurrentDate();

  renderCalenderEvents();
};

$(document).ready(onReady);
