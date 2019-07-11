import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => {
  const [title, subTitle] = siteTitle.split(" - ");
  return (
    <nav className="flex items-center justify-between flex-wrap bg-yellow-800 p-6">
      <div className="flex items-center flex-shrink-0 text-orange-100 mr-6">
        <svg
          className="fill-current h-6 w-8 mr-2 mb-1"
          xmlns="http://www.w3.org/2000/svg"
          width="198.24"
          height="198.24"
          viewBox="0 0 198.24 198.24"
        >
          <path
            d="M194.24,69.932h-21.521l21.035-31.852c3.95-5.981,2.298-14.062-3.684-18.012l-1.545-1.02
	c-2.133-1.408-4.606-2.153-7.155-2.153c-4.384,0-8.442,2.182-10.856,5.837l-31.17,47.199H4c-2.209,0-4,1.791-4,4v24.503
	c0,32.382,21.413,59.855,50.823,69.006v9.904c0,2.209,1.791,4,4,4h88.594c2.209,0,4-1.791,4-4v-9.904
	c29.41-9.151,50.823-36.625,50.823-69.006V73.932C198.24,71.723,196.449,69.932,194.24,69.932z M177.189,27.141
	c0.929-1.406,2.491-2.246,4.181-2.246c0.977,0,1.926,0.287,2.747,0.829l1.545,1.02c2.3,1.519,2.936,4.627,1.416,6.928l-23.946,36.26
	H148.93L177.189,27.141z"
          />
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
