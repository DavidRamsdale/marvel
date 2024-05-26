import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ComicPage from "./pages/Comic";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comic/:id" element={<ComicPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
