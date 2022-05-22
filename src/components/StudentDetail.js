import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NITH_BASE_API_URL } from "../const";

const StudentDetail = () => {
  const { id } = useParams();
  const [semResults, setSemResults] = useState([]);
  const [details, setDetails] = useState({});
  const [isDataArrived, setIsDataArrived] = useState(false);

  const fetchDetail = async () => {
    const url = NITH_BASE_API_URL + `student/${id}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setDetails(parsedData);
    setSemResults(parsedData?.summary?.map((sem, i) => parsedData?.result?.filter((res) => res.sem === i + 1)));
    setIsDataArrived(true);
  };
  useEffect(() => {
    fetchDetail(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      {console.log("sem reults", semResults)}
      {isDataArrived &&
        semResults?.map((sem, i) => {
          return (
            <div className="sem" key={i + 1}>
              <h3>Sem {i + 1}</h3>
              <div className="subjects">
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
                        <span className="sub-grade"></span>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default StudentDetail;
