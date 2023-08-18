import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './scenes/home';
import AddDetails from './scenes/addDetails';
import Layout from './scenes/layout';
import DailyReport from './scenes/dailyReport';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout/>}>
            <Route path="/add-details" element={<AddDetails />} />
            <Route path="/daily-report" element={<DailyReport />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
