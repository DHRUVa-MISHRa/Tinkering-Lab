import groupPhoto from "../../public/labImages/group.jpg"
// import groupPhoto  from "../../public/labImages/group"

import tl from "../../public/tl.jpg" // second group image
import group3 from "../../public/labImages/group2.jpg"

// import { data } from "@/data/memberList"

import m1 from "../../public/labImages/m1.jpg"
import m2 from "../../public/labImages/m2.jpg"
import m3 from "../../public/labImages/m3.jpg"
import m4 from "../../public/labImages/m4.jpg"
import m5 from "../../public/labImages/m5.jpg"
import m6 from "../../public/labImages/m6.jpg"
import m7 from "../../public/labImages/m7.jpg"
import m8 from "../../public/labImages/m8.jpg"
import m9 from "../../public/labImages/m9.jpg"
import m10 from "../../public/labImages/m10.jpg"
import m11 from "../../public/labImages/m11.jpg"
import m12 from "../../public/labImages/m12.jpg"

import vid from "../../public/videos/labvideo.mp4"
import { Zap, Shield, Lightbulb } from "lucide-react";



const galleryImages = [
  m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12,
]

const groupImages = [groupPhoto, tl, group3]

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          src={vid}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

        <div className="relative z-10 text-center px-6 space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full">
            <p className="text-blue-300 text-sm font-semibold">Innovation Hub</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 drop-shadow-lg">
            Tinker’s Lab
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where ideas meet innovation – a creative space to design, build, and transform prototypes into reality.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              About the Lab
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            The Tinker’s Lab is a hub of creativity and hands-on innovation. It provides students with an environment to explore electronics, IoT, robotics, fabrication, and prototyping. Equipped with tools like Arduino, NodeMCU, sensors, 3D printing, and fabrication equipment, the lab enables young innovators to convert their ideas into working models.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            Beyond tools, the lab nurtures collaboration, teamwork, and leadership through workshops, events, and real-world projects. Our mission is to encourage experimentation, problem-solving, and the spirit of innovation among students from all streams.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-fit mb-4">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-300">Converting creative ideas into tangible prototypes and real-world solutions</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-fit mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hands-On Learning</h3>
              <p className="text-gray-300">Direct experience with cutting-edge tools and technologies in electronics and fabrication</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-fit mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Collaboration</h3>
              <p className="text-gray-300">Building teams and fostering teamwork through workshops, events, and projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Photos Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Lab Moments
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
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

                <div className="border border-blue-500/30 rounded-2xl overflow-hidden backdrop-blur-xl bg-blue-600/10">
                  <img
                    src={img}
                    alt={`Group image ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Lab Gallery
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="break-inside-avoid group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-blue-500/20 hover:border-blue-400/50"
              >
                <div className="relative overflow-hidden bg-blue-600/10">
                  <img
                    src={img}
                    alt={`Lab image ${idx + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-blue-500/30 text-gray-300 py-8 text-center mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Tinker’s Lab Committee | Powered by
          Students
        </p>
      </footer>
    </div>
  )
}
