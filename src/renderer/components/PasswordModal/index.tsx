/* eslint-disable no-console */
import { AiOutlineClose } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import Modal from 'react-modal';

interface Props {
  isModalOpen: boolean;
  passKey: string;
  onRequestClose: any;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    backgroundColor: '#23272a',
  },
};

export default function PasswordModal({
  isModalOpen,
  passKey,
  onRequestClose,
}: Props) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Password"
    >
      <div
        className="p-3 rounded-xl"
        style={{
          backgroundColor: '#2c2f33',
        }}
      >
        <span className="mr-3 text-text-generic-color">{passKey}</span>
        <div className="flex flex-row w-full justify-between pr-2">
          <div
            role="button"
            className="w-20 h-10 flex flex-row mt-5 pt-2 pl-2 cursor-pointer bg-gray-700 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(passKey);
            }}
            onKeyDown={() => undefined}
            tabIndex={0}
          >
            <MdContentCopy
              size={20}
              className="shadow-sm text-text-generic-color mr-1"
            />
            <p className="inline-block text-text-generic-color">Copy</p>
          </div>

          <AiOutlineClose
            onClick={onRequestClose}
            size={30}
            className="rounded-full mt-6 cursor-pointer bg-red-400 px-1"
          />
        </div>
      </div>
    </Modal>
  );
}
