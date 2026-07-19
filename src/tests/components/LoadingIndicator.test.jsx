import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../components/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders loading message with accessible role="status"', () => {
    render(<LoadingIndicator message="Fetching weather..." size="medium" />);

    const statusEl = screen.getByRole('status');
    expect(statusEl).toBeInTheDocument();
    expect(statusEl).toHaveTextContent('Fetching weather...');
  });
});
