import { useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "./Loading";

const ConfigPage = () => {
  //const [result, setResult] = useState("");
  //const [checkAlert, setCheckAlert] = useState(false);
  const [inputs, setInputs] = useState({});
  const [submitVal, setSubmitVal] = useState(false);

  // const handleSubmit = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/health-check/", null)
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         console.log(response.data);
  //         setResult(response.data.message); // Assume response.data is an array of objects
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const showAlert = async (type, message, route) => {
    await Swal.fire({ icon: type, text: message, confirmButtonColor: "Blue" });
  };

  const fulfillCheck = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/health-check",
        {}
      );
      console.log("THIS IS RESPONSE....", response);

      if (response.statusText === "OK") {
        showAlert("success", response.data.msg);
        //alert(response.data.msg);
        console.log(response.data.msg);
        // setResult(response.data.msg); // Ensure response.data has a `message` property
      }
    } catch (error) {
      showAlert("warning", error.message || "An error occurred");
      console.error(error); // Log errors if the request fails
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //set keyboard strokes to the search state
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const checkDB = async (e) => {
    e.preventDefault();
    setSubmitVal(true);

    try {
      const res = await axios.post(
        "http://localhost:9000/api/test-db-connection",
        {
          inputs,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", res);
      console.log("Response Status:", res.status);
      console.log("Response Data:", res.data);

      if (res.status === 200) {
        // Adjust status check if needed
        showAlert(
          "success",
          res.data.message || "Database connection successful"
        );
      } else {
        showAlert("warning", res.data.message || "Form submission failed");
      }

      setInputs({
        database: "",
        username: "",
        password: "",
        host: "",
        port: "",
        engine: "",
      });
    } catch (error) {
      console.error("Error:", error);
      showAlert(
        "error",
        error.response.data.error || "An unexpected error occurred"
      );
    } finally {
      setSubmitVal(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center font-bold mt-8 text-2xl">
        The Core (Back-End Odyssey)
      </h1>
      <div className="mx-32">
        <p className="text-center mx-16 px-32 text-sm">
          Here, your 🐍 Python skills will bend space and time to connect front
          and back ends. Ignite the AWS-powered 🚀 databases to store the
          universe of data securely and efficiently. 🐳 Containerize your
          creation for a journey that transcends environments.
        </p>
        <p className="text-center mx-16 mt-4 px-32 text-sm">
          Tools at Your Disposal: AWS (Amazon Web Services):☁️, Python:🐍,
          Docker:🐳, Linux:🐧, Your limitless imagination: ✨
        </p>
        <hr className=" h-px bg-gray-200 mx-48 my-12 border-0" />
        <div className="grid grid-cols-2 mx-48 p-4">
          <div className="grid-col-1">
            <h3 className="font-bold m-2">Data Structures Explained</h3>
            <p className="text-sm">
              The data represents information about a student in a dashboard
              system. Each student record includes:
            </p>
            <h4 className="p-4 px-4 text-sm font-bold">⭕Basic Details:</h4>
            <p className="text-sm">
              Includes the{" "}
              <span className="text-blue-600 font-bold">
                name, email, cohort
              </span>{" "}
              (the group or class the student belongs to), and{" "}
              <span className="text-blue-600 font-bold">ranking</span> (a
              numerical ranking of the student).
            </p>
            <h4 className="p-4 px-4 text-sm font-bold">
              ⭕Academic Performance Metrics:
            </h4>
            <p className="text-sm">
              Consists of{" "}
              <span className="text-blue-600 font-bold">
                assignment_completion
              </span>{" "}
              (the number of assignments completed) and{" "}
              <span className="text-blue-600 font-bold">
                attendance_average
              </span>{" "}
              (the average attendance percentage).
            </p>
            <h4 className="p-4 px-4 text-sm font-bold">
              ⭕Weekly Attendance List:
            </h4>
            <p className="text-sm">
              A detailed breakdown of weekly attendance. Each entry includes the{" "}
              <span className="text-blue-600 font-bold">week</span> identifier,
              the number of days the student was{" "}
              <span className="text-blue-600 font-bold">present</span> and{" "}
              <span className="text-blue-600 font-bold">absent</span> .
            </p>
          </div>
          <div className="grid-col-2 pl-16">
            <h3 className="font-bold m-2">List of APIs</h3>
            <p className="mx-8 text-sm">
              1. GET <span className="text-blue-600">"/api/health-check"</span>{" "}
              - Health Check
            </p>
            <p className="mx-8 text-sm">
              2. POST{" "}
              <span className="text-blue-600">"/api/test-db-connection"</span> -
              Test Database Connection
            </p>
            <p className="mx-8 text-sm">
              3. GET <span className="text-blue-600">""/api/students"</span> -
              Get All Students
            </p>
            <p className="mx-8 text-sm">
              4. POST{" "}
              <span className="text-blue-600">"/api/student/[email]"</span> -
              Get Student Details
            </p>
            <p className="mx-8 text-sm">
              5. GET{" "}
              <span className="text-blue-600">
                "/api/cohort/stats/[cohort_name]"
              </span>{" "}
              - Get Cohort Stats
            </p>
            <p className="mx-8 text-sm">
              6. GET{" "}
              <span className="text-blue-600">
                "/api/cohort/attendance/[cohort_name]"
              </span>{" "}
              - Get Cohort attendance stats (Graph)
            </p>
          </div>
        </div>
        <h3 className="text-gray-600 text-sm text-right mr-48 mb-2">
          Hint: our front-end dev is on vacation so we hope you can work with
          their structure
        </h3>
      </div>
      <hr className=" h-px bg-gray-200 mx-48 my-12 border-0" />
      {/* Database conection */}

      <div className="max-w-screen-xl mx-auto">
        <h3 className="mx-48 font-bold my-4">[A] Server Configuration</h3>
        <p className="mx-48 my-4">Testing on "..backendurl/api/health-check"</p>
        <hr className=" h-px bg-gray-200 mx-48 my-4 border-0" />
        <h3 className="mx-48 mb-4">Backend URL</h3>
        <div className="mx-48 pb-32">
          <input
            className="mb-4 px-2 py-2 border border-gray-200 rounded w-1/2 mr-4"
            type="text"
            name=""
            placeholder="http://ip_address:3000"
            id=""
          />
          <button
            className="bg-blue-600 px-4 py-2 border mr-4 rounded-md text-white"
            type="submit"
            onClick={fulfillCheck}
          >
            Test Backend Link
          </button>
          <button className="bg-black px-4 py-2 border mr-4 rounded-md text-white">
            Save Backend URL
          </button>
        </div>
        <hr className=" h-px bg-gray-200 mx-48 my-4 border-0" />
      </div>

      <div className="max-w-screen-xl mx-auto">
        <h3 className="mx-48 font-bold my-8">[B] Database Configuration</h3>
        <p className="mx-48 my-4">
          Testing on "..backendurl/api/test-db-connection"
        </p>
        <hr className=" h-px bg-gray-200 mx-48 my-4 border-0" />

        <form className="mx-48 grid grid-cols-2 gap-4" onSubmit={checkDB}>
          <div className="grid grid-rows-2 gap-4">
            <div className="">
              <label htmlFor="">Database Host</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="text"
                placeholder="localhost"
                name="host"
                value={inputs.host || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="">Database Password</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="password"
                placeholder="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="">Database Engine</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="text"
                placeholder="mysql"
                name="engine"
                value={inputs.engine || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="">
              <label htmlFor="">Database User</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="text"
                placeholder="root"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="">Database Name</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="text"
                placeholder="nebula"
                name="database"
                value={inputs.database || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="">Database Port</label>
              <br />
              <input
                className="mt-2 w-full border border-gray-200 rounded-md p-1"
                type="text"
                placeholder="3306"
                name="port"
                value={inputs.port || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className=" mt-8 mb-16 bg-[#A52A2A] text-white rounded py-1"
            type="submit"
          >
            {submitVal ? <Loading /> : "Test Database Connection"}
          </button>
        </form>
        {/* <button
          type="submit"
          className="bg-[#050036] rounded text-white py-3 w-full lg:w-3/4"
        >
          {submitVal ? <Loading /> : "Submit"}
        </button> */}

        <hr className=" h-px bg-gray-200 mx-48 my-4 border-0" />
      </div>
    </div>
  );
};

export default ConfigPage;
