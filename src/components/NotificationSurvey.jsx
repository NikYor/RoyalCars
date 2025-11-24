import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const NotificationSurvey = () => {
  const { cars } = useSelector((state) => state.completed);
  const location = useLocation()

  return (
    <>
      {location.pathname === '/survey' ?
      <span className="notification-pill" style={{ paddingTop: '2px' }}>
        1
      </span>
      :
      <span className="notification-pill">
        {cars.length}
      </span>
      }
    </>
  )
}

export default NotificationSurvey;
