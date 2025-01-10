// App.tsx
import { CssBaseline, ThemeProvider, createTheme, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs('2022-04-17T08:00'));
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs('2022-04-17T17:00'));
  const [breakTime, setBreakTime] = useState<dayjs.Dayjs | null>(dayjs('2022-04-17T01:00'));

  useEffect(() => {
    const isPC = !('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isPC) {
      document.body.style.zoom = '200%';
    } else {
      document.body.style.zoom = '100%'; 
    }
  }, []);

  const calculateTime = () => {
    if (startTime && endTime && breakTime) {
      const totalMinutes = endTime.diff(startTime, 'minute') - breakTime.diff(dayjs('2022-04-17T00:00'), 'minute');
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    return 'Invalid time';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <h1>{calculateTime()}</h1>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              label="Start Time"
              type="time"
              value={startTime ? startTime.format('HH:mm') : ''}
              onChange={(e) => setStartTime(dayjs(`2022-04-17T${e.target.value}`))}
              sx={{ width: '300px' }}
            />
            <TextField
              label="Break Time"
              type="time"
              value={breakTime ? breakTime.format('HH:mm') : ''}
              onChange={(e) => setBreakTime(dayjs(`2022-04-17T${e.target.value}`))}
              sx={{ width: '300px' }}
            />
            <TextField
              label="End Time"
              type="time"
              value={endTime ? endTime.format('HH:mm') : ''}
              onChange={(e) => setEndTime(dayjs(`2022-04-17T${e.target.value}`))}
              sx={{ width: '300px' }}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
