import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-rose-500 selection:text-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center relative overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-purple-900/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[100px]" />
        </div>

        <div className="z-10 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-rose-500">
            Young Warriors
          </h1>

          <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Leading the next generation of athletes to victory.
          </p>

          <div className="flex flex-wrap gap-6 mt-12 justify-center">
            <Link href="/players" className="group relative px-8 py-4 bg-gray-900 rounded-full border border-gray-800 hover:border-blue-500 transition-all duration-300">
              <span className="relative z-10 font-bold tracking-wide text-blue-400 group-hover:text-white transition-colors">See Players</span>
              <div className="absolute inset-0 rounded-full bg-blue-600/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
            </Link>

            <Link href="/coaches" className="group relative px-8 py-4 bg-gray-900 rounded-full border border-gray-800 hover:border-purple-500 transition-all duration-300">
              <span className="relative z-10 font-bold tracking-wide text-purple-400 group-hover:text-white transition-colors">Meet Coaches</span>
              <div className="absolute inset-0 rounded-full bg-purple-600/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
            </Link>

            <Link href="/admin" className="group relative px-8 py-4 bg-gray-900 rounded-full border border-gray-800 hover:border-rose-500 transition-all duration-300">
              <span className="relative z-10 font-bold tracking-wide text-rose-400 group-hover:text-white transition-colors">Admin Portal</span>
              <div className="absolute inset-0 rounded-full bg-rose-600/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t border-gray-900 z-10 relative bg-black/50 backdrop-blur-sm">
        <p className="text-gray-600">
          Powered by <span className="font-bold text-white">Young Warriors</span>
        </p>
      </footer>
    </div>
  );
}
