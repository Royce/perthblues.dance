import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => {
  const [title, subTitle] = siteTitle.split(" - ");
  return (
    <nav className="flex items-center justify-between flex-wrap bg-yellow-800 p-6">
      <div className="flex items-center flex-shrink-0 text-orange-100 mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <Link to="/" className="flex">
          <span className="font-semibold text-xl tracking-tight">{title}</span>
          <span className="font-semibold text-xl tracking-tight hidden sm:block">
            {": " + subTitle}
          </span>
        </Link>
      </div>
      <div className="block flex sm:flex-grow items-center w-auto">
        <div className="text-sm flex-grow">
          <Link
            to="/events"
            className="inline-block mt-0 text-orange-200 hover:text-orange-100 mr-4"
          >
            Events
          </Link>
          <Link
            to="/notes"
            className="inline-block mt-0 text-orange-200 hover:text-orange-100"
          >
            Notes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
