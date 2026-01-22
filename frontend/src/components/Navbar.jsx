import React, { useState, useEffect, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import gsap from "gsap"
import { Menu, X } from "lucide-react"

/* ---------- LOGO ---------- */
const Logo = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
    >
      <polygon
        points="50,5 90,27 90,73 50,95 10,73 10,27"
        stroke="#a855f7"
        strokeWidth="6"
        fill="none"
      />
      <line x1="30" y1="40" x2="70" y2="40" stroke="#a855f7" strokeWidth="6" />
      <line x1="50" y1="40" x2="50" y2="70" stroke="#a855f7" strokeWidth="6" />
    </svg>
  )
}

/* ---------- NAVBAR ---------- */
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
  }, [])

  const status = "pro";

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Startups", path: "/startups" },
    { name: "Members", path: "/members" },
    ...(status === "dev" ? [{ name: "Admin", path: "/admin" }] : [])
    // ,
  ]

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-2xl border-b border-gradient"
      style={{
        borderImage: "linear-gradient(90deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(168,85,247,0.3)) 1",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-900 rounded-lg p-2">
              <Logo />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Tinkering Lab
            </h1>
            <p className="text-xs text-purple-400 font-semibold -mt-1">Innovation Hub</p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link, idx) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-md font-medium transition-all duration-300 group ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.name}
                {({ isActive }) => !isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-white transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-2 bg-gradient-to-b from-slate-900/80 to-slate-950 border-t border-purple-500/30 backdrop-blur-xl">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
                        : "text-slate-300 hover:text-white hover:bg-purple-600/20"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
