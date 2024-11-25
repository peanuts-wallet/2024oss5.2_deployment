import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ShowList from "./components/Pages/ShowList";
import DetailPage from "./components/Pages/DetailPage";
import UpdatePage from "./components/Pages/UpdatePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail" element={<DetailPage isBasePage={true} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/update" element={<UpdatePage isBasePage={true} />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
