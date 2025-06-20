import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null); // Mock user state

  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')" }}>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/signup" element={user ? <Navigate to="/chat" /> : <SignUp setUser={setUser} />} />
          <Route path="/signin" element={user ? <Navigate to="/chat" /> : <SignIn setUser={setUser} />} />
          <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/signin" />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;