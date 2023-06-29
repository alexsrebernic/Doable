export const returnDueDateValue = (selectedDueDate,customDate) => {
    let dueDateValue;
    switch (selectedDueDate) {
      case 'Today':
        dueDateValue = new Date();
        break;
      case 'Tomorrow':
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dueDateValue = tomorrow;
        break;
      case 'After tomorrow':
        const afterTomorrow = new Date();
        afterTomorrow.setDate(afterTomorrow.getDate() + 2);
        dueDateValue = afterTomorrow;
        break;
      case 'custom':
        dueDateValue = customDate
        break;
    }
    return dueDateValue
  };