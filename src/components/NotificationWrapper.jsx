import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const NotificationWrapper = () => {
  const { actionCount } = useSelector((state) => state.feedback);
  const { cars } = useSelector((state) => state.completed);
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation()
  const [notifications, setNotifications] = useState(0)

  useEffect(() => {
    if (isAdmin) {
      if (location.pathname === '/users/manage') {
        setNotifications(cars.length)
      } else if (location.pathname === '/survey') {
        setNotifications(actionCount)
      } else {
        setNotifications(actionCount + cars.length)
      }
    } else {
      setNotifications(cars.length)
    }
  }, [isAdmin, actionCount, cars, location.pathname])

  return (
    <>
      {(notifications > 0 && <span className="notification-pill">
        {notifications}
      </span>
      )}
    </>
  )
}

export default NotificationWrapper;