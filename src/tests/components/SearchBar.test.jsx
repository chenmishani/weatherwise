import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar keyboard & interaction tests', () => {
  it('renders input with value and fires onChange', () => {
    const handleChange = vi.fn();
    render(
      <SearchBar
        query="London"
        onChange={handleChange}
        onClear={() => {}}
        onKeyDown={() => {}}
        isLoading={false}
      />
    );

    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('London');

    fireEvent.change(input, { target: { value: 'Paris' } });
    expect(handleChange).toHaveBeenCalledWith('Paris');
  });

  it('renders clear button when query is non-empty and fires onClear', () => {
    const handleClear = vi.fn();
    render(
      <SearchBar
        query="Tokyo"
        onChange={() => {}}
        onClear={handleClear}
        onKeyDown={() => {}}
        isLoading={false}
      />
    );

    const clearBtn = screen.getByRole('button', { name: 'Clear search input' });
    fireEvent.click(clearBtn);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation keys (ArrowDown, ArrowUp, Enter, Escape)', () => {
    const handleKeyDown = vi.fn();
    render(
      <SearchBar
        query="Berlin"
        onChange={() => {}}
        onClear={() => {}}
        onKeyDown={handleKeyDown}
        isLoading={false}
      />
    );

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(handleKeyDown).toHaveBeenCalledTimes(4);
  });
});
