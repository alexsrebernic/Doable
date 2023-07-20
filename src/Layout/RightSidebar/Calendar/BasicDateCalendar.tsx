import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import '../../../css/calendar.css'
dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: '#225FFC',
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(props: PickersDayProps<Dayjs> & { selectedday?: Dayjs | null }) {
  const { day, selectedday, ...other } = props;
  if (selectedday == null) {
    return <PickersDay day={day} {...other} />;
  }
  if(typeof selectedday == 'string'){
    if(selectedday == 'Today') return (
      <PickersDay
      day={day} {...other} />
    );
    if(selectedday == 'This week') {
      const today = dayjs(new Date())
      const start = today.startOf('week');
      const end = today.endOf('week');
      const dayIsBetween = day.isBetween(start, end, null, '[]');
      const isFirstDay = day.isSame(start, 'day');
      const isLastDay = day.isSame(end, 'day');
      return (
        <CustomPickersDay
          {...other}
          day={day}
          sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
          dayIsBetween={dayIsBetween}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}
        />
      );
    }
    if(selectedday == 'This month') {
      const today = dayjs(new Date())
      const start = today.startOf('month');
      const end = today.endOf('month');
    
      const dayIsBetween = day.isBetween(start, end, null, '[]');
      const isFirstDay = day.isSame(start, 'day');
      const isLastDay = day.isSame(end, 'day');
    
      return (
        <CustomPickersDay
          {...other}
          day={day}
          sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
          dayIsBetween={dayIsBetween}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}
        />
      );
    }
  } else {
    return <PickersDay
      day={day} {...other} />
  }
}

export default function BasicDateCalendar({value,setValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={typeof value === 'string'? dayjs(new Date()) : value}
        onChange={(newValue) => setValue(newValue)}
        slots={ { day: Day }}
        slotProps={{
          day: {
            selectedday: value,
          } as any,
        }}
        showDaysOutsideCurrentMonth
      />
    </LocalizationProvider>
  );
}