import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ErrorBoundary from "./components/ErrorBoundaries";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route
                path="*"
                element={
                  <ErrorPage
                    title="Page Not Found"
                    message="The page you're looking for doesn't exist or has been moved."
                    code="404"
                    actionText="Go to Homepage"
                    actionLink="/"
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
