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
  { value: 'token', label: 'token' },
  { value: 'name', label: 'name' },
  { value: 'is_raw_token', label: 'is_raw_token' },
  {
    value: 'permissions',
    label: 'permissions',
    children: [
      {
        value: 'permissions~droplets',
        label: 'droplets',
        children: [
          {
            value: 'permissions~droplets~342253375',
            label: 'LyadhCraft',
            children: [
              {
                value: 'permissions~droplets~342253375~power_on',
                label: 'power_on',
              },
              {
                value: 'permissions~droplets~342253375~power_off',
                label: 'power_off',
              },
              {
                value: 'permissions~droplets~342253375~reboot',
                label: 'reboot',
              },
            ],
          },
          {
            value: 'permissions~droplets~342266580',
            label: 'TestCraft',
            children: [
              {
                value: 'permissions~droplets~342266580~power_on',
                label: 'power_on',
              },
              {
                value: 'permissions~droplets~342266580~power_off',
                label: 'power_off',
              },
              {
                value: 'permissions~droplets~342266580~reboot',
                label: 'reboot',
              },
            ],
          },
          {
            value: 'permissions~droplets~344100833',
            label: 'CreateCraft',
            children: [
              {
                value: 'permissions~droplets~344100833~power_on',
                label: 'power_on',
              },
              {
                value: 'permissions~droplets~344100833~power_off',
                label: 'power_off',
              },
              {
                value: 'permissions~droplets~344100833~reboot',
                label: 'reboot',
              },
            ],
          },
        ],
      },
      { value: 'permissions~ssh_keys', label: 'ssh_keys', children: [] },
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
