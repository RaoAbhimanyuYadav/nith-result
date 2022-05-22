import { useEffect, useState } from "react";
import Fetch from "./Fetch";

const useData = () => {
  const data = JSON.parse(localStorage.getItem("countryData"));
  // eslint-disable-next-line
  const [first, setFirst] = useState(null);
  useEffect(() => {
    if (!data) {
      Fetch()
        .then((res) => {
          localStorage.setItem("countryData", JSON.stringify(res));
          setFirst("done");
        })
        .catch((err) => console.log(err));
    }
  }, [data]);
  return data || [];
};

export default useData;
