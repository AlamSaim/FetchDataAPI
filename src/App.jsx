// import "./App.css";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        // await new Promise((resolve) => setTimeout(resolve, 1000));  //this is to delay the ui and show loader
        const response = await fetch("https://dummyjson.com/users?limit=100");
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  // console.log("FilterText", filterText);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.phone}`
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const usersPerPage = 10;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.max(prev + 1, 1));
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #f3f3f3",
              borderTop: "5px solid #4caf50",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
          </style>
        </div>
      ) : (
        <>
          {error && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "10px",
                marginBottom: "20px",
                border: "1px solid #f5c6cb",
                borderRadius: "5px",
              }}
            >
              Oops! Something went wrong while fetching data.
            </div>
          )}

          <div>
            <h1
              style={{
                width: "100",
                fontFamily: "sans-serif",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#4caf50",
                color: "#f5f5f5",
              }}
            >
              DATABASE
            </h1>
            <div style={{ padding: "20px" }}>
              <input
                type="text"
                placeholder="Search users..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{
                  width: "500px",
                  padding: "10px",
                  border: "2px solid #4caf50",
                  borderRadius: "20px",
                  fontSize: "14px",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Phone
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Password
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {user.id}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {user.firstName + " " + user.lastName}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {user.email}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {user.phone}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {user.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                margin: "5px",
                padding: "8px 12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #4caf50",
                backgroundColor: currentPage === 1 ? "#ccc" : "white",
                color: currentPage === 1 ? "white" : "#4caf50",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
            >
              Prev
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                style={{
                  margin: "5px",
                  padding: "8px 12px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #4caf50",
                  backgroundColor: currentPage === number ? "#4caf50" : "white",
                  color: currentPage === number ? "white" : "#4caf50",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                {number}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                margin: "5px",
                padding: "8px 12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #4caf50",
                backgroundColor: currentPage === totalPages ? "#ccc" : "white",
                color: currentPage === totalPages ? "white" : "#4caf50",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                transition: "0.3s",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
