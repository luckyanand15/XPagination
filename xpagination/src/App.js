import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentData, setCurrentData] = useState([]);
  const [totaPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setEmployeeData(resp.data);
      } catch (err) {
        alert("failed to fetch data");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    setCurrentData([...employeeData].slice(firstIndex, lastIndex));
    setTotalPages(Math.ceil(employeeData.length / dataPerPage));
  }, [currentPage, employeeData]);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div className="container">
        {employeeData.length > 0 && (
          <table>
            <thead>
              <tr className="table-heading">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totaPages={totaPages}
      />
    </div>
  );
}

export default App;
