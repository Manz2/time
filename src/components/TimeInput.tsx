import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type Props = {
  children: React.ReactNode;
  value: Dayjs;
  onChange: (newValue: Dayjs) => void;
  testIdPrefix: string;
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

const fontSize = {
  xs: '6vw',
  sm: '6vw',
  md: '6vw',
  lg: '3vw',
};

export const TimeInput = ({ children, value, onChange, testIdPrefix }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TimePicker
        label={children}
        value={value}
        onChange={(newValue) => {
          onChange(newValue as Dayjs);
        }}
        ampm={false}
        disableOpenPicker
        slotProps={{
          textField: {
            inputProps: {
              'data-testid': `${testIdPrefix}-input`,
            },
            sx: {
              fontSize: fontSize,
              input: {
                fontSize: fontSize,
              },
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', fontSize }} >
        <Tooltip title="Add 15 minutes" placement="right">
          <IconButton
            onClick={() => onChange(adjustTimeToNearestQuarterHour(value, 'up'))}
            aria-label="Add 15 minutes"
            data-testid={`${testIdPrefix}-plus`}>
            <AddIcon fontSize="inherit" sx={{ fontSize: fontSize }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Subtract 15 minutes" placement="right">
          <IconButton
            onClick={() => onChange(adjustTimeToNearestQuarterHour(value, 'down'))}
            aria-label="Subtract 15 minutes"
            data-testid={`${testIdPrefix}-minus`}>
            <RemoveIcon fontSize="inherit" sx={{ fontSize: fontSize }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
