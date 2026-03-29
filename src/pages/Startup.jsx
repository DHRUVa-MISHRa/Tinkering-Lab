import { useEffect, useState } from "react";
import axios from "axios";
import { Users, User, X, Rocket, ArrowRight } from "lucide-react";
import { ServerURL } from "../App";

export default function Startup() {
  const [startups, setStartups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH STARTUPS ================= */
  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${ServerURL}/api/startup/getstartup`,
          { withCredentials: true }
        );
        setStartups(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-orange-600/20 border border-orange-500/50 rounded-full mb-6">
            <p className="text-orange-300 text-sm font-semibold">Emerging Innovations</p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-400">
            Student Startups
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover ambitious student-led ventures transforming ideas into impact
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center items-center min-h-80">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : startups.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No startups found yet
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {startups.map((s, idx) => (
              <div
                key={s._id}
                onClick={() => setSelected(s)}
                className="group cursor-pointer"
                style={{ animation: `fadeInUp 0.6s ease ${idx * 0.1}s both` }}
              >
                <style>{`
                  @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>

                <div className="h-full bg-gradient-to-br from-slate-800/50 to-orange-900/50 backdrop-blur-xl rounded-2xl border border-orange-500/20 overflow-hidden hover:border-orange-400/50 transition-all flex flex-col">

                  {/* IMAGE (CONTAIN) */}
                  <div className="relative h-72 bg-slate-900 flex items-center justify-center p-6">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4">
                      <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full shadow-lg">
                        <Rocket size={20} />
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition">
                        {s.name}
                      </h2>

                      {s.mentor && (
                        <p className="text-sm text-orange-300 font-semibold">
                          👨‍🏫 Mentor: {s.mentor}
                        </p>
                      )}

                      <p className="text-gray-300 text-sm line-clamp-2">
                        {s.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-orange-500/20 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users size={16} className="text-orange-400" />
                        {s.team?.length || 0} Members
                      </div>

                      <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:scale-105 transition">
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative bg-gradient-to-br from-slate-800 via-orange-900 to-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden border border-orange-500/30 max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-slate-700/50 rounded-full border border-orange-500/50"
            >
              <X size={24} className="text-white" />
            </button>

            {/* MODAL IMAGE */}
            <div className="h-80 bg-slate-900 flex items-center justify-center p-8">
              <img
                src={selected.image}
                alt={selected.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* MODAL CONTENT */}
            <div className="p-8 space-y-6">
              <h2 className="text-4xl font-bold text-orange-400">
                {selected.name}
              </h2>

              {selected.mentor && (
                <div className="p-4 bg-orange-600/20 rounded-xl border border-orange-500/30">
                  <p className="text-orange-300 font-semibold">Mentor</p>
                  <p className="text-white text-lg">{selected.mentor}</p>
                </div>
              )}

              <p className="text-gray-300 leading-relaxed">
                {selected.desc}
              </p>

              {selected.team?.length > 0 && (
                <div>
                  <h3 className="text-orange-300 mb-3 uppercase text-sm">Team</h3>
                  <div className="flex flex-wrap gap-3">
                    {selected.team.map((m, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 bg-orange-600/30 text-orange-300 rounded-lg border border-orange-500/50 flex items-center gap-2"
                      >
                        <User size={16} />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelected(null)}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:scale-105 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
