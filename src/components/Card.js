import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ student, count }) => {
  return (
    <div className="card">
      <Link to={"detail/" + student.roll} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
        <div className="clg-rank">#_{count}</div>
        <div className="name">{student.name}</div>
        <div className="roll-no">
          {student.roll} <span className="branch">{student.branch}</span>
        </div>
        <div className="cgpi">
          <span className="sgpi">{student.sgpi}</span>
          {student.cgpi}
        </div>
      </Link>
    </div>
  );
};

export default Card;
