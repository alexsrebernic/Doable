import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import '../../css/calendar.css'
export default function BasicDateCalendar({setDate}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar showDaysOutsideCurrentMonth onChange={(value) => setDate(value)} className='font-montserrat '/>
    </LocalizationProvider>
  );
}