import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState("");
  return (
    <div>
      <div className="h-24 z-50 relative container mx-auto px-6 grid grid-cols-3">
        <div className="flex items-center">
          {!showMenu && (
            <button onClick={() => setShowMenu(true)}>
              <svg className="w-10 h-10 mt-3 text-white" fill="none" stroke="#dad9b9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
          {showMenu && (
            <div x-show="showMenu" className="fixed inset-0 w-full h-full bg-nude z-50 text-yellow-900">
              <div className="container h-full mx-auto px-6 py-8 relative z-10 flex flex-col items-center justify-center text-2xl uppercase font-bold tracking-widest space-y-6">
                <button onClick={() => setShowMenu(false)} className="absolute top-0 left-0 mt-8 ml-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <NavLink to="/" className="inline-block border-b-4 border-transparent hover:border-yellow-900">
                  Home
                </NavLink>
                <NavLink to="/movies" className="inline-block border-b-4 border-transparent hover:border-yellow-900">
                  Movies
                </NavLink>
                <NavLink to="/tv-series" className="inline-block border-b-4 border-transparent hover:border-yellow-900">
                  TV Series
                </NavLink>
              </div>
              <div className="absolute inset-0 w-full h-full bg-yellow-900 bg-opacity-20"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <NavLink to="/" className="text-white uppercase font-bold text-2xl tracking-widest she">
            WatchMe
          </NavLink>
        </div>
        <div className="flex items-center justify-end">
          <NavLink to="/favorites">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mt-1" fill="none" viewBox="0 0 24 24" stroke="#dad9b9">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
