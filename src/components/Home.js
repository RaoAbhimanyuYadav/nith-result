import React, { useEffect, useState } from "react";
import { NITH_BASE_API_URL } from "../const";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [pagination, setPagination] = useState("");
  const updateData = async () => {
    const url = NITH_BASE_API_URL + "student?limit=300&sort_by_cgpi=true";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    let dataObject = parsedData;

    setStudentData(dataObject.data);
    setPagination(dataObject.pagination.next_cursor);
  };
  useEffect(() => {
    updateData(); // eslint-disable-next-line
  }, []);
  const fetchMoreData = async () => {
    const url = NITH_BASE_API_URL + `student?limit=300&next_cursor=${pagination}&sort_by_cgpi=true`;
    let data = await fetch(url);
    let parsedData = await data.json();
    let dataObject = parsedData;
    setStudentData(studentData.concat(parsedData.data));
    setPagination(dataObject.pagination.next_cursor);
  };
  return (
    <div className="home">
      <InfiniteScroll dataLength={studentData.length} next={fetchMoreData} hasMore={pagination !== ""}>
        {studentData
          .sort((a, b) => a.rank.college.cgpi - b.rank.college.cgpi)
          .map((student) => {
            return <Card student={student} key={student.roll} />;
          })}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
