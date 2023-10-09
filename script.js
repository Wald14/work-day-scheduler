// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function main() {
  var saveButtonEl = $(".saveBtn");
  var now = dayjs();

  var calendar = [{
    hour: "hour-9",
    task: ""
  },
  {
    hour: "hour-10",
    task: ""
  },
  {
    hour: "hour-11",
    task: ""
  }]

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveButtonEl.on("click", function () {
    // Determines the parent Div's Id (aka hour button clicked)
    var hourBtnClicked = $(this).parent().attr("id");
    console.log(`Hour button clicked: ${hourBtnClicked}`);

    // Determines where the matching object is in the calendar 
    var indexOfHourClicked = calendar.findIndex(function (calendar) {
      return calendar.hour === hourBtnClicked
    })
    console.log (`Index of the hour selected: ${indexOfHourClicked}`)

    // Return the "task" in the hour clicked
    console.log (`old task for ${hourBtnClicked} was: ${calendar[indexOfHourClicked].task}`)

    // Determine the text in the sibling textarea to the button that was clicked
    var taskTextArea = $.trim($(this).siblings("textarea").val());
    console.log(`User entered task: ${taskTextArea}`)

    // Set or replace task for that hour in the calendar array
    calendar[indexOfHourClicked].task = taskTextArea;
    console.log(`New task for ${hourBtnClicked} set to: ${calendar[indexOfHourClicked].task}`)

    // Call save function to save changes to local storage
    saveCalendar()
  });

  function saveCalendar() {
    localStorage.setItem("Task-Calendar", JSON.stringify(calendar));
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // COMPLETED: Add code to display the current date in the header of the page.
  $("#currentDay").text(now.format("dddd, MMM Do"));
});