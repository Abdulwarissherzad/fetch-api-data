import { apiLink } from "../api_link";
import { useEffect, useState } from "react";
import axios from "axios";

interface apiProps {
  name: string;
  date: string;
  countryCode: string;
  localName: string;
}

function UsHolidays() {
  const [apiData, setApiData] = useState<apiProps[]>();

  useEffect(() => {
    fetchDataApi();
  }, []);

  //   // *fectching the api data using async await.
  //   const fetchDataApi = async () => {
  //     try {
  //       const response = await fetch(apiLink); //Made a request to fetch data
  //       const data = await response.json(); // Store data in a data variable
  //       setApiData(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Somethink Went Wrong, Please try again.");
  //     }
  //   };

  //! fectching the api data using the Axios
  // const fetchDataApi = () => {
  //   axios
  //     .get(apiLink)
  //     .then((response) => {
  //       const fetchedData = response.data;
  //       setApiData(fetchedData);
  //     })
  //     .catch(() => {
  //       console.error("Something went wrong!");
  //     });
  // };
  // fetching the api data using the PROMISES
  const fetchDataApi = () => {
    fetch(apiLink)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No Response From the Server");
        }
        return response.json();
      })
      .then((fetchedData) => {
        setApiData(fetchedData);
      })
      .catch(() => {
        console.error("No data found");
      });
  };

  // !function to change date formate.
  function changeDateFormat(dateString: string | number | Date) {
    const option = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-Uk", option);
  }

  return (
    <>
      {apiData && apiData.length > 0 && (
        <h1 className=" d-flex align-items-center justify-content-center">
          Public Holidays {apiData[0].countryCode}
        </h1>
      )}
      <table className="table table-hover table-striped mx-2 my-2 p-3">
        <thead className="table-success">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Holiday Type</th>
            <th scope="col">Country Code</th>
            <th scope="col">Local Name</th>
          </tr>
        </thead>
        <tbody>
          {apiData &&
            apiData.map((info, index) => (
              <tr key={index}>
                <td>{changeDateFormat(info.date)}</td>
                <td>{info.name}</td>
                <td>{info.countryCode}</td>
                <td>{info.localName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default UsHolidays;
