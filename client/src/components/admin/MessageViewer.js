import React, { useState, useEffect } from 'react';
import { getAdminMessages } from '../../services/adminService';
import './MessageViewer.css';

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await getAdminMessages();
        setMessages(response.data);
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="message-viewer">
      <h2>Contact Form Messages</h2>
      {messages.length === 0 ? (
        <p>No messages have been received yet.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg._id} className="message-item">
              <div className="message-header">
                <span className="message-sender"><strong>From:</strong> {msg.name} ({msg.email})</span>
                <span className="message-date">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="message-body">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageViewer;