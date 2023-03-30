import { useState, useContext } from 'react';
import ApiModal from 'renderer/components/ApiModal';
import MasterContext from 'renderer/Context';
import PasswordInputModal from 'renderer/components/PasswordInputModal';

export default function Token() {
  const [file, setFile] = useState('Import File');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('Key Not Added');
  const masterPassword = useContext(MasterContext);
  const [isPasswordInputModal, setIsPasswordInputModal] = useState(false);
  const [fileMessage, setFileMessage] = useState('Add Password');

  function onAddKey() {
    const key = (document.getElementById('token-key') as HTMLInputElement)
      .value;
    const name = (document.getElementById('token-name') as HTMLInputElement)
      .value;

    const passKey = (
      document.getElementById('token-password') as HTMLInputElement
    ).value;

    window.electron.setRawToken(name, key, passKey, masterPassword ?? '');
    setMessage('Key Added Succesfully');
  }

  function onAddMessage() {
    const passKey = (
      document.getElementById('file-password') as HTMLInputElement
    ).value;

    window.electron.setFileToken(file, passKey, masterPassword ?? '');
    setFileMessage('File Added Succesfully');
    setIsPasswordInputModal(false);
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
            const filePath = await window.electron.openFile();
            setFile(filePath ?? '');
            setIsPasswordInputModal(true);
          }}
        >
          Import File
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
      <PasswordInputModal
        isModalOpen={isPasswordInputModal}
        message={fileMessage}
        onAddKey={() => onAddMessage()}
        onRequestClose={() => {
          setIsPasswordInputModal(false);
          setMessage('Add Password');
        }}
      />
    </div>
  );
}
