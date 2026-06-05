import { projects } from "../data/data";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#e8a020]" />
            <span className="text-[#e8a020] text-xs font-bold uppercase tracking-[0.2em]">Dự án</span>
            <div className="h-px w-10 bg-[#e8a020]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Dự Án Tiêu Biểu</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">Một số công trình nổi bật mà chúng tôi đã thực hiện thành công.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e1e]/90 via-[#060e1e]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block bg-[#e8a020]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">{project.category}</div>
                <h3 className="text-white font-bold text-lg leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}