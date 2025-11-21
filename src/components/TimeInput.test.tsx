import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeInput } from './TimeInput';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);

describe('TimeInput component', () => {
  const baseTime = dayjs('2025-04-01T12:07:00');
  const handleChange = jest.fn();
  const renderComponent = () =>
    render(
      <TimeInput testIdPrefix="start" value={baseTime} onChange={handleChange}>
        Start Time
      </TimeInput>,
      { wrapper: Wrapper }
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with test id', () => {
    renderComponent();
    expect(screen.getByTestId('start-input')).toBeInTheDocument();
  });

  it('exposes test ids for input and controls', () => {
    renderComponent();
    expect(screen.getByTestId('start-input')).toBeInTheDocument();
    expect(screen.getByTestId('start-plus')).toBeInTheDocument();
    expect(screen.getByTestId('start-minus')).toBeInTheDocument();
  });

  it('adds 15 minutes when clicking "+"', async () => {
    renderComponent();
    const addBtn = screen.getByTestId('start-plus');
    await userEvent.click(addBtn);
    expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:15:00'));
  });

  it('subtracts 15 minutes when clicking "-"', async () => {
    renderComponent();

    const subtractBtn = screen.getByTestId('start-minus');
    await userEvent.click(subtractBtn);
    expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:00:00'));
  });

  it('shows both tooltips on hover', async () => {
    renderComponent();
    const plusBtn = screen.getByTestId('start-plus');
    const minusBtn = screen.getByTestId('start-minus');

    await userEvent.hover(plusBtn);
    expect(await screen.findByText('Add 15 minutes')).toBeInTheDocument();

    await userEvent.unhover(plusBtn);
    await userEvent.hover(minusBtn);
    expect(await screen.findByText('Subtract 15 minutes')).toBeInTheDocument();
  });

  it('subtracts 15 minutes if already on a quarter hour', async () => {
    const rounded = dayjs('2025-04-01T12:15:00');
    render(
      <TimeInput testIdPrefix="start" value={rounded} onChange={handleChange}>
        Start Time
      </TimeInput>,
      { wrapper: Wrapper }
    );

    const subtractBtn = screen.getByTestId('start-minus');
    await userEvent.click(subtractBtn);

    expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:00:00'));
  });

  it('calls onChange when time is changed via picker', () => {
    renderComponent();

    const input = screen.getByTestId('start-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '13:30' } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalled();

    const calledValue = handleChange.mock.calls[0][0];
    expect(dayjs.isDayjs(calledValue)).toBe(true);
    expect(calledValue.format('HH:mm')).toBe('13:30');
  });
});
