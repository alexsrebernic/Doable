import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface Props {
    text : string,
    items : string[],
    setFunction: Function
}
export default function BasicDropdown({text,items,setFunction} : Props) {
  const [value,setDropdownValue] = React.useState("Today")
  const handleChange = (event: SelectChangeEvent) => {
    setDropdownValue(event.target.value as string)
    setFunction(event.target.value as string);
  };

  return (
    <Box sx={{ width: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{text}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={value}
          onChange={handleChange}
        >   
        {
            items.map((item,index) =>  <MenuItem key={index} value={item}>{item}</MenuItem>)
        }
        </Select>
      </FormControl>
    </Box>
  );
}