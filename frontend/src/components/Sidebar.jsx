import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, Wrench, Send, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Notification from './Notification';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Inward', path: '/inward', icon: <Upload size={18} /> },
    { name: 'Repair', path: '/repair', icon: <Wrench size={18} /> },
    { name: 'Outward', path: '/outward', icon: <Send size={18} /> },
  ];

  const [notification, setNotification] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      setNotification({
        message: 'Logged out successfully',
        type: 'success'
      });
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setNotification({
        message: 'Logout failed',
        type: 'error'
      });
    }
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 shadow-xl p-6 flex flex-col">
      <div className="mb-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-md mb-6">
  वक्रतुंड
</h1>

        <p className="text-lg text-gray-400 ml-10">Electronics Admin</p>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${location.pathname === item.path
                ? 'bg-purple-600'
                : 'hover:bg-gray-800'
              }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors mt-auto"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </aside>
  );
};

export default Sidebar;
