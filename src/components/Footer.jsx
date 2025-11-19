import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light">
      <div className="container text-center p-0">
        <p className="mb-2 mt-2">
          &copy; 
          {new Date().getFullYear()} 
          <strong 
            className="text-primary" 
            onClick={() => navigate("/")} 
            style={{ cursor: "pointer" }}
          >Royal Cars
          </strong>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
