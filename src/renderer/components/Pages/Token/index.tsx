import { useState } from 'react';

export default function Token() {
  const [file, setFile] = useState('Select token file');
  return (
    <div className="page-common text-text-generic-color">
      <button
        type="button"
        onClick={async () => {
          const filePath = await window.electronAPI.openFile();
          setFile(filePath);
        }}
      >
        {file}
      </button>
    </div>
  );
}
