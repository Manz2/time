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

const adjustTimeToNearestQuarterHour = (
  time: dayjs.Dayjs,
  direction: 'up' | 'down'
) => {
  const minute = time.minute();
  const remainder = minute % 15;

  if (direction === 'up') {
    return time
      .add(15 - remainder, 'minute')
      .second(0)
      .millisecond(0);
  } else {
    return time
      .subtract(remainder || 15, 'minute')
      .second(0)
      .millisecond(0);
  }
};

const fontSize = {
  xs: '6vw',
  sm: '6vw',
  md: '6vw',
  lg: '3vw',
};

const fieldSize = {
  xs: '34vw',
  sm: '30vw',
  md: '24vw',
  lg: '13vw',
};

const fieldHeight = {
  xs: '14vw',
  sm: '12vw',
  md: '10vw',
  lg: '5.5vw',
};

const getHtmlInputProps = (testIdPrefix: string) =>
  ({
    'data-testid': `${testIdPrefix}-input`,
  }) as React.InputHTMLAttributes<HTMLInputElement> & {
    'data-testid': string;
  };

export const TimeInput = ({
  children,
  value,
  onChange,
  testIdPrefix,
}: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TimePicker
        label={children}
        value={value}
        onChange={newValue => {
          onChange(newValue as Dayjs);
        }}
        ampm={false}
        disableOpenPicker
        slotProps={{
          textField: {
            slotProps: {
              htmlInput: getHtmlInputProps(testIdPrefix),
            },
            sx: {
              width: { xs: '70vw', md: '40vw', lg: '25vw' },
              '& .MuiPickersInputBase-root, & .MuiInputBase-root': {
                fontSize,
                minHeight: fieldHeight,
              },
              
              '& .MuiPickersSectionList-root, & .MuiPickersInputBase-input, & input':
                {
                  fontSize,
                  lineHeight: 1.2,
                },
              '& .MuiPickersOutlinedInput-root': {
                paddingInline: {
                  xs: 1.25,
                  md: 1.5,
                  lg: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: 'calc(1rem + 1vw)',
              },
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', fontSize }}>
        <Tooltip title="Add 15 minutes" placement="right">
          <IconButton
            onClick={() =>
              onChange(adjustTimeToNearestQuarterHour(value, 'up'))
            }
            aria-label="Add 15 minutes"
            data-testid={`${testIdPrefix}-plus`}
            size="large"
          >
            <AddIcon fontSize="inherit" sx={{ fontSize }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Subtract 15 minutes" placement="right">
          <IconButton
            onClick={() =>
              onChange(adjustTimeToNearestQuarterHour(value, 'down'))
            }
            aria-label="Subtract 15 minutes"
            data-testid={`${testIdPrefix}-minus`}
            size="large"
          >
            <RemoveIcon fontSize="inherit" sx={{ fontSize }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
