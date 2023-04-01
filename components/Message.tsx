/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase/firestore";

type Props = { message: DocumentData };

const Message = ({ message }: Props) => {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-q-2xl mx-auto">
        <img src={message.user.image} alt="" className="h-8 w-8" />
        <p className="pt-1 text-sm ">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
