import { CssBaseline, ThemeProvider, createTheme, Box, TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [startTime, setStartTime] = useState(dayjs().hour(8).minute(0).second(0));
  const [endTime, setEndTime] = useState(dayjs().hour(17).minute(0).second(0));
  const [breakTime, setBreakTime] = useState(dayjs().hour(1).minute(0).second(0));

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

  const adjustTimeToNearestQuarterHour = (time: dayjs.Dayjs, direction: 'up' | 'down') => {
    const minute = time.minute();
    const remainder = minute % 15;

    if (direction === 'up') {
      return time.add(15 - remainder, 'minute').second(0);
    } else {
      return time.subtract(remainder || 15, 'minute').second(0);
    }
  };

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
            {/* Start Time */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Start Time"
                type="time"
                value={startTime.format('HH:mm')}
                onChange={(e) => setStartTime(dayjs(`${dayjs().format('YYYY-MM-DD')}T${e.target.value}`))}
                sx={{ width: '250px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton onClick={() => setStartTime(adjustTimeToNearestQuarterHour(startTime, 'up'))}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => setStartTime(adjustTimeToNearestQuarterHour(startTime, 'down'))}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Break Time */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Break Time"
                type="time"
                value={breakTime.format('HH:mm')}
                onChange={(e) => setBreakTime(dayjs(`${dayjs().format('YYYY-MM-DD')}T${e.target.value}`))}
                sx={{ width: '250px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton onClick={() => setBreakTime(adjustTimeToNearestQuarterHour(breakTime, 'up'))}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => setBreakTime(adjustTimeToNearestQuarterHour(breakTime, 'down'))}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Box>

            {/* End Time */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                label="End Time"
                type="time"
                value={endTime.format('HH:mm')}
                onChange={(e) => setEndTime(dayjs(`${dayjs().format('YYYY-MM-DD')}T${e.target.value}`))}
                sx={{ width: '250px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton onClick={() => setEndTime(adjustTimeToNearestQuarterHour(endTime, 'up'))}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => setEndTime(adjustTimeToNearestQuarterHour(endTime, 'down'))}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
