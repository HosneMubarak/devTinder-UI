import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Feed from "./Components/Feed";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
import Connection from "./Components/Connection";
import Request from "./Components/Request";
import Registration from "./Components/Registration";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Registration />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connection" element={<Connection />} />
              <Route path="request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
