// Function to check if a date is expired
const isDateExpired = (timestampInMilliseconds) => {
    // Get the current date in Unix timestamp milliseconds
    const currentDate = new Date();
    
    // Set the time of day to 00:00:00 to ignore the time part
    currentDate.setHours(0, 0, 0, 0);
  
    // Compare the given timestamp with the current date, excluding equality
    return timestampInMilliseconds < currentDate.getTime();
  };
export default isDateExpired