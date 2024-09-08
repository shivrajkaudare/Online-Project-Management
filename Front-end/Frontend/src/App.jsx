import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login-Page/login.jsx";
import SideBar from "./Components/Home-Page/SideBar/Sidebar.jsx";
import Dashboard from "./Components/Home-Page/Dashbord/Dashbord.jsx";
import NewProject from "./Components/Home-Page/NewProject/NewProject";
import ProjectListing from "./Components/Home-Page/Project-listing/ProjectListing.jsx";

function App() {
  return (
    <div className="MainContainer">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="container">
                <div className="sidebar">
                  <SideBar />
                </div>
                <div className="content">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="allprojects" element={<ProjectListing />} />
                    <Route path="addproject" element={<NewProject />} />
                  </Routes>
                </div>
              </div>
            }
          />
          <Route path="logout" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
