import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans antialiased">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-16 py-5 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-semibold font-serif">NoteNest</div>
        <nav className="hidden md:flex space-x-8 text-sm text-gray-600">
          <Link to='/signup' className="hover:text-black transition">Signup</Link>
          <Link to='/login' className="hover:text-black transition">Login</Link>
        </nav>
      </header>

        <section className="px-6 md:px-24 py-28 text-center bg-[#fafafa] border-t border-gray-200">
        <h2 className="text-3xl md:text-5xl font-serif font-medium leading-snug">
          One calm place<br />for everything in your head.
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
          Organize, reflect, and build your second brain with NoteNest.
        </p>
        <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg font-medium text-sm hover:bg-gray-800 transition">
          Start Writing
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 md:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            {
              title: "🧠 Minimal by Design",
              desc: "A clean and quiet workspace that helps you focus deeply."
            },
            {
              title: "🔒 Private & Secure",
              desc: "Everything you write stays private, always encrypted."
            },
            {
              title: "☁️ Sync Everywhere",
              desc: "Access your notes from any device, automatically synced."
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-[#fdfdfd] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} NoteNest. Calm productivity redefined.
      </footer>
    </div>
  );
};

export default LandingPage;
