import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ student, count }) => {
  return (
    <div className="card">
      <Link to={"detail/" + student.roll} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
        <div className="clg-rank">#_{count}</div>
        <div className="name">{student.name}</div>
        <div className="roll-no">{student.roll} </div>
        <div className="branch">{student.branch}</div>
        <div className="cgpi">CGPI: {student.cgpi}</div>
        <div className="sgpi">SGPI: {student.sgpi}</div>
      </Link>
    </div>
  );
};

export default Card;
