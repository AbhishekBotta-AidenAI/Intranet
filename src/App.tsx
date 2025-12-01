import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import HRPolicies from './pages/HRPolicies';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/me" element={<Dashboard />} />
          <Route path="/hr-policies" element={<HRPolicies />} />
          <Route path="/my-team" element={<Dashboard />} />
          <Route path="/my-finances"element={<Dashboard />} />
          <Route path="/org" element={<Dashboard />} />
          <Route path="/engage" element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
