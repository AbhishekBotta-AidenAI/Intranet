import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ChatProvider } from './context/ChatContext';
import Dashboard from './pages/Dashboard';
import HRPolicies from './pages/HRPolicies';
import MePage from './pages/Me';
import OrganizationEngagement from './pages/OrganisationEngagement';

function App() {
  return (
    <Router>
      <ChatProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/me" element={<MePage />} />
            <Route path="/hr-policies" element={<HRPolicies />} />
            <Route path="/my-team" element={<Dashboard />} />
            <Route path="/my-finances" element={<Dashboard />} />
            <Route path="/org" element={<OrganizationEngagement />} />
            <Route path="/engage" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      </ChatProvider>
    </Router>
  );
}

export default App;
