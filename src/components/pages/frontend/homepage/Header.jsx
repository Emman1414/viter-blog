import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-5 border-b border-light">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl">
            <img
              src="https://cdn.prod.website-files.com/63661389dd2417f19a0d89d3/636a2cb5715eea61d64a3119_logo.svg"
              alt=""
            />
          </Link>
          <div className="flex justify-between items-center gap-5">
            <ul className="flex justify-between text-sm uppercase gap-10">
              <li>
                <NavLink to="/" className="hover:border-b-2 border-light">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:border-b-2 border-light">
                  Work
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:border-b-2 border-light">
                  Studio
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:border-b-2 border-light">
                  Cart
                </NavLink>
              </li>
            </ul>
            <button className="btn-animate" data-text="Let's Talk">
              Let's Talk
            </button>

            <ul className="flex items-center gap-5 pl-5 border-l border-light">
              <li>
                <a
                  href="#"
                  className="size-[30px] text-xs rounded-full border border-light block center-all hover:bg-black hover:text-white transition-all"
                >
                  TW
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="size-[30px] text-xs rounded-full border border-light block center-all hover:bg-black hover:text-white transition-all"
                >
                  IN
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="size-[30px] text-xs rounded-full border border-light block center-all hover:bg-black hover:text-white transition-all"
                >
                  BE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
