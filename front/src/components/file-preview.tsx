import { FC } from 'react';

type FilePreviewProps = {
  attachments: string[];
};

const FilePreview: FC<FilePreviewProps> = ({ attachments }) => (
  <div className="flex items-center gap-2 rounded-[20px] p-2 bg-slate-500 w-full">
    {attachments.map((attach, index) => (
      <img
        key={`${`${index}img`}`}
        src={attach}
        alt="img"
        width={75}
        height={75}
      />
    ))}
  </div>
);

export default FilePreview;
