$(function main() {
  // variables
  var now = dayjs();
  var hour = now.hour()

  // blank calendar array to later be filled by loadCalendar function
  var calendar = [];


  // Display the current date in the header of the page.
  $("#currentDay").text(now.format("dddd, MMM Do"));


  // Call the generate calendar function to make the calendar on the webpage
  generateCalendar();


  // Generate the calendar
  function generateCalendar() {
    var calendarHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
    for (i = 0; i < calendarHours.length; i++) {
      generateTimeBlock(i + 9, calendarHours[i]);
    }
    pastPresentFuture()
    calendar = loadCalendar();
  }

  // Generate a single time block
  function generateTimeBlock(hour, hour2) {
    var hourBlockDiv = $("<div></div>").attr("id", "hour-" + hour).addClass("row time-block past");
    $(hourBlockDiv).append(
      $("<div></div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour2),
      $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3),
      $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append($("<i></i>").addClass("fas fa-save").attr("aria-hidden", "true"))
    )
    $("#calendar-container").append(hourBlockDiv);
  }


  // Assigns a class to the hourblock based on if it's in the past present or future
  function pastPresentFuture() {
    var timeBlocks = $(".time-block")

    for (i = 0; i < timeBlocks.length; i++) {
      var singleBlock = timeBlocks[i];
      var blockHour = $(singleBlock).attr('id').replace("hour-", "");
      if (blockHour < hour) {
        singleBlock.classList.add("past");
      } else if (blockHour > hour) {
        singleBlock.classList.add("future");
      } else {
        singleBlock.classList.add("present");
      }
    }
  }

  // Loads a calendar from localstorage
  // If no calendar exists in storage, it generates a template to work off of
  function loadCalendar() {
    calendar = JSON.parse(localStorage.getItem("Task-Calendar"));

    if (calendar === null) {
      return [
        { hour: "hour-9", task: "" },
        { hour: "hour-10", task: "" },
        { hour: "hour-11", task: "" },
        { hour: "hour-12", task: "" },
        { hour: "hour-13", task: "" },
        { hour: "hour-14", task: "" },
        { hour: "hour-15", task: "" },
        { hour: "hour-16", task: "" },
        { hour: "hour-17", task: "" }
      ];
    } else {
      for (var i = 9; i < 9 + calendar.length; i++) {
        $("#hour-" + i).children("textarea").text(calendar[i - 9].task);
      }
      return calendar;
    }
  }


  // Listens for the click of the save button
  $("#calendar-container").on("click", ".saveBtn", function () {
    console.log("save button clicked")
    // Determines the parent Div's Id (aka hour button clicked)
    var hourBtnClicked = $(this).parent().attr("id");
    // Determines where the matching object is in the calendar 
    var indexOfHourClicked = calendar.findIndex(function (calendar) {
      return calendar.hour === hourBtnClicked
    })
    // Determine the text in the sibling textarea to the button that was clicked
    var taskTextArea = $.trim($(this).siblings("textarea").val());
    // Set or replace task for that hour in the calendar array
    calendar[indexOfHourClicked].task = taskTextArea;
    // Call save function to save changes to local storage
    saveCalendar()
  });


  // Save calendar to local storage
  function saveCalendar() {
    localStorage.setItem("Task-Calendar", JSON.stringify(calendar));
  }
});
