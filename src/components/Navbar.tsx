import Link from "next/link";
import { usePathname } from "next/navigation"; // Use this for Next.js 13+


const Navbar = () => {
  const currentPath = usePathname(); // Get the current path
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        
        <img src="/logo.png" alt="Logo" className="h-8" />
        <Link href="/dashboard">
        <h1  className="text-lg font-bold">Optval</h1></Link>
        
      </div>

      {/* Right: Navigation Links */}
      <nav className="flex items-center space-x-4">
    
      <a
          href="/dashboard"
          className={`text-sm px-3 py-2 rounded-md ${
            currentPath === "/dashboard" ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"
          }`}
        >
              Dashboard
        </a>
        <a
          href="/view"
          className={`text-sm px-3 py-2 rounded-md ${
            currentPath === "/view" ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"
          }`}
        >
            View Projects
        </a>
        <a
          href="/tasks"
          className={`text-sm px-3 py-2 rounded-md ${
            currentPath === "/tasks" ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"
          }`}
        >
              Tasks
        </a>
        <a
          href="/history"
          className={`text-sm px-3 py-2 rounded-md ${
            currentPath === "/history" ? "bg-gray-800 text-white" : "hover:bg-gray-800 text-gray-300"
          }`}
        >
              History
        </a>
        <a href="#" className="text-sm text-white px-3 py-2 rounded-md hover:bg-gray-800 transition duration-200">
              Search
        </a>
        <a href="/help" className="text-sm text-white px-3 py-2 rounded-md hover:bg-gray-800 transition duration-200">
              Help
        </a>
        
        <Link href="/profile">
            <img
              src="/profile.png" // Replace with your profile image
              alt="Profile"
              className="w-10 h-9 hover:cursor-pointer"
            />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
