import { parseISO } from "date-fns";

export default function getDateStatus(date) {
    // Get the current date
    var today = new Date();
  console.log(date)
    // Get tomorrow's date
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    // Get the day after tomorrow's date
    var afterTomorrow = new Date();
    afterTomorrow.setDate(today.getDate() + 2);
    // Check if the given date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }
    // Check if the given date is tomorrow
    else if (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    ) {
      return "Tomorrow";
    }
    // Check if the given date is the day after tomorrow
    else if (
      date.getDate() === afterTomorrow.getDate() &&
      date.getMonth() === afterTomorrow.getMonth() &&
      date.getFullYear() === afterTomorrow.getFullYear()
    ) {
      return "After Tomorrow";
    } else {
      // For any other date, return "Expires on (name of the day with date and month)"
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var formattedDate = date.toLocaleDateString('en-US', options);
      return "Expires on " + formattedDate;
    }
  }