import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeInput } from './TimeInput';
import { darkTheme } from '../util/theme';
import { Time } from './Time.tsx';
import { GitHub } from './Github.tsx';
import { calculateTime } from '../util/calculateTime';

function App() {
  const createTimeToday = (hour: number, minute: number = 0) =>
    dayjs().hour(hour).minute(minute).second(0).millisecond(0);

  const [startTime, setStartTime] = useState(createTimeToday(8));
  const [endTime, setEndTime] = useState(createTimeToday(17));
  const [breakTime, setBreakTime] = useState(createTimeToday(1));
  const sx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  };

  useEffect(() => {
    const now = dayjs();
    if (now.hour() >= 12) {
      setEndTime(now);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Time>{calculateTime(startTime, endTime, breakTime)}</Time>
          <Box component="section" sx={sx}>
            <TimeInput
              testIdPrefix="start"
              value={startTime}
              onChange={setStartTime}
            >
              Start Time
            </TimeInput>
            <TimeInput
              testIdPrefix="break"
              value={breakTime}
              onChange={setBreakTime}
            >
              Break Time
            </TimeInput>
            <TimeInput testIdPrefix="end" value={endTime} onChange={setEndTime}>
              End Time
            </TimeInput>
          </Box>
          <GitHub />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
