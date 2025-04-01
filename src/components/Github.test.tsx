import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GitHub } from './Github.tsx';

describe('GitHub component', () => {
    it('shows tooltip on hover', async () => {
        render(<GitHub />);
        const image = screen.getByAltText('GitHub');

        await userEvent.hover(image);

        expect(await screen.findByText('GitHub Repository')).toBeInTheDocument();
    });

    it('renders link with correct attributes', () => {
        render(<GitHub />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://github.com/Manz2/time');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders GitHub image with correct attributes', () => {
        render(<GitHub />);
        const img = screen.getByAltText('GitHub');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/github.png');
    });
});
