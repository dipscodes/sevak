/* eslint-disable no-console */
// import { useEffect } from 'react';
import { AiOutlineClose, AiOutlineKey } from 'react-icons/ai';
import Modal from 'react-modal';

interface Props {
  isModalOpen: boolean;
  message: string;
  onAddKey: any;
  onRequestClose: any;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
  },
};

export default function ApiModal({
  isModalOpen,
  message,
  onAddKey,
  onRequestClose,
}: Props) {
  return (
    <Modal
      className="bg-discord-bg-1 absolute  w-7/12 h-auto Overlay"
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Password"
    >
      <div className="rounded-xl pt-5 text-center">
        <div className="flex flex-row w-full pl-5 pr-5 pb-2 justify-between">
          <AiOutlineKey size={30} className="text-discord-cross-color" />
          <span className="text-discord-text-color-1">{message}</span>
          <AiOutlineClose
            onClick={onRequestClose}
            size={30}
            className="cursor-pointer text-discord-cross-color"
          />
        </div>
        <div className="pt-4 pl-8 pr-8">
          <input
            type="password"
            id="token-key"
            className="discord-large-input"
            placeholder="Token Key"
          />
        </div>
        <div className="pt-4 pl-8 pr-8">
          <input
            type="text"
            id="token-name"
            className="discord-large-input"
            placeholder="Name"
          />
        </div>
        <div className="pt-4 pl-8 pr-8">
          <input
            type="password"
            id="token-password"
            className="discord-large-input"
            placeholder="Password"
          />
        </div>
        <div
          role="button"
          className="addKeyText mb-8"
          onClick={onAddKey}
          onKeyDown={() => undefined}
          tabIndex={0}
        >
          Add Key
        </div>
      </div>
    </Modal>
  );
}
