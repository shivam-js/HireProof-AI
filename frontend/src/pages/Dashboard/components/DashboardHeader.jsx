import { Menu } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

const DashboardHeader = ({ setIsSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 px-5 py-5 backdrop-blur lg:px-8">
      <div className="mb-5 flex items-center justify-between lg:hidden">
        <h1 className="text-xl font-bold text-cyan-400">HireProof AI</h1>

        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-xl border border-slate-700 p-2 text-slate-300"
          
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-slate-400 lg:text-base">
            Manage candidates, AI screening, and hiring verification from one place.
          </p>
        </div>

        <div className="w-fit rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
          {user?.email || "Recruiter Account"}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;