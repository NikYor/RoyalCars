import {useState} from "react";

const About = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/about.jpg"
            alt="About Royal Car"
            className="img-fluid rounded shadow"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        <div className="col-md-6" style={{height: '83vh', fontSize: '4rem'}}>
          <h1 className="mb-4" >About Royal Car</h1>
          <p className="lead" style={{fontWeight: 'bold', fontSize: '1.5rem'}}>
              Royal Car is a modern platform for car booking and route simulation.
              Our mission is to make mobility smarter, safer, and more
              user‑friendly.
          </p>

          <h2 className="mt-4">What We Offer</h2>
          <ul className="list-unstyled" style={{fontWeight: 'bold', fontSize: '1.5rem'}}>
            <li>🚗 Easy car booking</li>
            <li>📍 Real‑time route simulation</li>
            <li>🔒 Secure authentication and role management</li>
            <li>⚡ Fast and intuitive interface</li>
          </ul>

          <h2 className="mt-4">Our Story</h2>
          <p style={{fontWeight: 'bold', fontSize: '1.5rem'}}>
            Developed by{" "}
            <span
              onClick={() => setOpen(true)}
              style={{ cursor: "pointer", fontWeight: "bold", color: "#007bff", fontSize: '1.5rem' }}
            >
              Nikolay Yordanov
            </span>
            , driven by passion for user‑centric design and robust web apps.
            Royal Car combines cutting‑edge technologies like React, Redux,
            WebSocket, and Google Maps API to deliver a seamless experience.
          </p>
        </div>
      </div>
      {open && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Information</h5>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> Nikolay Yordanov</p>
                <p><strong>Email:</strong> nik_b_yordanov@example.com</p>
                <p><strong>Phone:</strong> +359 888 123 456</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
