import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="container py-5" style={{ alignContent: 'center' }}>
      <h2 className="text-center text-danger">Access Denied</h2>
      <p className="text-center">You do not have permission to view this page.</p>
      <button className="btn btn-outline-warning rounded-pill" onClick={() =>navigate(-1)}>Go Back</button>
    </div>
  )
};

export default Unauthorized;
