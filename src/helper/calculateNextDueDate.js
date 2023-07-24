// Function to calculate the next due date based on the repeat frequency
const calculateNextDueDate = (dueDate, repeat) => {
  switch (repeat) {
    case 'Daily':
      const nextDaily = new Date(dueDate);
      nextDaily.setDate(nextDaily.getDate() + 1);
      return nextDaily.getTime();
    case 'Weekly':
      const nextWeekly = new Date(dueDate);
      nextWeekly.setDate(nextWeekly.getDate() + 7);
      return nextWeekly.getTime();
    case 'Monthly':
      const nextMonthly = new Date(dueDate);
      nextMonthly.setMonth(nextMonthly.getMonth() + 1);
      return nextMonthly.getTime();
    case 'Annually':
      const nextAnnually = new Date(dueDate);
      nextAnnually.setFullYear(nextAnnually.getFullYear() + 1);
      return nextAnnually.getTime();
    case 'Work days':
      const nextWorkday = new Date(dueDate);
      let dayOfWeek = nextWorkday.getDay();
      do {
        nextWorkday.setDate(nextWorkday.getDate() + 1);
        dayOfWeek = nextWorkday.getDay();
      } while (dayOfWeek === 0 || dayOfWeek === 6); // 0: Sunday, 6: Saturday
      return nextWorkday.getTime();
    default:
      return null;
  }
};

  
  // Function to update the task with the next due date based on repeat frequency
export default calculateNextDueDate
