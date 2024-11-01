import { SendHorizontal, Smile } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "./ChatProvider";

const InputBox = () => {
  const { sendMessage } = useChat(); // Assuming sendMessage is a function to send the chat message
  const [message, setMessage] = useState<string>(""); // State to hold the input value

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      sendMessage(message); // Call sendMessage with the current input value
      setMessage(""); // Clear input after sending message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      {/* Left Icon */}
      <div className="absolute h-full w-auto items-center flex flex-col justify-center">
        <Smile color="black" className="mx-3" />
      </div>

      {/* Right Icon (Send button) */}
      <div className="absolute right-0 h-full w-auto items-center flex flex-col justify-center">
        <button type="submit" className="mx-3 p-1">
          <SendHorizontal color="black" />
        </button>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message state on input change
        placeholder="Type your message here..."
        className="w-full bg-white text-black py-4 lg:py-5 px-12 rounded-lg text-lg"
      />
    </form>
  );
};

export default InputBox;
