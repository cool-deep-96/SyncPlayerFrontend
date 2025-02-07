"use client";
import { useSocketUser } from "./../SocketContextProvider/SocketContext";
import Waiting from "./Waiting"; // Import the Waiting component
import { Ui } from "./Ui";
import { VideoProvider } from "./VideoPlayer/VideoPlayerContext";
import ChatProvider from "./Chat/ChatProvider";
import MemberProvider from "./Members/MemberProvider";

export default function Room() {
  const { tokenData } = useSocketUser()!;

  return (
    <section className="">
      {/* Conditionally render the Waiting component based on the user's approval status */}
      {!tokenData?.isMember ? (
        <Waiting />
      ) : (
        <VideoProvider>
          <ChatProvider>
            <MemberProvider>
              <Ui />
            </MemberProvider>
          </ChatProvider>
        </VideoProvider>
      )}
    </section>
  );
}
