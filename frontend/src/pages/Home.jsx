import React, { useLayoutEffect, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { Zap, Users, Code2, Rocket, ArrowRight, Star } from "lucide-react"
import axios from "axios"
import { ServerURL } from "../App"

// Import images
import m1 from "../../public/labImages/m1.jpg"
import m2 from "../../public/labImages/m2.jpg"
import m3 from "../../public/labImages/m3.jpg"
import m4 from "../../public/labImages/m4.jpg"
import group1 from "../../public/labImages/group.jpg"
import group2 from "../../public/tl.jpg"

const Home = () => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)

  const [members, setMembers] = useState([])
  const [projects, setProjects] = useState([])
  const [startups, setStartups] = useState([])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, projectsRes, startupsRes] = await Promise.all([
          axios.get(`${ServerURL}/api/member/getmember`, { withCredentials: true }),
          axios.get(`${ServerURL}/api/project/getproject`, { withCredentials: true }),
          axios.get(`${ServerURL}/api/startup/getstartup`, { withCredentials: true }),
        ])

        setMembers(membersRes.data.data?.slice(0, 4) || [])
        setProjects(projectsRes.data.data?.slice(0, 3) || [])
        setStartups(startupsRes.data.data?.slice(0, 3) || [])
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Background zoom
      tl.fromTo(
        imageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 2 }
      )

      // Text animation
      tl.from(
        "[data-animate]",
        {
          opacity: 0,
          y: 50,
          stagger: 0.25,
          duration: 1,
        },
        "-=1.3"
      )

      // Button animation
      tl.from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.4"
      )

      // Button pulse
      gsap.to(buttonRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
        delay: 2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={containerRef}
        className="relative w-full h-[650px] md:h-[700px] overflow-hidden pt-24"
      >
        {/* Background Image */}
        <img
          ref={imageRef}
          src={group2}
          alt="Tinker’s Lab Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
          <div>
            <h1
              data-animate
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg"
            >
              Welcome to
            </h1>

            <h1
              data-animate
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 drop-shadow-lg mt-2"
            >
              Tinker’s Lab
            </h1>

            <p
              data-animate
              className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Where Innovation Meets Passion – Empowering Students to Design, Build, and Transform Ideas into Reality
            </p>
          </div>

          <div data-animate className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/about">
              <button
                ref={buttonRef}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Meet Our Team
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/about">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Explore  Lab
                <Rocket size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* MOTIVATION SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Why Choose Tinker’s Lab?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-fit mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hands-On Innovation</h3>
              <p className="text-gray-300">Learn by doing! Work with Arduino, NodeMCU, 3D printers, and cutting-edge fabrication tools to bring your ideas to life.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-fit mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collaborative Community</h3>
              <p className="text-gray-300">Work in teams, learn from peers, and build lasting connections with like-minded innovators across all streams.</p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-orange-500/30 hover:border-orange-400/50 transition-all hover:shadow-2xl hover:shadow-orange-500/20">
              <div className="p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full w-fit mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-World Projects</h3>
              <p className="text-gray-300">Transform your concepts into working prototypes. Build IoT solutions, robotics, and smart devices that solve real problems.</p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-purple-500/30 backdrop-blur-xl">
            <p className="text-lg text-gray-300 text-center leading-relaxed">
              "The Tinker’s Lab is more than just a workshop – it's a movement. Here, every student, regardless of their background, gets the opportunity to experiment, fail, learn, and innovate. We believe that the future is built by those who dare to tinker and create." 🚀
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERS PREVIEW SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Our Leadership Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((m, idx) => (
              <div
                key={m.id}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-indigo-900/50 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-400/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/20"
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

                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-[90%] h-full object-contaain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-white text-lg">{m.name}</h3>
                  <p className="text-indigo-300 text-sm font-semibold">{m.role}</p>
                  <p className="text-gray-400 text-xs mt-2">{m.stream} • {m.year} Year</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Link to="/members">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                View All Members
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((p, idx) => (
              <div
                key={p._id}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-white text-lg line-clamp-2">{p.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{p.description}</p>
                  <p className="text-purple-300 text-xs font-semibold">{p.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Link to="/projects">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Explore All Projects
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* STARTUPS PREVIEW SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-orange-900 to-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Student Startups & Ventures
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {startups.map((s, idx) => (
              <div
                key={s._id}
                className="group rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-orange-900/50 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/50 transition-all hover:shadow-2xl hover:shadow-orange-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-600/20 to-red-600/20">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-white text-lg line-clamp-2">{s.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{s.desc}</p>
                  <div className="flex items-center gap-2 text-orange-300 text-xs">
                    <Users size={14} />
                    <span>{s.team?.length || 0} Team Members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Link to="/startups">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Discover All Startups
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Lab Moments
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[group1, group2, m1, m2, m3, m4].map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400/50"
              >
                <div className="relative aspect-video overflow-hidden bg-cyan-600/10">
                  <img
                    src={img}
                    alt={`Lab moment ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Link to="/about">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                View Full Gallery
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/80 backdrop-blur-xl border-t border-slate-700/50 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/50">
            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">About Lab</h3>
              <p className="text-sm text-gray-400">A hub of creativity and innovation for students to learn, build, and transform ideas.</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/project" className="text-gray-400 hover:text-white transition">Projects</Link></li>
                <li><Link to="/startup" className="text-gray-400 hover:text-white transition">Startups</Link></li>
                <li><Link to="/sreejan" className="text-gray-400 hover:text-white transition">Team</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Workshops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">Follow Us</h3>
              <div className="flex gap-3 text-sm">
                <a href="https://www.linkedin.com/company/srijan-the-tinkerers-lab/posts/?feedView=all" className="text-gray-400 hover:text-white transition">LinkedIn</a>

                <a href="https://www.instagram.com/srijan_tl_coer/" className="text-gray-400 hover:text-white transition">Instagram</a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center space-y-2">
            <p className="text-sm text-gray-400">
              © 2024 Tinker’s Lab. All rights reserved.
            </p>
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              Developed & Designed by Nasirulla (BCA)
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
