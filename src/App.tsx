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

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(
    dayjs().hour(8).minute(0).second(0)
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(
    dayjs().hour(17).minute(0).second(0)
  );
  const [breakTime, setBreakTime] = useState<dayjs.Dayjs | null>(
    dayjs().hour(1).minute(0).second(0)
  );


  useEffect(() => {
    const isPC = !('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isPC) {
      document.body.style.zoom = '200%';
    } else {
      document.body.style.zoom = '100%';
    }
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

      // Falls die Endzeit nach 0 Uhr ist (z. B. 00:30, 01:00), auf den nächsten Tag setzen
      if (adjustedEndTime.isBefore(adjustedStartTime)) {
        adjustedEndTime = adjustedEndTime.add(1, 'day');
      }

      const breakMinutes = breakTime.hour() * 60 + breakTime.minute(); // Pausenzeit in Minuten

      const totalMinutes = adjustedEndTime.diff(adjustedStartTime, 'minute') - breakMinutes;

      if (totalMinutes < 0) return 'Invalid time';

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
