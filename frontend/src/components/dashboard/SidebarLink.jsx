import React from "react";
import { Link } from "react-router-dom";

export default function SidebarLink({ icon, label, active, to }) {
  return (
    <Link
      to={to || "#"}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
      }`}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}
