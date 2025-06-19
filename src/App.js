import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg-image.jpg')" }}>
        <Navbar user={user} />
        <Routes>
          <Route path="/signup" element={user ? <Navigate to="/chat" /> : <SignUp />} />
          <Route path="/signin" element={user ? <Navigate to="/chat" /> : <SignIn />} />
          <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/signin" />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;