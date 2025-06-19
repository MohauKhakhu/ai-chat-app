import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" className="w-10 mr-2" />
        <h1 className="text-xl font-bold">AI Chat App</h1>
      </div>
      <div>
        {user ? (
          <button onClick={handleSignOut} className="bg-red-500 p-2 rounded hover:bg-red-600">
            Sign Out
          </button>
        ) : (
          <div>
            <button onClick={() => navigate('/signin')} className="mr-2 hover:underline">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="hover:underline">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;