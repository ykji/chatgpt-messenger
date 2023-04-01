"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import ModelSelection from "./ModelSelection";

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          <>
            {loading ? (
              <p className="text-center text-gray-300 mt-10">Loading...</p>
            ) : (
              chats?.docs?.map((chat) => {
                return <ChatRow key={chat.id} id={chat.id} />;
              })
            )}
          </>
        </div>
      </div>
      {session?.user && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          // need to check
          src={session.user.image!}
          // style={{ background: 'url("public/not_found.png")' }}
          alt="profile pic"
          onClick={() => signOut()}
          className="h-14 w-14 mx-auto rounded-full cursor-pointer mb-2 hover:opacity-50"
        />
      )}
    </div>
  );
};

export default SideBar;
