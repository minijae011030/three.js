import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Page/Main/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
