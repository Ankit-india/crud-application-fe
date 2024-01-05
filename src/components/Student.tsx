import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const jsonData: Record<string, string> = {};

    formData.forEach((value, key) => {
      jsonData[key] = value.toString();
    });

    const backendUrl = "http://localhost:8080/api/v1/createStudent";

    try {
      // console.log(formData);

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        // Handle successful response, e.g., show a success message
        console.log("Form submitted successfully", response);
        navigate("/");
      } else {
        // Handle error response, e.g., show an error message
        console.error("Error submitting form");
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error during fetch:", error);
    } finally {
      // Set loading to false, regardless of the outcome (success or error)
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-500">
        <h1 className="text-3xl mb-10 font-bold text-white">
          Add student into CRUD web-application 😎
        </h1>
        <form
          className="bg-white shadow-md shadow-slate-100 rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
          action="backend.java"
          method="post"
        >
          {/* <form onSubmit={handleSubmit} action="backend.java" method="post"> */}
          <label htmlFor="name">Name:</label>
          <br />
          <input className="border-2 mb-2" type="text" id="name" name="name" />
          <br />
          <label htmlFor="mNumber">Mobile Number</label>
          <br />
          <input
            className="border-2 mb-2"
            type="text"
            id="mNumber"
            name="mobileNumber"
          />
          <br />
          <label htmlFor="address">Address:</label>
          <br />
          <input
            className="border-2 mb-2"
            type="text"
            id="address"
            name="address"
          />
          <br />
          <br />
          <input
            className="border-2 px-4 py-1 rounded-2xl bg-blue-800 text-white hover:bg-green-600 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default Student;
