import {
  X,
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

const DashboardSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    setIsSidebarOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  const navItemClass = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
      isActive
        ? "bg-cyan-400/10 text-cyan-400"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() =>
            setIsSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-slate-800 p-6">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">
              HireProof AI
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Recruiter Intelligence
              Platform
            </p>
          </div>

          <button
            onClick={() =>
              setIsSidebarOpen(false)
            }
            className="rounded-lg border border-slate-700 p-2 text-slate-300 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <NavLink
            to="/dashboard"
            end
            className={navItemClass}
            onClick={() =>
              setIsSidebarOpen(false)
            }
          >
            <LayoutDashboard size={20} />

            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/candidates"
            className={navItemClass}
            onClick={() =>
              setIsSidebarOpen(false)
            }
          >
            <Users size={20} />

            Candidates
          </NavLink>

          <NavLink
            to="/dashboard/reports"
            className={navItemClass}
            onClick={() =>
              setIsSidebarOpen(false)
            }
          >
            <FileText size={20} />

            Reports
          </NavLink>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;