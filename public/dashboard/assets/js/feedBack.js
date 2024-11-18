import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  const handleFeedback = async (e) => {
    e.preventDefault();
    await axios.post('/api/feedback', { feedback });
  };

  return (
    <div>
      <h2>User Feedback</h2>
      <form onSubmit={handleFeedback}>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  const handleFeedback = async (e) => {
    e.preventDefault();
    await axios.post('/api/feedback', { feedback });
  };

  return (
    <div>
      <h2>User Feedback</h2>
      <form onSubmit={handleFeedback}>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};