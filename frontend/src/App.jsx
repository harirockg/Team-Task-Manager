import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";

//  Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;




























// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Navbar from "./components/Navbar";

// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";
// import Projects from "./pages/Projects";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import API from "./api/api";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔥 Get logged in user
//   const fetchUser = async () => {
//     try {
//       const res = await API.get("/auth/me");
//       setUser(res.data.user);
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="bg-black min-h-screen text-white">
//         <Navbar user={user} setUser={setUser} />

//         <Routes>
//           {/* 🔓 Public Routes */}
//           <Route
//             path="/login"
//             element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/signup"
//             element={!user ? <Signup /> : <Navigate to="/" />}
//           />

//           {/* 🔒 Protected Routes */}
//           <Route
//             path="/"
//             element={user ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/tasks"
//             element={user ? <Tasks /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/projects"
//             element={user ? <Projects /> : <Navigate to="/login" />}
//           />

//           {/* ❌ 404 fallback */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }





// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Projects from "./pages/Projects";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/tasks"
//           element={
//             <ProtectedRoute>
//               <Tasks />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;