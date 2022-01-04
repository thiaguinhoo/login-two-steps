import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from './contexts/auth';
import PainelProvider from './contexts/painel';
import PrivateRoute from './components/private-route';
import ControlePage from './pages/controle';
import LoginPage from './pages/login';
import PainelPage from './pages/painel';
import Home from './pages/home';

function App() {
  return (
    <AuthProvider>
      <PainelProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/painel"
              element={
                <PrivateRoute>
                  <PainelPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/controle"
              element={
                <PrivateRoute>
                  <ControlePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PainelProvider>
    </AuthProvider>
  );
}

export default App;
