import React from 'react';
import image from './images/Salon.jpg.webp';
import './App.css';
import ChatBotRobot from './Chatbot.compoenent';

function App() {
  return (
    <span>
      <div className="App" style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
        <header className="App-header">
          <h3> THE HAIR LAB. </h3>
          <p> Welcomes you's to the smart assistance by our Rem the Advisor for your hair. </p>
        </header>
      </div>
      <ChatBotRobot />
    </span>
  );
}

export default App;
