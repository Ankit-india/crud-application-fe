import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

interface Student {
  rollNumber: number;
  name: string;
  mobileNumber: string;
  address: string;
}
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/");
        const data = await response.json();
        console.log(data);

        setStudentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const handleAddStudentClick = () => {
    navigate("/addStudent");
  };

  const handleUpdateClick = (student: Student) => {
    navigate(`/updateStudent`, { state: { student } });
    console.log("Update button clicked for row", student);
  };

  const handleDeleteClick = async (rollNumber: number) => {
    console.log("Delete button clicked for row", rollNumber);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/deleteStudent/${rollNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Delete was successful, update the state or perform any other necessary actions
        console.log(
          `Student with Roll Number ${rollNumber} deleted successfully.`
        );
        // You might want to refetch the updated student data after deletion
        setLoading(true);
      } else {
        // Handle errors
        console.error(
          `Error deleting student with Roll Number ${rollNumber}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen ">
        <div className="flex flex-col items-center m-10">
          <h1 className="text-3xl mb-10 font-bold">
            Welcome 🙏 to this CRUD web-application 😎
          </h1>
          <button
            onClick={handleAddStudentClick}
            className="border rounded-full p-2 px-4 bg-green-500 hover:bg-green-600 text-white"
          >
            Add Student😉
          </button>
        </div>

        <div className="w-full m-10">
          <div className="m-10">
            <table className="table-auto w-full border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border p-2">Roll Number</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Mobile Number</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Update</th>
                  <th className="border p-2">Delete</th>
                </tr>
              </thead>
              <tbody className="">
                {studentData.map((student) => (
                  <tr key={student.rollNumber}>
                    <td className="border p-2">{student.rollNumber}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.mobileNumber}</td>
                    <td className="border p-2">{student.address}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleUpdateClick(student)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded"
                      >
                        Update
                      </button>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDeleteClick(student.rollNumber)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white p-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
