// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Event listeners
  $(".saveBtn").on("click", saveEvent);

  // Save event to localStorage
  function saveEvent(event) {
    const button = $(event.target);
    const timeBlock = button.parents(".time-block");
    const timeBlockHour = timeBlock.attr("id");
    const eventDescription = timeBlock.children(".description").val();

    localStorage.setItem(timeBlockHour, eventDescription);
  }

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Color code time blocks

function colorCodeTimeBlocks() {
  // Select all elements with the class 'time-block' and iterate over them
  $(".time-block").each(function () {
    // Get the current hour using dayjs library
    const currentHour = dayjs().hour();
    // Get the hour for the time block by parsing the 'id' attribute of the element and extracting the hour
    const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the time block hour to the current hour
    if (timeBlockHour < currentHour) {
      // If the time block hour is less than the current hour, add the class 'past' to the element
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      // If the time block hour is equal to the current hour, add the class 'present' and remove the class 'past'
      $(this).addClass("present");
      $(this).removeClass("past");
    } else {
      // If the time block hour is greater than the current hour, add the class 'future' and remove the classes 'past' and 'present'
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  });
}

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  // Load saved events from localStorage
  
 // Define a function named loadSavedEvents
function loadSavedEvents() {
  // Select all elements with the class 'time-block' and iterate over them
  $(".time-block").each(function () {
    // Get the 'id' attribute of the time block element, which represents the time block hour
    const timeBlockHour = $(this).attr("id");
    // Retrieve the saved event from the localStorage using the time block hour as the key
    const savedEvent = localStorage.getItem(timeBlockHour);

    // Check if there is a saved event for the time block
    if (savedEvent) {
      // If there is a saved event, set the value of the child element with the class 'description' to the saved event
      $(this).children(".description").val(savedEvent);
    }
  });
}

  // TODO: Add code to display the current date in the header of the page.

  // Display the current day
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

   // Initialize the page
   colorCodeTimeBlocks();
   loadSavedEvents();

});
