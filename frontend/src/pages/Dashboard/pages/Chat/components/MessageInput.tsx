import { BsSend } from 'react-icons/bs';

const MessageInput = () => {
  return (
    <div className="px-4 my-3">
      <div className="w-full relative">
        <input type="text" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-whtie" placeholder="sent a message" />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;