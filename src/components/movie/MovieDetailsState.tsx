import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";

interface ErrorStateProps {
  error: string;
}

export const LoadingState: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <Loader />
    </div>
  );
};

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center text-red-500">
        <p>{error}</p>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Movies
        </Link>
      </div>
    </div>
  );
};

export const NotFoundState: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <p>Movie not found</p>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Movies
        </Link>
      </div>
    </div>
  );
};
