import React, { useEffect, useState } from "react";
import { NITH_BASE_API_URL, NITH_LAST_UPDATED_API } from "../const";
import Card from "../components/Card";
import "./home.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  let p = "";
  let _data = [];
  const fetchAllData = async () => {
    do {
      const url = NITH_BASE_API_URL + `student?limit=3000&sort_by_cgpi=true&next_cursor=${p}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      _data = _data.concat(parsedData.data);
      p = parsedData.pagination.next_cursor;
    } while (p != "");
    localStorage.setItem("stData", JSON.stringify(_data));
  };

  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState(studentData);
  const [pagination, setPagination] = useState("");
  const [branch, setBranch] = useState("");
  const [urlExt, setUrlExt] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [years, setYears] = useState([]);
  const [yearLoadind, setYearLoadind] = useState(false);
  const [ranking, setRanking] = useState({ college: true, class: false, year: false });
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
    setFilteredStudentData(dataObject.data);
  };
  useEffect(() => {
    fetchBranches();
    updateData("");
    fetchAllData();
    // eslint-disable-next-line
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
      setRanking({ college: true, class: false, year: false });
    } else {
      setUrlExt(`&branch=${e.target.value}`);
      setBranch(e.target.value);
      updateData(`&branch=${e.target.value}`);
      let x = branchList.filter((obj) => {
        return obj.name === e.target.value;
      });
      setYears(x[0].batches);
      setYearLoadind(true);
      setRanking({ college: true, class: false, year: false });
    }
  };
  const handleYearChange = (e) => {
    if (e.target.value === "") {
      updateData(`&branch=${branch}`);
      setRanking({ college: true, class: false, year: false });
    } else {
      updateData(`&branch=${branch}&roll=${e.target.value}%`);
      setRanking({ college: false, class: true, year: false });
    }
  };
  const handleSearch = (e) => {
    setFilteredStudentData(
      JSON.parse(localStorage.getItem("stData")).filter((obj) => {
        return JSON.stringify(obj).toLowerCase().includes(e.target.value.trim().toLowerCase());
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home">
      <header>
        <form onSubmit={handleSubmit}>
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
        {branch === "" ? (
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
      <InfiniteScroll dataLength={filteredStudentData.length} next={fetchMoreData} hasMore={pagination !== ""}>
        <div className="cards">
          {filteredStudentData.map((student, i) => {
            return <Card student={student} key={student.roll} count={i + 1} rank={ranking} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
