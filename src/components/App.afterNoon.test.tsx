jest.mock('dayjs', () => {
    const original = jest.requireActual('dayjs');
    const mockNow = original('2025-04-01T14:00:00');
    const mockDayjs = (...args: any[]) => {
        return args.length === 0 ? mockNow.clone() : original(...args);
    };
    Object.assign(mockDayjs, original);
    mockDayjs.default = mockDayjs;
    return mockDayjs;
});

import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    it('renders all time inputs and result time', () => {
        render(<App />);
        expect(screen.getAllByText(/start time/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/break time/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/end time/i).length).toBeGreaterThan(0);
        expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
    });

    it('renders calculated time correctly (normal case)', () => {
        render(<App />);
        const result = screen.getByRole('button', { name: /copy to clipboard/i });
        expect(result).toHaveTextContent('05:00'); // 14:00 - 08:00 - 1h pause = 5h
    });
    it('does not update endTime when current time is before 12:00', () => {
        render(<App />);
    });
});
