import { useState } from "react";

import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardStats from "./components/DashboardStats";
import DashboardMain from "./components/DashboardMain";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="lg:ml-72 min-h-screen">
        <DashboardHeader
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 space-y-6 overflow-hidden">
          <DashboardStats />

          <DashboardMain />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;