import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LineChart from "./Line";

const StudentDashboard = () => {
  const [users, setUsers] = useState([]); // Array of user objects
  const [activeSearch, setActiveSearch] = useState([]); // Holds filtered search results
  const [nameValue, setNameValue] = useState(""); // Manages the value of the input field
  const [activeCohortSearch, setActiveCohortSearch] = useState([]);
  const [cohortValue, setCohortValue] = useState("");
  // const [verdict, setVerdict] = useState(false);
  const [returnedUser, setReturnedUser] = useState([
    {
      Attendance: 0,
      "Quiz Submitted": 0,
      total: 0,
      Cohort: "",
    },
  ]);

  const notify = () => toast.error("Student not found");

  useEffect(() => {
    const pullData = async () => {
      await axios
        .get("http://localhost:9000/api/students")
        .then((response) => {
          console.log(response.data);
          setUsers([...response.data]); // Assume response.data is an array of objects
        })
        .catch((error) => {
          console.error(error);
        });
    };
    pullData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setNameValue(value); // Update the input value immediately with each keystroke

    if (value === "") {
      setActiveSearch([]); // Clear search if input is empty
      return;
    }

    // Filter the users array based on the `name` key in each object
    const filtered = users.filter((user) =>
      user.Student.toLowerCase().includes(value.toLowerCase())
    );

    setActiveSearch(filtered); // Update activeSearch with the filtered results
  };

  const handleClick = (selectedName) => {
    setNameValue(selectedName); // Set input field value to the selected name
    setActiveSearch([]); // Hide the search results once a selection is made
  };

  const handleCohortSearch = (e) => {
    const value = e.target.value;
    setCohortValue(value); // Update the cohort input value immediately

    if (value === "") {
      setActiveCohortSearch([]); // Clear search if input is empty
      return;
    }

    // Filter the users array based on the `cohort` key in each object
    // const filteredCohort = users.filter((user) =>
    //   user.Cohort.toLowerCase().includes(value.toLowerCase())
    // );

    const filteredCohort = users
      .filter((user) => user.Cohort.toLowerCase().includes(value.toLowerCase()))
      .reduce((acc, current) => {
        const x = acc.find((item) => item.Cohort === current.Cohort);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

    setActiveCohortSearch(filteredCohort); // Update activeCohortSearch with the filtered results
  };

  const handleCohortClick = (selectedCohort) => {
    setCohortValue(selectedCohort); // Set cohort input field value to the selected cohort
    setActiveCohortSearch([]); // Hide the search results once a selection is made
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both nameValue and cohortValue have been selected
    if (!nameValue || !cohortValue) {
      alert("Please select both a student and a cohort.");
      return;
    }

    // Set the search criteria
    const dataToSend = {
      Student: nameValue,
      Cohort: cohortValue,
    };

    // Function to find matching objects
    const findMatchingObject = (data, criteria) => {
      return data.filter((item) =>
        Object.keys(criteria).every((key) => item[key] === criteria[key])
      );
    };

    try {
      const matchedUsers = findMatchingObject(users, dataToSend);

      if (matchedUsers.length > 0) {
        setReturnedUser(
          matchedUsers.map((usr, index) => {
            return { ...usr, total: users.length };
          })
        );

        //return setVerdict(true);
      } else {
        notify();
        setReturnedUser([
          {
            Attendance: 0,
            "Quiz Submitted": 0,
            total: 0,
            Cohort: " ",
          },
        ]);
      }

      // Clear form fields
      // setNameValue("");
      // setCohortValue("");
    } catch (error) {
      console.error("Error during search:", error);
      alert("An error occurred while searching.");
    }
  };
  console.log("This is the returned User", returnedUser);

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto bg-[#F3F3F3] pb-8 mb-8">
        <h1 className="text-center font-bold text-3xl pt-8">
          Student Dashboard
        </h1>
        <form className="flex justify-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Select/search a student"
              value={nameValue} // Bind input value to state
              className="px-32 py-2 my-4"
              onChange={handleSearch} // Trigger search on input change
            />
          </div>

          {activeSearch.length > 0 && (
            <div className="absolute p-4 bg-slate-800 -translate-x-1/2 px-12 top-16 rounded-lg text-white w-1/3 flex flex-col gap-2">
              {activeSearch.map((user, index) => (
                <span key={index} onClick={() => handleClick(user.Student)}>
                  {user.Student}
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            {/* Second input field for searching cohort */}
            <input
              type="text"
              placeholder="Select/search a cohort"
              value={cohortValue} // Bind cohort input value to state
              className="px-32 py-2 my-4"
              onChange={handleCohortSearch} // Trigger cohort search on input change
            />
            {activeCohortSearch.length > 0 && (
              <div className="absolute p-4 bg-slate-800 -translate-x-1/5 top-16 rounded-lg text-white w-2/3 flex flex-col gap-2">
                {activeCohortSearch.map((user, index) => (
                  <span
                    key={index}
                    onClick={() => handleCohortClick(user.Cohort)}
                  >
                    {user.Cohort}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            className="bg-blue-600 px-4 py-2  my-4 border mr-4 rounded-md text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
        </form>
        <hr className="h-px mx-12 bg-gray-200 border-0" />
        <div className="grid grid-cols-3 gap-4 p-4 mx-8">
          <div className="grid-col-1 block bg-white border border-gray-200 rounded-lg shadow py-8">
            <h5 className="text-sm text-center">attendance_average(avg)</h5>
            <h2 className="text-2xl text-center">
              {returnedUser.map((user, index) => (
                <div key={index}>{user.Attendance}</div>
              ))}
            </h2>
            <ToastContainer />
          </div>
          <div className="grid-col-2 block bg-white border border-gray-200 rounded-lg shadow py-8">
            <h5 className="text-sm text-center">assignment_completion(avg)</h5>
            <h2 className="text-2xl text-center">
              {returnedUser.map((user, index) => (
                <div key={index}>{user["Quiz Submitted"]}</div>
              ))}
            </h2>
          </div>
          <div className="grid-col-3 block bg-white border border-gray-200 rounded-lg shadow py-8">
            <h5 className="text-sm text-center">total_students</h5>
            <h2 className="text-2xl text-center">
              {" "}
              {returnedUser.map((user, index) => (
                <div key={index}>{user.total}</div>
              ))}
            </h2>
          </div>
        </div>
        <hr className="h-px mx-12 my-8 bg-gray-200 border-0" />
        <div className="block bg-white border border-gray-200 rounded-sm shadow mx-12">
          <h2 className="bg-purple-500 text-center font-bold p-5">
            Cohort Performance over time
          </h2>
          <hr className="h-px my-8 bg-gray-200 border-0" />
          {/* <div className="flex items-center justify-center border-2 text-gray-200 text-4xl border-dashed border-blue  m-8 h-[300px]">
            Graph happens here.
          </div>
          <h5 className="text-center text-blue-700 mb-2">attendanceAverage</h5> */}
          <LineChart cohort={returnedUser[0].Cohort} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
