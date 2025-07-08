const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">Rent</div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-blue-600">Buy</a>
          <a href="#" className="hover:text-blue-600">Rent</a>
          <a href="#" className="hover:text-blue-600">Commercial</a>
          <a href="#" className="hover:text-blue-600">Projects</a>
          <a href="#" className="hover:text-blue-600">Agents</a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Post Property
          </button> */}
          <a href="/createProperty" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">Post Property</a>

          <a className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/login">
            Login / Signup
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
