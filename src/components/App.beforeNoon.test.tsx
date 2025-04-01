jest.mock('dayjs', () => {
    const original = jest.requireActual('dayjs');
    const mockNow = original('2025-04-01T06:00:00'); // Vor 12 Uhr
    const mockDayjs = (...args: any[]) =>
        args.length === 0 ? mockNow.clone() : original(...args);
    Object.assign(mockDayjs, original);
    mockDayjs.default = mockDayjs;
    return mockDayjs;
});

import { render } from '@testing-library/react';
import App from './App';

test('does not call setEndTime when time is before 12', () => {
    render(<App />);
});
