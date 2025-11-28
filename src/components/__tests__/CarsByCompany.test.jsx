import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarsByCompany from '../CarsByCompany';

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CarsByCompany', () => {
  const mockCars = [
    { _id: '1', name: 'BMW M5', image: '/bmw.jpg', transmission: 'Auto', mileage: '10,000 km', price: 200 },
    { _id: '2', name: 'Audi RS6', image: '/audi.jpg', transmission: 'Manual', mileage: '20,000 km', price: 180 },
  ];
  const mockOnClose = vi.fn();

  const setup = () =>
    render(
      <MemoryRouter>
        <CarsByCompany cars={mockCars} onClose={mockOnClose} />
      </MemoryRouter>
    );

  it('renders company name and cars', () => {
    setup();
    expect(screen.getByText(/BMW M5/i)).toBeInTheDocument();
    expect(screen.getByText(/Audi RS6/i)).toBeInTheDocument();
  });

  it('navigates to booking when Reserve Now is clicked', () => {
    setup();
    fireEvent.click(screen.getAllByRole('button', { name: /Reserve Now/i })[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/booking/1/BMW M5');
  });
});