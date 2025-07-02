import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Body from "./Components/Body";
import Login from "./Components/login";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
