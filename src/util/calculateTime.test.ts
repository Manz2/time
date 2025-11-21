import dayjs from 'dayjs';
import { calculateTime } from './calculateTime';

describe('calculateTime', () => {
  it('calculates correct time for same day', () => {
    const start = dayjs().hour(8).minute(0);
    const end = dayjs().hour(17).minute(0);
    const breakTime = dayjs().hour(1).minute(0);

    expect(calculateTime(start, end, breakTime)).toBe('08:00');
  });

  it('returns "Invalid time" when result is negative', () => {
    const start = dayjs().hour(8).minute(0);
    const end = dayjs().hour(9).minute(0);
    const breakTime = dayjs().hour(2).minute(0);

    expect(calculateTime(start, end, breakTime)).toBe('Invalid time');
  });

  it('handles end time before start time (over midnight)', () => {
    const start = dayjs().hour(23).minute(0);
    const end = dayjs().hour(1).minute(0);
    const breakTime = dayjs().hour(0).minute(0);

    expect(calculateTime(start, end, breakTime)).toBe('02:00');
  });

  it('rounds and pads correctly', () => {
    const start = dayjs().hour(10).minute(15);
    const end = dayjs().hour(11).minute(5);
    const breakTime = dayjs().hour(0).minute(0);

    expect(calculateTime(start, end, breakTime)).toBe('00:50');
  });
});
