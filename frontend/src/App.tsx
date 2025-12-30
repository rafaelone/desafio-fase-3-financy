import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { DashBoard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Categories } from './pages/Categories';
import { useAuthStore } from './stores/auth';
import { PrivateLayout } from './components/layouts/private-layout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <Navigate to="/" replace />
  );
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function RootRedirect() {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <PrivateLayout>
      <DashBoard />
    </PrivateLayout>
  ) : (
    <SignIn />
  );
}

function App() {
  return (
    <Routes>
      {/* Rota raiz - mostra SignIn ou Dashboard baseado na autenticação */}
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/signUp"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
