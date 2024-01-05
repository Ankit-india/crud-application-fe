// UpdateStudent.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Student {
  rollNumber: number;
  name: string;
  mobileNumber: string;
  address: string;
}

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | undefined>({} as Student);

  useEffect(() => {
    if (location.state && location.state.student.rollNumber) {
      setStudent(location.state.student);
    } else {
      console.error("No student object found in state");
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const jsonData: Record<string, string> = {};

    formData.forEach((value, key) => {
      jsonData[key] = value.toString();
    });

    // const formData = new FormData(e.target);
    const backendUrl = `http://localhost:8080/api/v1/updateStudent/${student?.rollNumber}`;
    console.log(formData);

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/");
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-500">
        <h1 className="text-3xl mb-10 font-bold text-white">
          Update student into CRUD web-application 😎
        </h1>
        <form
          className="bg-white shadow-md shadow-slate-100 rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
          action="backend.java"
          method="post"
        >
          <label htmlFor="name">Name:</label>
          <br />
          <input
            className="border-2 mb-2"
            type="text"
            id="name"
            name="name"
            defaultValue={student?.name || ""}
          />
          <br />
          <label htmlFor="mNumber">Mobile Number</label>
          <br />
          <input
            className="border-2 mb-2"
            type="text"
            id="mNumber"
            name="mobileNumber"
            defaultValue={student?.mobileNumber || ""}
          />
          <br />
          <label htmlFor="address">Address:</label>
          <br />
          <input
            className="border-2 mb-2"
            type="text"
            id="address"
            name="address"
            defaultValue={student?.address || ""}
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
    </>
  );
};

export default UpdateStudent;
