import { render, screen } from '@testing-library/react';
import BookCard from '../BookCard';

describe('BookCard', () => {
  const mockProps = {
    title: 'Luxury Cars',
    count: 12,
  };

  it('renders the title correctly', () => {
    render(<BookCard {...mockProps} />);
    expect(screen.getByText(/Luxury Cars/i)).toBeInTheDocument();
  });

  it('renders the count correctly', () => {
    render(<BookCard {...mockProps} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('has correct structure and classes', () => {
    const { container } = render(<BookCard {...mockProps} />);
    expect(container.querySelector('.rent-item')).toBeTruthy();
    expect(container.querySelector('.carousel-card-body')).toBeFalsy();
  });
});