import React from "react";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";

const FloatingBtn = () => {
  return (
    <Link className="floatingBtn" to="/add">
      <GrAdd className="addIcon" />
    </Link>
  );
};
export default FloatingBtn;
