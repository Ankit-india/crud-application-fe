import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Student from "./components/Student";
import UpdateStudent from "./components/UpdateStudent";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addStudent" element={<Student />} />
            <Route path="/updateStudent" element={<UpdateStudent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
