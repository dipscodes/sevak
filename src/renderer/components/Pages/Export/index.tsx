import { useState, useContext } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import {
  AiOutlineDownload,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai';
import { BsChevronDown, BsChevronRight, BsDashSquare } from 'react-icons/bs';
import { FaCheckSquare } from 'react-icons/fa';
import PasswordModal from 'renderer/components/PasswordModal';
import TokenListDropdown from 'renderer/components/TokenListDropdown';
import MasterContext from 'renderer/Context';

const nodes = [
  {
    value: 'DropletActions',
    label: 'Droplet Actions',
    children: [
      { value: 'droplet_action-power_on', label: 'Power On' },
      { value: 'droplet_action-power_off', label: 'Power Off' },
      { value: 'droplet_action-reboot', label: 'Reboot' },
    ],
  },
  {
    value: 'DropletActions1',
    label: 'Droplet Actions',
    children: [
      { value: 'droplet_action-power_on1', label: 'Power On' },
      { value: 'droplet_action-power_off1', label: 'Power Off' },
      { value: 'droplet_action-reboot1', label: 'Reboot' },
    ],
  },
];

export default function Export() {
  const [checked, setChecked] = useState(['']);
  const [expanded, setExpanded] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passWordKey, setPassWordKey] = useState('');
  const masterPassword = useContext(MasterContext);

  async function exportEncryptedTokenFileFromPermissionString(): Promise<void> {
    const writePath = await window.electron.openFile();

    if (checked.length === 1 && checked[0] === '') {
      setPassWordKey(
        'A permission file can not be generated with no permissions list.'
      );
      setIsModalOpen(true);
      return;
    }

    const tokenName: string = (
      document.getElementById('selectToken') as HTMLSelectElement
    ).value;

    const passKey =
      await window.electron.exportEncryptedTokenFileFromPermissionString(
        writePath,
        checked,
        tokenName,
        masterPassword ?? ''
      );
    setPassWordKey(passKey);
    setIsModalOpen(true);
  }

  return (
    <div className="page-common text-text-generic-color justify-center">
      <TokenListDropdown />
      <CheckboxTree
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        icons={{
          check: <FaCheckSquare size={20} />,
          uncheck: <BsDashSquare size={20} />,
          halfCheck: <BsDashSquare size={20} />,
          expandClose: <BsChevronRight size={20} />,
          expandOpen: <BsChevronDown size={20} />,
          expandAll: <AiOutlinePlusSquare size={20} />,
          collapseAll: <AiOutlineMinusSquare size={20} />,
          parentClose: undefined,
          parentOpen: undefined,
          leaf: undefined,
        }}
        onCheck={(chk) => setChecked(chk)}
        onExpand={(exp) => setExpanded(exp)}
      />
      <PasswordModal
        isModalOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        passKey={passWordKey}
      />
      <AiOutlineDownload
        className="export-token-button group"
        size={50}
        onClick={() => exportEncryptedTokenFileFromPermissionString()}
      />
    </div>
  );
}
