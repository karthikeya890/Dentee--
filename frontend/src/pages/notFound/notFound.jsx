import notFound from "../../images/not-found.jpg";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img width={500} src={notFound} alt="not-found" />
        <Link to="/">
          <button className="btn btn-primary">Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
