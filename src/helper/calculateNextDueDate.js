// Function to calculate the next due date based on the repeat frequency
const calculateNextDueDate = (dueDate, repeat) => {
    switch (repeat) {
      case 'daily':
        const nextDaily = new Date(dueDate);
        nextDaily.setDate(nextDaily.getDate() + 1);
        return nextDaily;
      case 'weekly':
        const nextWeekly = new Date(dueDate);
        nextWeekly.setDate(nextWeekly.getDate() + 7);
        return nextWeekly;
      case 'monthly':
        const nextMonthly = new Date(dueDate);
        nextMonthly.setMonth(nextMonthly.getMonth() + 1);
        return nextMonthly;
      case 'annually':
        const nextAnnually = new Date(dueDate);
        nextAnnually.setFullYear(nextAnnually.getFullYear() + 1);
        return nextAnnually;
      case 'workdays':
        const nextWorkday = new Date(dueDate);
        let dayOfWeek = nextWorkday.getDay();
        // Calculate the next workday (Monday to Friday)
        do {
          nextWorkday.setDate(nextWorkday.getDate() + 1);
          dayOfWeek = nextWorkday.getDay();
        } while (dayOfWeek === 0 || dayOfWeek === 6); // 0: Sunday, 6: Saturday
        return nextWorkday;
      case 'custom':
        // Implement your custom logic for the custom repeat frequency
        // Calculate and return the next due date based on the custom logic
        break;
      default:
        // Handle unknown repeat frequency
        break;
    }
  };
  
  // Function to update the task with the next due date based on repeat frequency
 
  