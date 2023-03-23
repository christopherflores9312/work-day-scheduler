$(function () {

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

  // Display the current day
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

  // Initialize the page
  colorCodeTimeBlocks();
  loadSavedEvents();

});
