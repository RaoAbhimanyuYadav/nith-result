import React, { useEffect, useState } from "react";
import { NITH_BASE_API_URL } from "../const";
import Card from "../components/Card";
import "./home.css";
import Spinner from "./Spinner";

const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [years, setYears] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [isBranchSelected, setISBranchSelected] = useState(false);
  const [isYearSelected, setIsYearSelected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let p = "";
  let _data = [];
  const fetchAllData = async () => {
    if (localStorage.getItem("stData")) {
      _data = JSON.parse(localStorage.getItem("stData"));
    } else {
      do {
        const url = NITH_BASE_API_URL + `student?limit=1000&sort_by_cgpi=true&next_cursor=${p}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        _data = _data.concat(parsedData.data);
        p = parsedData.pagination.next_cursor;
      } while (p !== "");
      localStorage.setItem("stData", JSON.stringify(_data));
    }
    setStudentData(_data);
    setFilteredStudentData(_data);
    setIsLoading(false);
  };

  const fetchBranches = async () => {
    const url = NITH_BASE_API_URL + "branches";
    let data = await fetch(url);
    let parsedData = await data.json();
    setBranchList(parsedData);
  };

  useEffect(() => {
    fetchAllData();
    fetchBranches(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (branch === "") {
      if (isSearching) {
        setFilteredStudentData(
          studentData.filter((obj) => {
            return JSON.stringify(obj).toLowerCase().includes(inputValue);
          })
        );
      } else {
        setFilteredStudentData(studentData);
      }
      setBranch("");
      setISBranchSelected(false);
    } else {
      setISBranchSelected(true);

      let arr = studentData.filter((obj) => {
        return obj.branch === branch;
      });
      if (isYearSelected) {
        arr = arr.filter((obj) => {
          return obj.roll.slice(0, 2) === year;
        });
      }
      if (isSearching) {
        arr = arr.filter((obj) => {
          return JSON.stringify(obj).toLowerCase().includes(inputValue);
        });
      }
      setFilteredStudentData(arr);
      let x = branchList.filter((obj) => {
        return obj.name === branch;
      });
      setYears(x[0].batches);
    } // eslint-disable-next-line
  }, [branch]);

  useEffect(() => {
    if (year === "") {
      setIsYearSelected(false);
      let arr = studentData.filter((obj) => {
        return obj.branch === branch;
      });
      if (isSearching) {
        arr = arr.filter((obj) => {
          return JSON.stringify(obj).toLowerCase().includes(inputValue);
        });
      }
      setFilteredStudentData(arr);
    } else {
      setIsYearSelected(true);

      let arr = studentData.filter((obj) => obj.roll.slice(0, 2) === year && obj.branch === branch);
      if (isSearching) {
        arr = arr.filter((obj) => {
          return JSON.stringify(obj).toLowerCase().includes(inputValue);
        });
      }
      setFilteredStudentData(arr);
    } // eslint-disable-next-line
  }, [year]);

  useEffect(() => {
    if (inputValue === "") {
      setIsSearching(false);
      if (isBranchSelected) {
        let arr = studentData.filter((obj) => {
          return obj.branch === branch;
        });
        if (isYearSelected) {
          arr = arr.filter((obj) => {
            return obj.roll.slice(0, 2) === year;
          });
        }
        setFilteredStudentData(arr);
      }
    } else {
      setIsSearching(true);
      if (isBranchSelected) {
        let arr = studentData.filter((obj) => {
          return obj.branch === branch;
        });
        if (isYearSelected) {
          arr = arr.filter((obj) => {
            return obj.roll.slice(0, 2) === year;
          });
        }
        arr = arr.filter((obj) => {
          return JSON.stringify(obj).toLowerCase().includes(inputValue);
        });
        setFilteredStudentData(arr);
      } else {
        setFilteredStudentData(
          studentData.filter((obj) => {
            return JSON.stringify(obj).toLowerCase().includes(inputValue);
          })
        );
      }
    } // eslint-disable-next-line
  }, [inputValue]);
  return (
    <div className="home">
      <header>
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.toLowerCase());
          }}
        />

        <select
          onChange={(e) => {
            setBranch(e.target.value);
          }}
        >
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
          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <option value="">ALL</option>
            {isBranchSelected &&
              years?.map((arr) => {
                return <option value={arr % 100}>{arr}</option>;
              })}
          </select>
        )}
      </header>
      {isLoading && <Spinner />}
      <div className="cards">
        {filteredStudentData.map((student, i) => {
          return <Card student={student} key={i + 1} count={i + 1} s={isSearching} />;
        })}
      </div>
    </div>
  );
};

export default Home;
