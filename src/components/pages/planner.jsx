import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '../ui/button';
import { Selectbudgetlist, SelectTravelLinst } from '../../constants/options';
import { useNavigate } from 'react-router-dom';

const ChatMessage = ({ message, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const words = message.split(' ');
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + (index === 0 ? '' : ' ') + words[index]);
        index++;
      } else {
        clearInterval(interval);
        onComplete && onComplete(); // Trigger next step when message completes
      }
    }, 100); // Adjust speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center space-x-4 p-4">
      {/* Character Image */}
      <img
        src="/your-character.png" // Replace with actual image path
        alt="Character"
        className="w-24 h-auto"
      />

      {/* Chat Bubble */}
      <div className="bg-white p-4 rounded-lg shadow-md max-w-sm border border-gray-300">
        <p className="text-lg font-semibold">{displayedText}</p>
      </div>
    </div>
  );
};

const PlannerPage = () => {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({});
  const navigate = useNavigate();

  const handleSelect = (key, value) => {
    setTripData((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="max-w-lg mx-auto p-5 mt-10">
      {step === 1 && (
        <ChatMessage
          message="Where do you want to go?"
          onComplete={() => console.log('Message completed')}
        />
      )}
      {step === 1 && (
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            onChange: (v) => handleSelect('location', v.label),
          }}
        />
      )}

      {step === 2 && (
        <ChatMessage message={`Cool! ${tripData.location} is a great place! 🎉 Now, let's set your budget.`} />
      )}
      {step === 2 && (
        <div className="grid grid-cols-3 gap-4 mt-5">
          {Selectbudgetlist.map((item) => (
            <button
              key={item.title}
              className="p-4 border rounded-lg hover:shadow-lg"
              onClick={() => handleSelect('budget', item.title)}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
            </button>
          ))}
        </div>
      )}

      {step === 3 && <ChatMessage message="Great! What's your travel group?" />}
      {step === 3 && (
        <div className="grid grid-cols-3 gap-4 mt-5">
          {SelectTravelLinst.map((item) => (
            <button
              key={item.people}
              className="p-4 border rounded-lg hover:shadow-lg"
              onClick={() => handleSelect('travelGroup', item.people)}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
            </button>
          ))}
        </div>
      )}

      {step === 4 && <ChatMessage message="Awesome! Let’s plan your itinerary..." />}
      {step === 4 && (
        <Button onClick={() => navigate('/view-trip')}>Generate Trip</Button>
      )}
    </div>
  );
};

export default PlannerPage;
