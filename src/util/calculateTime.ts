import dayjs, { Dayjs } from 'dayjs';

export function calculateTime(
  startTime: Dayjs,
  endTime: Dayjs,
  breakTime: Dayjs
): string {
  const today = dayjs().format('YYYY-MM-DD');

  const adjustedStartTime = dayjs(`${today}T${startTime.format('HH:mm')}`);
  let adjustedEndTime = dayjs(`${today}T${endTime.format('HH:mm')}`);

  if (adjustedEndTime.isBefore(adjustedStartTime)) {
    adjustedEndTime = adjustedEndTime.add(1, 'day');
  }

  const breakMinutes = breakTime.hour() * 60 + breakTime.minute();
  const totalMinutes =
    adjustedEndTime.diff(adjustedStartTime, 'minute') - breakMinutes;

  if (totalMinutes < 0) return 'Invalid time';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
