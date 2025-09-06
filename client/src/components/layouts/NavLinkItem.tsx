import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinkItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg hover:bg-sky-100 transition ${isActive ? "bg-gray-100 font-semibold text-sky-700" : "text-gray-700"}`
      }
    >
      <span className="w-5 h-5 mr-3">{icon}</span>
      {label}
    </NavLink>
  );
}
