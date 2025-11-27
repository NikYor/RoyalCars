// src/components/__tests__/CarCard.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarCard from '../CarCard';
import { AuthContext } from '../../context/AuthContext';

describe('CarCard', () => {
  const mockProps = {
    id: 'abc123',
    image: '/car.jpg',
    title: 'Audi RS6',
    year: 2022,
    transmission: 'Automatic',
    mileage: '15,000 km',
    price: 180,
  };

  const renderWithAuth = (user) => {
    return render(
      <AuthContext.Provider value={{ user }}>
        <MemoryRouter>
          <CarCard {...mockProps} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('renders car details correctly', () => {
    renderWithAuth(null);
    expect(screen.getByText(/Audi RS6/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/)).toBeInTheDocument();
    expect(screen.getByText(/Automatic/)).toBeInTheDocument();
    expect(screen.getByText(/15,000 km/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Details/i })).toBeInTheDocument();
  });

  it('shows booking button only when logged in', () => {
    renderWithAuth({ email: 'user@example.com' });
    expect(screen.getByRole('link', { name: /\$180\/Day – Book Now/i })).toBeInTheDocument();
  });

  it('hides booking button when not logged in', () => {
    renderWithAuth(null);
    expect(screen.queryByText(/\$180\/Day – Book Now/i)).not.toBeInTheDocument();
  });
});