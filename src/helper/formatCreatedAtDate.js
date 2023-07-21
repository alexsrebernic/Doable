export function formatDate(unixTimestampMillis) {
    const currentDate = new Date();
    const inputDate = new Date(unixTimestampMillis);
  
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    if (dayDifference === 0) {
      return 'Today';
    } else if (dayDifference === 1) {
      return 'Yesterday';
    } else if (dayDifference === 2) {
      return 'Before Yesterday';
    } else {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return inputDate.toLocaleDateString(undefined, options);
    }
  }
  
