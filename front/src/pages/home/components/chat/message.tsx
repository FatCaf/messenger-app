import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from '../../../../types/types';
import { processLastMessageTimestamp } from '../../../../utils/process-last-message';

type MsgProps = Message & {
  onDelete: (action: string, messageId: string) => void;
  onEdit: (messageId: string, messageText: string) => void;
};

const Msg: FC<MsgProps> = ({
  messageId,
  senderId,
  text,
  timestamp,
  attachments,
  onDelete,
  onEdit
}) => {
  const [messageClicked, setMessageClicked] = useState(false);
  const { userId } = useParams();

  const handleClick = () => {
    if (userId && userId === senderId) setMessageClicked(!messageClicked);
  };

  return (
    <div
      className={`w-full flex items-center ${userId === senderId ? 'justify-end' : 'justify-start'}`}
    >
      <div
        onClick={handleClick}
        className={`rounded-[24px]
    ${userId === senderId ? 'bg-slate-800' : 'bg-sky-800'} relative p-4 cursor-pointer
    min-w-fit flex flex-col gap-2`}
      >
        <p className='max-w-[300px] break-words'>{text}</p>
        <div className="flex gap-2 items-center flex-wrap">
          {attachments.length > 0 &&
            attachments.map((attach, index) => (
              <img
                key={`${`${index}img`}`}
                src={attach}
                alt="img"
                className='block'
                width={150}
                height={150}
              />
            ))}
        </div>
        <p className='text-right'>{processLastMessageTimestamp(timestamp)}</p>
        {messageClicked && (
          <div className="rounded-[20px] absolute w-[150px] flex flex-col justify-center items-center bg-inherit z-10 left-[-155px] top-0">
            <button
              type="button"
              className="p-1 bg-amber-400 w-full rounded-t-[20px] text-black"
              onClick={() => onEdit(messageId, text)}
            >
              Edit
            </button>
            <hr />
            <button
              type="button"
              className="p-1 bg-red-400 w-full rounded-b-[20px] text-black"
              onClick={() => onDelete('delete', messageId)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Msg;
