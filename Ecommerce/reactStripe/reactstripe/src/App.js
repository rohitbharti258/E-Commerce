import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./components/Pay";
import Success from "./components/Success";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/pay" element={<Pay />}></Route>
          <Route exact path="success" element={<Success />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
