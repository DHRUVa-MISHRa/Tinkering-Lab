import { useEffect, useState } from "react";
import { Calendar, Code2, ExternalLink, X } from "lucide-react";
import axios from "axios";
import { ServerURL } from "../App";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${ServerURL}/api/project/getproject`,
          { withCredentials: true }
        );
        setProjects(res.data.data);
      } catch (err) {
        console.log("Fetch project error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  /* ================= SEARCH ================= */
  const filteredProjects = projects.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.technologies?.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER SECTION */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full mb-6">
            <p className="text-purple-300 text-sm font-semibold">Explore Our Portfolio</p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4">
            Innovation Projects
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover cutting-edge projects showcasing our technical expertise and creative solutions
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full sm:w-2/3">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <div className="relative flex items-center bg-slate-800/60 backdrop-blur-xl rounded-2xl px-6 py-3 border border-purple-500/30 focus-within:border-purple-400">
              <Code2 size={20} className="text-purple-400 mr-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects by name, category, or technology..."
                className="outline-none w-full bg-transparent text-white placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        </div>

        {/* PROJECT GRID */}
        {loading ? (
          <div className="flex justify-center items-center min-h-80">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found matching your search</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredProjects.map((p, idx) => (
              <div
                key={p._id}
                className="group h-full"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
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

                <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">

                  {/* IMAGE SECTION */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* CATEGORY BADGE */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-6 space-y-4 h-72 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {p.title}
                      </h2>

                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {p.description?.slice(0, 100)}...
                      </p>

                      {/* TECHNOLOGIES */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {p.technologies?.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs font-semibold rounded-lg border border-purple-500/50 hover:bg-purple-600/50 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                        {p.technologies?.length > 3 && (
                          <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs font-semibold rounded-lg border border-purple-500/50">
                            +{p.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                      <p className="text-xs text-gray-400 flex items-center gap-2">
                        <Calendar size={14} className="text-purple-400" />
                        {new Date(p.createdAt).toLocaleDateString()}
                      </p>

                      <button
                        onClick={() => setSelected(p)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <ExternalLink size={14} />
                        Details
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-500/30 max-h-[90vh] overflow-y-auto">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-slate-700/50 hover:bg-slate-600 rounded-full transition-colors border border-purple-500/50"
            >
              <X size={24} className="text-white" />
            </button>

            {/* IMAGE SECTION */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

              <div className="absolute bottom-6 left-6 flex gap-3">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
                  {selected.category}
                </span>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-8 space-y-6">

              {/* TITLE */}
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {selected.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {selected.description}
                </p>
              </div>

              {/* TIME ESTIMATE */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-purple-600/20 border border-purple-500/30">
                  <p className="text-xs text-purple-300 font-semibold uppercase mb-2">Estimated Duration</p>
                  <p className="text-2xl font-bold text-white">{selected.estimatedTime}</p>
                </div>
                <div className="p-4 rounded-xl bg-pink-600/20 border border-pink-500/30">
                  <p className="text-xs text-pink-300 font-semibold uppercase mb-2">Published Date</p>
                  <p className="text-2xl font-bold text-white">
                    {new Date(selected.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* TECHNOLOGIES */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-widest">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {selected.technologies?.map((t, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 rounded-lg border border-purple-500/50 font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-6">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
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
