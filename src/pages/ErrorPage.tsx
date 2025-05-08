import React from "react";
import { Link } from "react-router-dom";
import { ErrorPageProps } from "../types";

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Oops! Something went wrong",
  message = "We're sorry, but an unexpected error has occurred.",
  code = "404",
  actionText = "Go to Homepage",
  actionLink = "/",
  onRetry,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
            {code && (
              <div className="text-6xl font-bold text-tertiary mb-6">
                {code}
              </div>
            )}
            <p className="text-gray-600 mb-6">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={actionLink} className="btn btn-primary w-full sm:w-auto">
              {actionText}
            </Link>

            {onRetry && (
              <button
                onClick={onRetry}
                className="btn bg-secondary text-white hover:bg-opacity-90 w-full sm:w-auto"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
