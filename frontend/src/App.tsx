import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './app/signup/page';
import LoginPage from "./app/login/page";
import HomePage from './app/home/page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}