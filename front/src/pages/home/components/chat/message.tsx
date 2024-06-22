import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '../../../../types/types';

const Msg: FC<Message> = ({ senderId, text, timestamp, attachments }) => {
  const [messageClicked, setMessageClicked] = useState(false);
  const { userId } = useParams();

  return (
    <div
      onClick={() => setMessageClicked(!messageClicked)}
      className={`rounded-[24px] border 
    ${userId === senderId ? 'self-end bg-violet-700' : 'self-start bg-blue-700'} relative p-2 cursor-pointer
    w-fit`}
    >
      <p>{text}</p>
      <p>{}</p>
      {messageClicked && (
        <div className="rounded-[20px] border absolute w-[100px] flex flex-col justify-center items-center bg-inherit z-10">
          <button type="button" className="p-1">
            Edit
          </button>
          <hr />
          <button type="button" className="p-1">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Msg;
