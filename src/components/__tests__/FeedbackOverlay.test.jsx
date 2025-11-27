import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer, { clearFeedback } from '../../store/feedbackSlice';
import FeedbackOverlay from '../FeedbackOverlay';

// mock store factory
const createMockStore = (initialState = { feedback: { error: null, message: null } }) =>
  configureStore({
    reducer: { feedback: feedbackReducer },
    preloadedState: initialState,
  });

describe('FeedbackOverlay', () => {
  it('renders message when provided', () => {
    const store = createMockStore({ feedback: { error: null, message: 'Success!' } });
    render(
      <Provider store={store}>
        <FeedbackOverlay />
      </Provider>
    );
    expect(screen.getByText(/Success!/i)).toBeInTheDocument();
  });

  it('renders error when provided', () => {
    const store = createMockStore({ feedback: { error: 'Something went wrong', message: null } });
    render(
      <Provider store={store}>
        <FeedbackOverlay />
      </Provider>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('dispatches clearFeedback after timers', () => {
    vi.useFakeTimers();
    const store = createMockStore({ feedback: { error: null, message: 'Timed message' } });
    const spy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <FeedbackOverlay />
      </Provider>
    );

    // advance timers: 3000ms for animateOut + 2500ms for cleanup
    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(spy).toHaveBeenCalledWith(clearFeedback());
    vi.useRealTimers();
  });

  it('returns null when no error or message', () => {
    const store = createMockStore({ feedback: { error: null, message: null } });
    const { container } = render(
      <Provider store={store}>
        <FeedbackOverlay />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });
});