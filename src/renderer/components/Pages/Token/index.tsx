import { useState, useContext } from 'react';
import ApiModal from 'renderer/components/ApiModal';
import MasterContext from 'renderer/Context';

export default function Token() {
  const [file, setFile] = useState('Import File');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('Key Not Added');
  const masterPassword = useContext(MasterContext);

  function onAddKey() {
    const key = (document.getElementById('token-key') as HTMLInputElement)
      .value;
    const name = (document.getElementById('token-name') as HTMLInputElement)
      .value;

    const passKey = (
      document.getElementById('token-password') as HTMLInputElement
    ).value;

    // eslint-disable-next-line no-console
    console.log(key, name);
    window.electron.setRawToken(name, key, passKey, masterPassword ?? '');
    setMessage('Key Added Succesfully');
  }

  return (
    <div className="page-common text-text-generic-color">
      <div className="flex flex-row justify-center pt-5 pb-5 bg-discord-bg-1 shadow-lg">
        <button
          className="discord-button mr-2"
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Token
        </button>
        <button
          className="discord-button ml-2"
          type="button"
          onClick={async () => {
            // const filePath = await window.electron.openFile();
            setFile(masterPassword ?? '');
            // eslint-disable-next-line no-console
            console.log(masterPassword);
          }}
        >
          {file}
        </button>
      </div>
      <ApiModal
        isModalOpen={isModalOpen}
        message={message}
        onAddKey={() => onAddKey()}
        onRequestClose={() => {
          setIsModalOpen(false);
          setMessage('Key Not Added');
        }}
      />
    </div>
  );
}
