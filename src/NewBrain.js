import React, { useState, useEffect } from 'react';
import * as brain from 'brain.js';

const NewBrain = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [net, setNet] = useState(null);

  useEffect(() => {
    // Training data for the chatbot

    const trainingData = [
        { input: 'hi', output: 'Hello there!' }, 
        { input: 'hello', output: 'Hi! How can I assist you?' },
        { input: 'hey', output: 'Hey! How may I help you?' },
        { input: 'how are you', output: 'I am just a bot, but thanks for asking!' },
        { input: 'what is your name', output: 'I am ChatBot, your virtual assistant.' },
        { input: 'bye', output: 'Goodbye! Have a great day!' },
        { input: 'see you later', output: 'See you later! Take care.' },
      ];

    // Create and train the neural network
    const chatBotNet = new brain.recurrent.LSTM();
    chatBotNet.train(trainingData);

    setNet(chatBotNet);
  }, []);

  const handleSendMessage = () => {
    if (!net) {
      return;
    }

    const output = net.run(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, type: 'user' },
      { text: output, type: 'bot' },
    ]);

    setInput('');
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', color: message.type === 'bot' ? 'green' : 'blue' }}>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default NewBrain;
