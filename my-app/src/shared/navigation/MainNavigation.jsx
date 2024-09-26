import React from "react";
import { NavLink } from "react-router-dom";
function MainNavigation() {

  return (
    <nav className="bg-gray-200 rounded-md shadow-md px-4">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center"></div>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-1 bg-stone-950 rounded-md"
                  : "text-black hover:text-white"
              }
            >
              Quizes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="admin"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-1 bg-stone-950 rounded-md"
                  : "text-black hover:text-white"
              }
            >
              Add quizes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-1 bg-stone-950 rounded-md"
                  : "text-black hover:text-white"
              }
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold px-3 py-1 bg-stone-950 rounded-md"
                  : "text-black hover:text-white"
              }
            >
              Login
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default MainNavigation;
