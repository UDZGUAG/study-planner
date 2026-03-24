import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background gradients */}
      <div className="absolute top-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-tr from-blue-600/20 to-pink-600/20 blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-8 bg-slate-900/40 p-10 sm:p-16 rounded-3xl border border-slate-800/60 backdrop-blur-xl shadow-2xl">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-500/20 mb-4 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Your Ultimate Academic Companion</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">StudyPlanner</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Elevate your academic journey. Organize your syllabus, track deadlines, and ace your assignments with a beautifully designed, intuitive task manager tailored perfectly for students.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/tasks"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] hover:-translate-y-1"
          >
            <span>Go to Tasks</span>
            <svg 
              className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-6 text-slate-500 text-sm font-medium tracking-wide">
        Built for students, by students.
      </footer>
    </div>
  );
}
