import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Feed from "./Components/Feed";
import Body from "./Components/Body";
import Login from "./Components/login";
import Profile from "./Components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
