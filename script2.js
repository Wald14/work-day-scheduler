// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function main() {
  var now = dayjs();
  var hour = now.hour()

  var calendarHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

  var calendar = loadCalendar();


  // COMPLETED: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // var saveButtonEl = $(".saveBtn");
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

  function saveCalendar() {
    localStorage.setItem("Task-Calendar", JSON.stringify(calendar));
  }


  // Completed: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function pastPresentFuture() {
    var timeBlocks = $(".time-block")

    for (i = 0; i < timeBlocks.length; i++) {
      var singleBlock = timeBlocks[i];
      var blockHour = $(singleBlock).attr('id').replace("hour-", "");
      if (blockHour < hour) {
        singleBlock.classList.add("past");
        // singleBlock.classList.remove("present");
        // singleBlock.classList.remove("future");
      } else if (blockHour > hour) {
        // singleBlock.classList.remove("past");
        // singleBlock.classList.remove("present");
        singleBlock.classList.add("future");
      } else {
        // singleBlock.classList.remove("past");
        singleBlock.classList.add("present");
        // singleBlock.classList.remove("future");
      }
    }
  }





  // COMPLETED: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // <main class="container-lg px-5">
  // <!-- Use class for "past", "present", and "future" to apply styles to the
  //   time-block divs accordingly. The javascript will need to do this by
  //   adding/removing these classes on each div by comparing the hour in the
  //   id to the current hour. The html provided below is meant to be an example
  //   demonstrating how the css provided can be leveraged to create the
  //   desired layout and colors. The html below should be removed or updated
  //   in the finished product. Remember to delete this comment once the
  //   code is implemented.
  //   -->

  // <!-- Example of a past time block. The "past" class adds a gray background color. -->
  // <div id="hour-9" class="row time-block past">
  //   <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
  //   <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  //   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  //     <i class="fas fa-save" aria-hidden="true"></i>
  //   </button>
  // </div>


  function generateTimeBlock(hour, hour2) {
    var hourBlockDiv = $("<div></div>").attr("id", "hour-" + hour).addClass("row time-block past");
    $(hourBlockDiv).append(
      $("<div></div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour2),
      $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3),
      $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append($("<i></i>").addClass("fas fa-save").attr("aria-hidden", "true"))
    )

    $("#calendar-container").append(hourBlockDiv);
  
  }


  

  function saveCalendar() {
    localStorage.setItem("Task-Calendar", JSON.stringify(calendar));
  }

  function generateCalendar() {
    for (i = 0; i < calendarHours.length; i++) {
      generateTimeBlock(i + 9, calendarHours[i]);
    }
    pastPresentFuture()
  }
  generateCalendar();













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

  // COMPLETED: Add code to display the current date in the header of the page.
  $("#currentDay").text(now.format("dddd, MMM Do"));
});