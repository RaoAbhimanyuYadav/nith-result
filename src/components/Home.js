import React, { useEffect, useState } from "react";
import { NITH_BASE_API_URL, NITH_LAST_UPDATED_API } from "../const";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [pagination, setPagination] = useState("");
  const [branch, setBranch] = useState("");
  const [urlExt, setUrlExt] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [years, setYears] = useState([]);
  const [yearLoadind, setYearLoadind] = useState(false);
  const fetchBranches = async () => {
    const url = NITH_BASE_API_URL + "branches";
    let data = await fetch(url);
    let parsedData = await data.json();
    setBranchList(parsedData);
  };
  const updateData = async (url1) => {
    const url = NITH_BASE_API_URL + `student?limit=300&sort_by_cgpi=true${url1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    let dataObject = parsedData;
    setStudentData(dataObject.data);
    setPagination(dataObject.pagination.next_cursor);
  };
  useEffect(() => {
    fetchBranches();
    updateData(""); // eslint-disable-next-line
  }, []);
  const fetchMoreData = async () => {
    const url = NITH_BASE_API_URL + `student?limit=300&sort_by_cgpi=true${urlExt}&next_cursor=${pagination}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    let dataObject = parsedData;
    setStudentData(studentData.concat(parsedData.data));
    setPagination(dataObject.pagination.next_cursor);
  };
  const handleChangeBranch = (e) => {
    if (e.target.value === "") {
      setUrlExt(``);
      setBranch("");
      updateData(``);
    } else {
      setUrlExt(`&branch=${e.target.value}`);
      setBranch(e.target.value);
      updateData(`&branch=${e.target.value}`);
      let x = branchList.filter((obj) => {
        return obj.name === e.target.value;
      });
      setYears(x[0].batches);
      setYearLoadind(true);
      console.log(x[0].batches);
    }
  };
  const handleYearChange = (e) => {
    if (e.target.value === "") {
      updateData(`&branch=${branch}`);
    } else {
      updateData(`&branch=${branch}&roll=${e.target.value}%`);
    }
  };
  const handleSearch = (e) => {
    console.log(e.target.value.trim());
    console.log(
      studentData.filter((obj) => {
        return JSON.stringify(obj).toLowerCase().includes(e.target.value.trim().toLowerCase());
      })
    );
  };
  return (
    <div className="home">
      <header>
        <form>
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <button>Search</button>
        </form>
        <select onChange={handleChangeBranch}>
          <option value="">Filter by Branch</option>
          <option value="CIVIL">Civil</option>
          <option value="ELECTRICAL">Electrical</option>
          <option value="MECHANICAL">Mechanical</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="ARCHITECTURE">Architecture</option>
          <option value="CHEMICAL">Chemical</option>
          <option value="MATERIAL">Material</option>
          <option value="ECE_DUAL">ECE Dual</option>
          <option value="CSE_DUAL">CSE Dual</option>
          <option value="ENG_PHYSICS">Eng. Physics</option>
          <option value="MAC">MAC</option>
        </select>
        {branch == "" ? (
          false
        ) : (
          <select onChange={handleYearChange}>
            <option value="">ALL</option>
            {yearLoadind &&
              years?.map((arr) => {
                console.log(arr);
                return <option value={arr % 100}>{arr}</option>;
              })}
          </select>
        )}
      </header>
      <InfiniteScroll dataLength={studentData.length} next={fetchMoreData} hasMore={pagination !== ""}>
        <div className="cards">
          {studentData
            .sort((a, b) => a.rank.college.cgpi - b.rank.college.cgpi)
            .map((student, i) => {
              return <Card student={student} key={student.roll} count={i + 1} />;
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
