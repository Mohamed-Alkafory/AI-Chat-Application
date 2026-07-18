import Chat from "@/components/chat/Chat";
import Navbar from "@/components/layout/Navbar";

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-dvh pt-16">
        <Chat />
      </div>
    </>
  );
}
