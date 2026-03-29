import { useEffect, useState } from "react";
import { GraduationCap, X, ArrowRight, Users } from "lucide-react";
import axios from "axios";
import { ServerURL } from "../App";

export default function Member() {
  const [selected, setSelected] = useState(null);
  const [finaldata, setFinaldata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${ServerURL}/api/member/getmember`, {
          withCredentials: true,
        });
        setFinaldata(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log("fetch all members error", error);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 rounded-full mb-6">
            <p className="text-indigo-300 text-sm font-semibold">Meet The Team</p>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            Lab  Srijan  Committee
          </h1>

          <p className="text-gray-300 text-lg">
            Meet the talented people driving innovation and creativity
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            {/* MEMBER GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {finaldata.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className="group cursor-pointer h-full"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.05}s both`,
                  }}
                >
                  <style>{`
                    @keyframes fadeInUp {
                      from {
                        opacity: 0;
                        transform: translateY(30px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}</style>

                  <div className="relative bg-gradient-to-br from-slate-800/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 overflow-hidden h-full flex flex-col border border-indigo-500/20 hover:border-indigo-400/50">
                    {/* IMAGE CONTAINER */}
                    <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* OVERLAY ON HOVER */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                          {m.name}
                        </h2>
                        <p className="text-indigo-300 font-semibold text-sm">
                          {m.role}
                        </p>
                      </div>

                      {/* INFO TAGS */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                          <span className="flex items-center gap-1">
                            <GraduationCap size={14} /> {m.stream}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                          <span>{m.year} Year</span>
                        </div>
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors">
                        {m.work}
                      </p>

                      {/* CTA BUTTON */}
                      <button className="w-full py-2 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 group/btn">
                        View Profile
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div
            className="relative bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl shadow-indigo-500/20 overflow-hidden border border-indigo-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>

              {/* DETAILS */}
              <div className="p-8 flex flex-col justify-between space-y-6">
                {/* HEADER */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {selected.name}
                      </h2>
                      <p className="text-indigo-300 font-semibold text-lg mt-2">
                        {selected.role}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelected(null)}
                      className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600 text-gray-300 hover:text-white transition-colors border border-indigo-500/50"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* DIVIDER */}
                  <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>

                  {/* INFO BADGES */}
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-indigo-600/30 rounded-full text-indigo-300 text-sm font-medium flex items-center gap-2 border border-indigo-500/50">
                      <GraduationCap size={16} />
                      {selected.stream}
                    </div>
                    <div className="px-4 py-2 bg-purple-600/30 rounded-full text-purple-300 text-sm font-medium border border-purple-500/50">
                      {selected.year} Year
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-widest">
                    About
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {selected.work}
                  </p>
                </div>

                {/* FOOTER ACTION */}
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
