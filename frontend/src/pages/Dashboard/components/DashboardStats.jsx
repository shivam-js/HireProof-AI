import { useEffect, useState } from "react";

import {
  Users,
  Clock3,
  ShieldCheck,
  FileText,
} from "lucide-react";

import { getAllCandidates } from "../../../services/candidateService";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    pendingCandidates: 0,
    analyzedCandidates: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await getAllCandidates();

        const candidates =
          data.candidates || [];

        const pendingCandidates =
          candidates.filter(
            (candidate) =>
              candidate.aiStatus ===
              "Pending"
          );

        const analyzedCandidates =
          candidates.filter(
            (candidate) =>
              candidate.aiStatus ===
              "Analyzed"
          );

        setStats({
          totalCandidates:
            candidates.length,

          pendingCandidates:
            pendingCandidates.length,

          analyzedCandidates:
            analyzedCandidates.length,
        });
      } catch (error) {
        console.error(
          "Dashboard stats error:",
          error
        );
      }
    };

    fetchDashboardStats();
  }, []);

  const statsData = [
    {
      title: "Candidates Screened",
      value: stats.totalCandidates,
      description:
        "AI screening records",
      icon: Users,
    },

    {
      title: "Pending Reviews",
      value: stats.pendingCandidates,
      description:
        "Awaiting recruiter action",
      icon: Clock3,
    },

    {
      title: "Verified Profiles",
      value: stats.analyzedCandidates,
      description:
        "AI analyzed candidates",
      icon: ShieldCheck,
    },

    {
      title: "Reports Generated",
      value: stats.analyzedCandidates,
      description:
        "AI assessment reports",
      icon: FileText,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardStats;