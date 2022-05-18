import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import arrowBack from "../../assets/icons/elements/arrow-back.svg";

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      404
      <div className="btnBack">
        <Link to="/">
          {" "}
          <img alt="icon arrow back" src={arrowBack} /> Voltar
        </Link>
      </div>
    </div>
  );
};
