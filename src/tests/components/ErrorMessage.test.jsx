import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message banner with accessible role="alert"', () => {
    render(<ErrorMessage message="Failed to load location" type="search" />);

    const alertEl = screen.getByRole('alert');
    expect(alertEl).toBeInTheDocument();
    expect(alertEl).toHaveTextContent('Failed to load location');
    expect(alertEl).toHaveClass('error-banner-search');
  });
});
