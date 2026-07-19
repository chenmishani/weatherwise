import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../../components/EmptyState';

describe('EmptyState', () => {
  it('renders title, message, and icon', () => {
    render(
      <EmptyState
        icon="🔍"
        title="No Results"
        message="No locations found matching search."
      />
    );

    expect(screen.getByText('No Results')).toBeInTheDocument();
    expect(
      screen.getByText('No locations found matching search.')
    ).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});
