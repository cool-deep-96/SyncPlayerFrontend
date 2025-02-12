import { CheckIcon, CircleUserRound, Edit, Trash } from "lucide-react";
import { Message, useChat } from "./ChatProvider";
import { useEffect, useRef, useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { formatAMPM } from "@/utils/utils";

interface MessageProps {
  message: Message;
}

const MessageComp = ({ message }: MessageProps) => {
  return (
    <div className={`flex  gap-2 w-fit my-2 max-w-[80%] select-none`}>
      <CircleUserRound className="w-4 h-6 lg:w-6 lg:h-6" />
      <div className="relative bg-[#6A6767] lg:p-2 p-1 rounded-lg min-w-20">
        <p className="absolute lg:text-xs text-[0.60rem] font-medium right-1 bottom-1 lg:right-2 lg:bottom-2 opacity-60 whitespace-nowrap">
          {formatAMPM(message.time)}
        </p>
        <p className="text-[#FA5F05] text-sm">{message.sentByUserName}</p>
        <p className="text-white pb-4 text-sm lg:text-base">{message.text}</p>
      </div>
    </div>
  );
};

interface SelfMessageProps {
  message: Message;
}

const SelfMessage = ({ message }: SelfMessageProps) => {
  const { updateMessage, deleteMessage } = useChat();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState(message.text);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleUpdateMessage = () => {
    if (editedMessage.trim()) {
      updateMessage(message.id, editedMessage);
      setIsEditing(false);
    }
  };

  const handleDeleteMessage = () => {
    deleteMessage(message.id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopupVisible &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="select-none relative flex justify-self-end gap-2 w-fit my-2 max-w-[80%] min-w-20">
      <div
        className={`relative bg-[#6A6767] lg:p-2 p-1 rounded-lg min-w-20 cursor-pointer  border border-transparent ${isPopupVisible && 'border-white'}`}
        onClick={togglePopup}
      >
        {/* Display time and message */}
        <p className="absolute text-xs font-light right-1 bottom-1 lg:right-2 lg:bottom-2 opacity-60 whitespace-nowrap">
          {formatAMPM(message.time)}
        </p>

        {/* If editing, show input box for editing */}
        {isEditing ? (
          <div className="flex gap-2 ">
            <input
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="text-white bg-[#6A6767] focus:outline-none  text-sm lg:text-base px-1 rounded"
            />
            <button
              onClick={handleUpdateMessage}
              className=" text-white bg-blue-500 p-1 rounded"
            >
              <CheckIcon />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className=" text-white bg-red-500 p-1 rounded"
            >
              <Cross1Icon />
            </button>
          </div>
        ) : (
          <p className="text-white text-sm lg:text-base pb-4">{message.text}</p>
        )}
      </div>

      {/* Popup menu for Edit/Delete */}
      {isPopupVisible && !isEditing && (
        <div
          className="absolute bottom-0 right-[100%] flex  shadow-lg p-2 rounded-lg z-10"
          onClick={(e) => e.stopPropagation()}
          ref={popupRef}
        >
          <button
            className="block w-full text-left p-1 hover:bg-black/90"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={20} />
          </button>
          <button
            className="block w-full text-left p-1 hover:bg-black/90"
            onClick={handleDeleteMessage}
          >
            <Trash className="text-red-600" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageComp;
export { SelfMessage };
