import axios from "axios";
import React, { useRef, useState } from "react";
import { ServerURL } from "../App";

const Admin = () => {

  /* ================= IMAGE STATES ================= */
  const memberImgRef = useRef(null);
  const projectImgRef = useRef(null);
  const startupImgRef = useRef(null);

  const [memberImg, setMemberImg] = useState(null);
  const [projectImg, setProjectImg] = useState(null);
  const [startupImg, setStartupImg] = useState(null);

  const [memberPreview, setMemberPreview] = useState(null);
  const [projectPreview, setProjectPreview] = useState(null);
  const [startupPreview, setStartupPreview] = useState(null);

  const [memberLoading, setMemberLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [startupLoading, setStartupLoading] = useState(false);

  /* ================= SUBMIT HANDLERS ================= */
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberImg) return alert("Upload member image");

    setMemberLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", e.target.name.value);
      fd.append("role", e.target.role.value);
      fd.append("year", e.target.year.value);
      fd.append("work", e.target.work.value);
      fd.append("stream", e.target.stream.value);
      fd.append("image", memberImg);

      await axios.post(`${ServerURL}/api/member/addmember`, fd);
      alert("Member added");
      e.target.reset();
      setMemberPreview(null);
    } catch (error) {
      alert("Error adding member");
      console.error(error);
    } finally {
      setMemberLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectImg) return alert("Upload project image");

    setProjectLoading(true);

    try {
      const tech = e.target.technologies.value.split(",");

      const fd = new FormData();
      fd.append("title", e.target.title.value);
      fd.append("category", e.target.category.value);
      fd.append("description", e.target.description.value);
      fd.append("estimatedTime", e.target.estimatedTime.value);
      tech.forEach(t => fd.append("technologies", t.trim()));
      fd.append("image", projectImg);

      await axios.post(`${ServerURL}/api/project/addproject`, fd);
      alert("Project added");
      e.target.reset();
      setProjectPreview(null);
    } catch (error) {
      alert("Error adding project");
      console.error(error);
    } finally {
      setProjectLoading(false);
    }
  };

  const handleStartupSubmit = async (e) => {
    e.preventDefault();

    if (!startupImg) return alert("Upload startup image");

    setStartupLoading(true);

    try {
      const team = e.target.team.value.split(",");

      const fd = new FormData();
      fd.append("name", e.target.name.value);
      fd.append("mentor", e.target.mentor.value);
      team.forEach(m => fd.append("team", m.trim()));
      fd.append("desc", e.target.desc.value);
      fd.append("image", startupImg);

      await axios.post(`${ServerURL}/api/startup/addstartup`, fd);
      alert("Startup added");
      e.target.reset();
      setStartupPreview(null);
    } catch (error) {
      alert("Error adding startup");
      console.error(error);
    } finally {
      setStartupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-400">
        Admin Dashboard
      </h1>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* ================= MEMBER ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Add Member</h2>

          {memberPreview && (
            <img
              src={memberPreview}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          )}

          <input
            type="file"
            hidden
            ref={memberImgRef}
            onChange={(e) => {
              const file = e.target.files[0];
              setMemberImg(file);
              setMemberPreview(URL.createObjectURL(file));
            }}
          />

          <button
            onClick={() => memberImgRef.current.click()}
            className="w-full mb-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Upload Image
          </button>

          <form onSubmit={handleMemberSubmit} className="space-y-3">
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="name" placeholder="Name" required disabled={memberLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="role" placeholder="Role" required disabled={memberLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="year" placeholder="Year" required disabled={memberLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="work" placeholder="Work" disabled={memberLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="stream" placeholder="Stream" disabled={memberLoading} />
            <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={memberLoading}>
              {memberLoading ? "Loading..." : "Add Member"}
            </button>
          </form>
        </div>

        {/* ================= PROJECT ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Add Project</h2>

          {projectPreview && (
            <img
              src={projectPreview}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}

          <input
            type="file"
            hidden
            ref={projectImgRef}
            onChange={(e) => {
              const file = e.target.files[0];
              setProjectImg(file);
              setProjectPreview(URL.createObjectURL(file));
            }}
          />

          <button
            onClick={() => projectImgRef.current.click()}
            className="w-full mb-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Upload Image
          </button>

          <form onSubmit={handleProjectSubmit} className="space-y-3">
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="title" placeholder="Title" required disabled={projectLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="category" placeholder="Category" required disabled={projectLoading} />
            <textarea className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="description" placeholder="Description" disabled={projectLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="technologies" placeholder="Technologies (comma separated)" disabled={projectLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="estimatedTime" placeholder="Estimated Time" disabled={projectLoading} />
            <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={projectLoading}>
              {projectLoading ? "Loading..." : "Add Project"}
            </button>
          </form>
        </div>

        {/* ================= STARTUP ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Add Startup</h2>

          {startupPreview && (
            <img
              src={startupPreview}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}

          <input
            type="file"
            hidden
            ref={startupImgRef}
            onChange={(e) => {
              const file = e.target.files[0];
              setStartupImg(file);
              setStartupPreview(URL.createObjectURL(file));
            }}
          />

          <button
            onClick={() => startupImgRef.current.click()}
            className="w-full mb-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Upload Image
          </button>

          <form onSubmit={handleStartupSubmit} className="space-y-3">
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="name" placeholder="Startup Name" required disabled={startupLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="mentor" placeholder="Mentor" disabled={startupLoading} />
            <input className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="team" placeholder="Team (comma separated)" disabled={startupLoading} />
            <textarea className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10" name="desc" placeholder="Description" disabled={startupLoading} />
            <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed" disabled={startupLoading}>
              {startupLoading ? "Loading..." : "Add Startup"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
