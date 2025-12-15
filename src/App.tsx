import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ChatProvider } from './context/ChatContext';
import Dashboard from './pages/Dashboard';
import HRPolicies from './pages/HRPolicies';
import MePage from './pages/Me';
import OrganizationEngagement from './pages/OrganisationEngagement';
import Login from './pages/Login';
import { useAuthRefresh } from './hooks/useAuthRefresh';

const AppRoutes = () => {
  const location = useLocation();
  useAuthRefresh();
  const isLogin = location.pathname.startsWith('/login');

  if (isLogin) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <ChatProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/hr-policies" element={<HRPolicies />} />
          <Route path="/my-team" element={<Dashboard />} />
          <Route path="/my-finances" element={<Dashboard />} />
          <Route path="/engage" element={<OrganizationEngagement />} />
        </Routes>
      </MainLayout>
    </ChatProvider>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
