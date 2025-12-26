// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import MainLayout from './layouts/MainLayout';
// import { ChatProvider } from './context/ChatContext';
// import { AuthProvider } from './context/AuthProvider';
// import Dashboard from './pages/Dashboard';
// import HRPolicies from './pages/HRPolicies';
// import MePage from './pages/Me';
// import OrganizationEngagement from './pages/OrganisationEngagement';
// import Login from './pages/Login';
// import { useAuthRefresh } from './hooks/useAuthRefresh';
// import MyAppsPage from './pages/myApps';

// const AppRoutes = () => {
//   const location = useLocation();
//   useAuthRefresh();
//   const isLogin = location.pathname.startsWith('/login');

//   if (isLogin) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     );
//   }

//   return (
//     <ChatProvider>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/me" element={<MePage />} />
//           <Route path="/hr-policies" element={<HRPolicies />} />
//           <Route path="/my-team" element={<Dashboard />} />
//           <Route path="/my-finances" element={<Dashboard />} />
//           <Route path="/engage" element={<OrganizationEngagement />} />
//           <Route path="/myapps" element={<MyAppsPage />} />
//         </Routes>
//       </MainLayout>
//     </ChatProvider>
//   );
// };

// function App() {
//   return (
//     <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthProvider';
import Dashboard from './pages/Dashboard';
import HRPolicies from './pages/HRPolicies';
import MePage from './pages/Me';
import OrganizationEngagement from './pages/OrganisationEngagement';
import Login from './pages/Login';
import { useAuthRefresh } from './hooks/useAuthRefresh';
import MyAppsPage from './pages/myApps';

const AppRoutes = () => {
  const location = useLocation();

  // 🔄 Token refresh hook (safe here)
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
          <Route path="/myapps" element={<MyAppsPage />} />
        </Routes>
      </MainLayout>
    </ChatProvider>
  );
};

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
