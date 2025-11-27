import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../FormInput';

describe('FormInput', () => {
  it('renders label in uppercase', () => {
    render(<FormInput label="Name" name="name" value="" onChange={() => {}} />);
    expect(screen.getByText(/NAME/i)).toBeInTheDocument();
  });

  it('renders input when label is not Status', () => {
    render(<FormInput label="Model" name="model" value="BMW" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('BMW');
  });

  it('renders select when label is Status', () => {
    render(<FormInput label="Status" name="status" value="in use" onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('in use');
    expect(screen.getByText(/free/i)).toBeInTheDocument();
    expect(screen.getByText(/in use/i)).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<FormInput label="Model" name="model" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Audi' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onChange when select changes', () => {
    const handleChange = vi.fn();
    render(<FormInput label="Status" name="status" value="free" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'in use' } });
    expect(handleChange).toHaveBeenCalled();
  });
});