import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ student, count, rank }) => {
  return (
    <div className="card">
      <Link to={"detail/" + student.roll} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
        {rank.college && <div className="clg-rank">#_{student.rank.college.cgpi}</div>}
        {rank.class && <div className="clg-rank">#_{student.rank.class.cgpi}</div>}

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
