import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NotificationBanner = () => {
  const { actionCount } = useSelector(state => state.feedback);
  const location = useLocation()
  const { isAdmin } = useContext(AuthContext)
  
  return (
    <>
      {isAdmin ? (location.pathname === '/users/manage' ?
        <span className="notification-pill" style={{ paddingTop: '2px' }}>
          1
        </span>
        :
        (
          <span className="notification-pill">
            {actionCount}
          </span>
        )
      ) : null}
    </>
  )
}

export default NotificationBanner;
