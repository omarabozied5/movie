import React from "react";
import { Link } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";

const Header: React.FC = () => {
  const { setSearchQuery, setSelectedGenre, fetchMovies } = useMovieStore();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSearchQuery("");
    setSelectedGenre(null);
    fetchMovies(1);
  };
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="text-2xl font-bold hover:text-tertiary transition-colors duration-200"
          >
            <span className="text-tertiary">Explore</span> Movies
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  onClick={handleHomeClick}
                  className="hover:text-tertiary text-xl font-bold transition-colors duration-200 "
                >
                  <img
                    src="/images/homelogo.png"
                    className="w-10 h-10 object-contain bg-white rounded-full p-1 hover:bg-tertiary"
                    alt="telda Logo"
                  />
                </Link>
              </li>
              <li>
                <a
                  href="https://telda.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tertiary  transition-colors duration-200"
                >
                  <img
                    src="/images/teldalogo.png"
                    className="w-10 h-10 object-contain bg-white rounded-full p-1 hover:bg-tertiary"
                    alt="telda Logo"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

//text-[0.9rem] px-[1rem] py-[0.6rem] md:px-[2rem] md:py-[0.7rem] md:text-xl font-medium
