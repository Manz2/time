import { CssBaseline, ThemeProvider, Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeInput } from './TimeInput';
import { darkTheme } from '../util/theme';

function App() {

  const getInitialTime = (hour: number, minute: number = 0) =>
    dayjs().hour(hour).minute(minute).second(0).millisecond(0);

  const [startTime, setStartTime] = useState(getInitialTime(8));
  const [endTime, setEndTime] = useState(getInitialTime(17));
  const [breakTime, setBreakTime] = useState(getInitialTime(1));

  useEffect(() => {
    const isPC = !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    document.body.style.zoom = isPC ? '200%' : '100%';
  }, []);

  useEffect(() => {
    const now = dayjs();
    if (now.hour() >= 12) {
      setEndTime(now);
    }
  }, []);


  const calculateTime = () => {
    if (startTime && endTime && breakTime) {
      const today = dayjs().format('YYYY-MM-DD');

      let adjustedStartTime = dayjs(`${today}T${startTime.format('HH:mm')}`);
      let adjustedEndTime = dayjs(`${today}T${endTime.format('HH:mm')}`);

      if (adjustedEndTime.isBefore(adjustedStartTime)) {
        adjustedEndTime = adjustedEndTime.add(1, 'day');
      }

      const breakMinutes = breakTime.hour() * 60 + breakTime.minute();
      const totalMinutes = adjustedEndTime.diff(adjustedStartTime, 'minute') - breakMinutes;

      if (totalMinutes < 0) return 'Invalid time';

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    return 'Invalid time';
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {calculateTime()}
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TimeInput value={startTime} onChange={setStartTime} >Start Time</TimeInput>
            <TimeInput value={breakTime} onChange={setBreakTime} >Break Time</TimeInput>
            <TimeInput value={endTime} onChange={setEndTime} >End Time</TimeInput>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
