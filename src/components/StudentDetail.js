import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NITH_BASE_API_URL } from "../const";
import "./studentDetail.css";
const StudentDetail = () => {
  const { id } = useParams();
  const [semResults, setSemResults] = useState([]);
  const [details, setDetails] = useState({});
  const [summary, setSummary] = useState([]);
  const [isDataArrived, setIsDataArrived] = useState(false);

  const fetchDetail = async () => {
    const url = NITH_BASE_API_URL + `student/${id}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setDetails(parsedData);
    setSummary(parsedData.summary);
    setSemResults(parsedData?.summary?.map((sem, i) => parsedData?.result?.filter((res) => res.sem === i + 1)));
    setIsDataArrived(true);
  };
  useEffect(() => {
    fetchDetail(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="header">
        {console.log(details)}
        {isDataArrived && (
          <>
            <div className="personal">
              {details.name}
              <div>
                <div className="roll">{details.roll}</div>
                <div className="branch">{details.branch}</div>
              </div>
            </div>
            <div className="rank">
              <div className="wrank">College Rank:{details.rank.college.cgpi}</div>
              <div className="yrank">Year Rank:{details.rank.year.cgpi}</div>
              <div className="crank">Class Rank:{details.rank.class.cgpi}</div>
            </div>
          </>
        )}
      </div>
      <div className="sem">
        {isDataArrived &&
          semResults?.map((sem, i) => {
            return (
              <div className="semester" key={i + 1}>
                <h3>Sem {i + 1}</h3>
                <div className="subjects">
                  <div className="subject-default">
                    <span className="sub-name">SUBJECT NAME</span>
                    <span className="sub-code">SUB-CODE</span>
                    <span className="sub-credit">
                      <p>CRE</p>DIT
                    </span>
                    <span className="sub-score">
                      <p>SCO</p>RE
                    </span>
                    <span className="sub-gp">GP</span>
                    <span className="sub-grade">
                      <p>GRA</p>DE
                    </span>
                  </div>
                  {sem
                    .sort((a, b) => b.sub_point - a.sub_point)
                    .map((sub) => {
                      return (
                        <div className="subject" key={sub.subject}>
                          <span className="sub-name">{sub.subject}</span>
                          <span className="sub-code">{sub.subject_code}</span>
                          <span className="sub-credit">{sub.sub_point}</span>
                          <span className="sub-score">{sub.sub_gp / sub.sub_point}</span>
                          <span className="sub-gp">{sub.sub_gp}</span>
                          <span className="sub-grade">{sub.grade}</span>
                        </div>
                      );
                    })}

                  <div className="sg-cgpi subject">
                    <span>SGPI : {summary[i].sgpi} </span>
                    <span>CGPI : {summary[i].cgpi} </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StudentDetail;
