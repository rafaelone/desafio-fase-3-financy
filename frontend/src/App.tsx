import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { DashBoard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';

function App() {
  return (
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
