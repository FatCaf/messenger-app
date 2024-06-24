import React, { FC } from 'react';
import { cancel, ok } from '../assets/assets';
import { MessageEditRequestDto } from '../types/types';
import ControlButton from './control-button';

type EditControlsProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setEditMessageClicked: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: (message: string) => void;
  data: MessageEditRequestDto;
};

const EditControls: FC<EditControlsProps> = ({
  setEditMessageClicked,
  setMessage,
  sendMessage,
  data
}) => {
  const handleClick = (action: string) => {
    switch (action) {
      case 'send':
        if (data.text) {
          console.log(data);
          sendMessage(JSON.stringify(data));
          setMessage('');
          setEditMessageClicked(false);
        }
        break;
      case 'cancel':
        setMessage('');
        setEditMessageClicked(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 absolute top-0 right-0">
      <ControlButton icon={ok} action="send" handleClick={handleClick} />
      <ControlButton icon={cancel} action="cancel" handleClick={handleClick} />
    </div>
  );
};

export default EditControls;
