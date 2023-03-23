import { useState } from 'react';

export default function Token() {
  const [file, setFile] = useState('Select token file');
  return (
    <div className="page-common text-text-generic-color">
      <div className="flex flex-row justify-center pt-5 pb-5 bg-discord-bg-1 shadow-lg">
        <button
          className="discord-button mr-2"
          type="button"
          onClick={async () => {
            const filePath = await window.electron.openFile();
            setFile(filePath);
          }}
        >
          {file}
        </button>
        <button
          className="discord-button ml-2"
          type="button"
          onClick={async () => {
            const filePath = await window.electron.openFile();
            setFile(filePath);
          }}
        >
          {file}
        </button>
      </div>
    </div>
  );
}
