import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./app/signup/page";
import LoginPage from "./app/login/page";
import HomePage from "./app/home/page";
import UploadPage from "./app/upload/page";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
