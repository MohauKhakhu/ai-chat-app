import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

function Chat({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save user message
    await addDoc(collection(db, 'messages'), {
      text: message,
      sender: user.email,
      timestamp: new Date(),
    });

    // Simulate AI response
    await addDoc(collection(db, 'messages'), {
      text: `AI Insight: You said "${message}"! (For advanced AI, check https://x.ai/api)`,
      sender: 'AI',
      timestamp: new Date(),
    });

    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Chat with AI Insight</h2>
        <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-100 rounded">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded ${
                msg.sender === user.email ? 'bg-blue-200 ml-auto' : 'bg-green-200'
              }`}
            >
              <p className="font-bold">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-l"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;