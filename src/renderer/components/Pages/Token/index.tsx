import { useState, useContext } from 'react';
import ApiModal from 'renderer/components/ApiModal';
import MasterContext from 'renderer/Context';
import PasswordInputModal from 'renderer/components/PasswordInputModal';
import ListOfTokens from 'renderer/components/ListOfTokens';

export default function Token() {
  const [file, setFile] = useState('Import File');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('Key Not Added');
  const [isPasswordInputModal, setIsPasswordInputModal] = useState(false);
  const [fileMessage, setFileMessage] = useState('Add Password');
  const masterPassword = useContext(MasterContext);

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
    const name = (document.getElementById('file-name') as HTMLInputElement)
      .value;

    window.electron.setFileToken(
      file,
      passKey,
      masterPassword ?? '',
      name === '' ? undefined : name
    );
    setFileMessage('File Added Succesfully');
    setIsPasswordInputModal(false);
  }

  return (
    <div className="page-common">
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
            const filePath = await window.electron.getFilePath();
            setFile(filePath ?? '');
            setIsPasswordInputModal(true);
          }}
        >
          Import File
        </button>
        <button
          className="discord-button ml-2"
          type="button"
          onClick={async () => {
            const filePath = await window.electron.getListOfAllTokens();
            // eslint-disable-next-line no-console
            console.log(filePath);
          }}
        >
          Refresh
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
      <ListOfTokens />
    </div>
  );
}
