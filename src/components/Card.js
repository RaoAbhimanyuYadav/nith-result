import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ student }) => {
  return (
    <Link to={"detail/" + student.roll}>
      <div className="card">
        <div className="clg-rank">#_{student.rank.college.cgpi}</div>
        <div className="name">{student.name}</div>
        <div className="roll-no">
          {student.roll} <span className="branch">{student.branch}</span>
        </div>
        <div className="cgpi">
          <span className="sgpi">{student.sgpi}</span>
          {student.cgpi}
        </div>
      </div>
    </Link>
  );
};

export default Card;
