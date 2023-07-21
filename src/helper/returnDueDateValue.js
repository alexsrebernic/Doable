import { parseISO } from "date-fns";

export const returnDueDateValue = (selectedDueDate) => {
  if(!selectedDueDate) return null
    let dueDateValue;
    switch (selectedDueDate) {
      case 'Today':
        dueDateValue = Date.now();
        break;
      case 'Tomorrow':
        dueDateValue = Date.now() + 86400000;
        break;
      case 'After tomorrow':
        dueDateValue = Date.now() + (86400000 * 2)
        break;
      default:
        const dateParsed = new Date(selectedDueDate)
        dueDateValue = dateParsed.getTime() + 86400000
        break;
    }
    return dueDateValue
  };