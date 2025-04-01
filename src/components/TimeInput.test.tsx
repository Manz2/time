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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with label', () => {
        render(
            <TimeInput value={baseTime} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );
        expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
    });

    it('adds 15 minutes when clicking "+"', async () => {
        render(
            <TimeInput value={baseTime} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );
        const addBtn = screen.getByRole('button', { name: 'Add 15 minutes' });
        await userEvent.click(addBtn);
        expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:15:00'));
    });

    it('subtracts 15 minutes when clicking "-"', async () => {
        render(
            <TimeInput value={baseTime} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );

        const subtractBtn = screen.getByRole('button', { name: 'Subtract 15 minutes' });
        await userEvent.click(subtractBtn);
        expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:00:00'));
    });

    it('shows both tooltips on hover', async () => {
        render(
            <TimeInput value={baseTime} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );
        const [plusBtn, minusBtn] = screen.getAllByRole('button');

        await userEvent.hover(plusBtn);
        expect(await screen.findByText('Add 15 minutes')).toBeInTheDocument();

        await userEvent.unhover(plusBtn);
        await userEvent.hover(minusBtn);
        expect(await screen.findByText('Subtract 15 minutes')).toBeInTheDocument();
    });

    it('subtracts 15 minutes if already on a quarter hour', async () => {
        const rounded = dayjs('2025-04-01T12:15:00');
        render(
            <TimeInput value={rounded} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );

        const subtractBtn = screen.getByRole('button', { name: 'Subtract 15 minutes' });
        await userEvent.click(subtractBtn);

        expect(handleChange).toHaveBeenCalledWith(dayjs('2025-04-01T12:00:00'));
    });

    it('calls onChange when time is changed via picker', () => {
        render(
            <TimeInput value={baseTime} onChange={handleChange}>Start Time</TimeInput>,
            { wrapper: Wrapper }
        );

        const input = screen.getByLabelText(/start time/i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: '13:30' } });
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalled();

        const calledValue = handleChange.mock.calls[0][0];
        expect(dayjs.isDayjs(calledValue)).toBe(true);
        expect(calledValue.format('HH:mm')).toBe('13:30');
    });
});
