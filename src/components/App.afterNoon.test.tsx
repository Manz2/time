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
        expect(screen.getByTestId('start-input')).toBeInTheDocument();
        expect(screen.getByTestId('break-input')).toBeInTheDocument();
        expect(screen.getByTestId('end-input')).toBeInTheDocument();
        expect(screen.getByTestId('start-plus')).toBeInTheDocument();
        expect(screen.getByTestId('break-plus')).toBeInTheDocument();
        expect(screen.getByTestId('end-plus')).toBeInTheDocument();
        expect(screen.getByTestId('start-minus')).toBeInTheDocument();
        expect(screen.getByTestId('break-minus')).toBeInTheDocument();
        expect(screen.getByTestId('end-minus')).toBeInTheDocument();
        expect(screen.getByTestId('total-time')).toBeInTheDocument();
        expect(screen.getByTestId('github-link')).toBeInTheDocument();
    });

    it('renders calculated time correctly (normal case)', () => {
        render(<App />);
        const result = screen.getByTestId('total-time');
        expect(result).toHaveTextContent('05:00'); // 14:00 - 08:00 - 1h pause = 5h
    });
    it('does not update endTime when current time is before 12:00', () => {
        render(<App />);
    });
});
