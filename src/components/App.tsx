import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { darkTheme } from '../util/theme';
import Calculator from './Calculator.tsx';
import React from 'react';
import Toggle from './Toggle.tsx';
import Clock from './Clock.tsx';

function App() {
  const [view, setView] = React.useState('calculator');

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string | null
  ) => {
    if (nextView) {
      setView(nextView);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toggle view={view} handleChange={handleChange} />
        {view === 'calculator' && <Calculator />}
        {view === 'clock' && <Clock />}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
