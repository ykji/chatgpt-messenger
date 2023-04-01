"use client";

import useSWR from "swr";
import { toast } from "react-hot-toast";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase";
import ModelSelection from "./ModelSelection";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    console.log("Sending message now");
    setLoading(true);

    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        image: session?.user?.image!,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading(
      "ChatGPT is preparing to fill in you with knowledge..."
    );

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    })
      .then(() => {
        setLoading(false);
        toast.success("Grab the info now.", { id: notification });
      })
      .catch((error) => {
        console.log("error in fetch :", error.message);
      });
  };

  return (
    <div className="text-gray-400 bg-gray-700/50 rounded-lg text-sm m-3">
      <form className="p-4 space-x-5 flex" onSubmit={sendMessage}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          disabled={loading}
          placeholder="Type your message here..."
          className="bg-transparent focus:outline-none flex-1"
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>

      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;
