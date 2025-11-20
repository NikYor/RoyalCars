import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const NotificationBanner = () => {
  const { actionCount } = useSelector(state => state.feedback);
  const location = useLocation()  
  return (
    <>
    {location.pathname === '/users/manage' ? 
      <span className="notification-pill" style={{paddingTop: '2px'}}>
      1
      </span>
    :
    (
      <span className="notification-pill">
        {actionCount}
      </span>
    )
  }
    </>
  )
}

export default NotificationBanner;
