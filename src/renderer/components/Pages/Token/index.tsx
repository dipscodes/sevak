import { useState, useContext } from 'react';
import TokenModal from 'renderer/components/TokenModal';
import { MasterContext } from 'renderer/Context';
import PasswordInputModal from 'renderer/components/PasswordInputModal';
import ListOfTokens from 'renderer/components/ListOfTokens';

export default function Token() {
  const [file, setFile] = useState('Import File');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('Key Not Added');
  const [isPasswordInputModal, setIsPasswordInputModal] = useState(false);
  const [fileMessage, setFileMessage] = useState('Add Password');
  const [refresh, setRefresh] = useState(0);
  const masterPassword = useContext(MasterContext);

  function onAddKey() {
    const key = (document.getElementById('token-key') as HTMLInputElement)
      .value;
    const name = (document.getElementById('token-name') as HTMLInputElement)
      .value;

    window.electron.setRawToken(name, key, masterPassword);
    setMessage('Key Added Succesfully');
    setIsModalOpen(false);
    setRefresh((prev) => (prev + 1) % 2);
  }

  function onAddMessage() {
    const passKey = (
      document.getElementById('file-password') as HTMLInputElement
    ).value;
    const name = (document.getElementById('file-name') as HTMLInputElement)
      .value;

    window.electron.setFileToken(
      file,
      passKey,
      masterPassword,
      name === '' ? undefined : name
    );
    setFileMessage('File Added Succesfully');
    setIsPasswordInputModal(false);
    setRefresh((prev) => (prev + 1) % 2);
  }

  const toggleRefresh = () => {
    setRefresh((prev) => (prev + 1) % 2);
  };

  return (
    <div className="page-common">
      <div className="flex flex-row justify-center pt-5 pb-5 h-[80px] bg-discord-bg-1 shadow-lg">
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
          className="discord-button ml-2 mr-2"
          type="button"
          onClick={async () => {
            const filePath = await window.electron.getFilePath();
            setFile(filePath ?? '');
            setIsPasswordInputModal((filePath || false) && true);
          }}
        >
          Import File
        </button>
        <button
          className="discord-button ml-2"
          type="button"
          onClick={async () => {
            setRefresh((prev) => (prev + 1) % 2);
          }}
        >
          Refresh
        </button>
      </div>
      <TokenModal
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
      <ListOfTokens key={refresh} toggleRefresh={toggleRefresh} />
    </div>
  );
}
