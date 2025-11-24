import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFeedback } from '../store/feedbackSlice';

const FeedbackOverlay = () => {
  const { error, message } = useSelector(state => state.feedback);
  const dispatch = useDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    let showTimer, hideTimer, cleanupTimer;

    if (error || message) {
      setShouldRender(true);
      setAnimateOut(false);

      showTimer = setTimeout(() => {
        setAnimateOut(true); 
        
        cleanupTimer = setTimeout(() => {
          dispatch(clearFeedback());
          setShouldRender(false);
        }, 2500);
      }, 3000);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [error, message, dispatch]);

  if (!shouldRender) return null;

  return (
    <div
      className={`container py-2 error-message ${animateOut ? 'animate' : ''}`}
      transition-style={animateOut ? 'out:diamond:hesitate' : undefined}
    >
      {message && <div className="message-container">{message}</div>}
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};

export default FeedbackOverlay;
