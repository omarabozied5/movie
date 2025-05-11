import React from "react";

interface PageTransitionProps {
  isLoading: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="h-1 bg-tertiary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default PageTransition;
