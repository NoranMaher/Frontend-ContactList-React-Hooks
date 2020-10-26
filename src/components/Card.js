import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, email, phone, userId } = props;
  return (
    <div className="cardWrapper">
      <Link className="card" to={`/${userId}`}>
        <h5 className="card-header">{name}</h5>
        <div className="card-body">
          <h5 className="card-title">{email}</h5>
          <h5 className="card-title">{phone}</h5>
        </div>
      </Link>
    </div>
  );
};

export default Card;
