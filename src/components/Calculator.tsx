import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeInput } from './TimeInput.tsx';
import { Time } from './Time.tsx';
import { GitHub } from './Github.tsx';
import { calculateTime } from '../util/calculateTime.ts';

function Calculator() {
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
  );
}

export default Calculator;
