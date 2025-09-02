import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./Dashboard/UserDetails";
import UserList from "./Dashboard/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
