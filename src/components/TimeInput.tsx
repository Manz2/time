import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  children: React.ReactNode;
  value: Dayjs;
  onChange: (newValue: Dayjs) => void;
};

const adjustTimeToNearestQuarterHour = (time: dayjs.Dayjs, direction: 'up' | 'down') => {
  const minute = time.minute();
  const remainder = minute % 15;

  if (direction === 'up') {
    return time.add(15 - remainder, 'minute').second(0).millisecond(0);
  } else {
    return time.subtract(remainder || 15, 'minute').second(0).millisecond(0);
  }
};

export const TimeInput = ({ children, value, onChange }: Props) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = dayjs(`${value.format('YYYY-MM-DD')}T${e.target.value}`);
    onChange(newTime);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label={children}
        type="time"
        value={value.format('HH:mm')}
        onChange={handleTimeChange}
        sx={{ width: '250px' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton onClick={() => onChange(adjustTimeToNearestQuarterHour(value, 'up'))}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => onChange(adjustTimeToNearestQuarterHour(value, 'down'))}>
          <RemoveIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
