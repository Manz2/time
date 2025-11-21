import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Time } from './Time';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});
jest.useFakeTimers();
afterAll(() => {
  jest.useRealTimers();
});

describe('Time component', () => {
  const testText = '12:34';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the provided text', () => {
    render(<Time>{testText}</Time>);
    expect(screen.getByTestId('total-time')).toHaveTextContent(testText);
    expect(screen.getByTestId('total-time')).toBeInTheDocument();
  });

  it('copies text to clipboard on click', async () => {
    render(<Time>{testText}</Time>);
    const button = screen.getByTestId('total-time');
    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);

    await waitFor(() =>
      expect(screen.getByTestId('copy-snackbar-message')).toBeInTheDocument()
    );
  });

  it('copies text on Enter key press', async () => {
    render(<Time>{testText}</Time>);
    const button = screen.getByTestId('total-time');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);

    await waitFor(() =>
      expect(screen.getByTestId('copy-snackbar-message')).toBeInTheDocument()
    );
  });

  it('copies text on Space key press', async () => {
    render(<Time>{testText}</Time>);
    const button = screen.getByTestId('total-time');
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);

    await waitFor(() =>
      expect(screen.getByTestId('copy-snackbar-message')).toBeInTheDocument()
    );
  });

  it('closes snackbar after timeout', async () => {
    render(<Time>12:34</Time>);
    const button = screen.getByTestId('total-time');
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByTestId('copy-snackbar-message')).toBeInTheDocument()
    );

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() =>
      expect(
        screen.queryByTestId('copy-snackbar-message')
      ).not.toBeInTheDocument()
    );
  });

  it('does not copy when children is falsy', () => {
    render(<Time>{''}</Time>);
    const button = screen.getByTestId('total-time');

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('does not copy on random key press', () => {
    render(<Time>{'12:34'}</Time>);
    const button = screen.getByTestId('total-time');

    fireEvent.keyDown(button, { key: 'Escape' });

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });
});
