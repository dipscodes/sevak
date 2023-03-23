/* eslint-disable no-console */
// import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

interface Props {
  isModalOpen: boolean;
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

export default function ApiModal({ isModalOpen, onRequestClose }: Props) {
  return (
    <Modal
      className="bg-discord-bg-1 absolute  w-7/12 h-80 Overlay"
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Password"
    >
      <div className="rounded-xl pt-5 text-center">
        <div className="flex flex-row w-full justify-end pr-5 pb-2">
          <AiOutlineClose
            onClick={onRequestClose}
            size={30}
            className="rounded-full cursor-pointer text-discord-cross-color"
          />
        </div>
        <div className="pt-4 pl-8 pr-8">
          <input
            type="password"
            id="large-input"
            className="placeholder-gray-600 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Token Key"
          />
        </div>
        <div className="pt-4 pl-8 pr-8">
          <input
            type="text"
            id="large-input"
            className="placeholder-gray-600 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
          />
        </div>
        <p className="inline-block text-discord-text-color-1 mt-8 hover:underline cursor-pointer font-bold">
          Add Key
        </p>
      </div>
    </Modal>
  );
}
