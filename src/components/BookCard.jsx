const BookCard = ({ title, count }) => {

  return (
    <div className="col-lg-4 col-md-6 mb-2">
      <div className="rent-item mb-4 rounded-lg">
        <div>
          <h4 className="text-uppercase mb-4">{title}</h4>
          <div className="d-flex justify-content-center mb-4">
            <div className="px-2">
              <h2>{count}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
