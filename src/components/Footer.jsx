const Footer = () => {
  return (
    <footer className="bg-dark text-light pb-4">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} <strong className="text-primary">Royal Cars</strong>. All Rights Reserved.
        </p>
        <div className="d-flex justify-content-center">
          <a className="text-light px-2" href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="text-light px-2" href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="text-light px-2" href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="text-light px-2" href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="text-light px-2" href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
