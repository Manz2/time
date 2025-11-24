import React from 'react';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type Props = {
  children: React.ReactNode;
  value: Dayjs;
  onChange: (newValue: String) => void;
  testIdPrefix: string;
};

const fontSize = {
  xs: '6vw',
  sm: '6vw',
  md: '6vw',
  lg: '3vw',
};

export const TextInput = ({
  children,
  value,
  onChange,
  testIdPrefix,
}: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label={children}
        value={value}
        onChange={newValue => {
          onChange(newValue as String);
        }}
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
    </Box>
  );
};
