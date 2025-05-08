import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} Movie App. All rights reserved.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-300">
              Data provided to{" "}
              <a
                href="https://telda.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                TELDA Frontend Team
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
