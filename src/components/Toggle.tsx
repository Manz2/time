import { ToggleButtonGroup, ToggleButton, Tooltip, Box } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import TimerIcon from '@mui/icons-material/Timer';
import React from 'react';

type ToggleProps = {
  view: string;
  handleChange: (
    _event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => void;
};

function Toggle({ view, handleChange }: ToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'right',
        marginTop: '2rem',
        marginRight: '4rem',
      }}
    >
      <ToggleButtonGroup
        value={view}
        onChange={handleChange}
        aria-label="view"
        data-testid="view-toggle-group"
        exclusive
      >
        <Tooltip title="Calculator">
          <ToggleButton
            value="calculator"
            aria-label="calculator"
            data-testid="calculator-toggle"
          >
            <CalculateIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Clock">
          <ToggleButton
            value="clock"
            aria-label="clock"
            data-testid="clock-toggle"
          >
            <TimerIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
  );
}

export default Toggle;
