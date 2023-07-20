import { parseISO } from "date-fns";

export const returnDueDateValue = (selectedDueDate) => {
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
      default:
        dueDateValue = parseISO(selectedDueDate) 
        break;
    }
    return dueDateValue
  };