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
import TopBar from 'renderer/components/TopBar';
import MasterContext from 'renderer/Context';

export default function Export() {
  const [checked, setChecked] = useState(['']);
  const [expanded, setExpanded] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passWordKey, setPassWordKey] = useState('');
  const [nodes, setNodes] = useState([{}]);
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
      <TopBar>
        <TokenListDropdown className="mr-4" />
        <button
          type="button"
          className="discord-button ml-4"
          onClick={async () => {
            // setRefresh((prev) => (prev + 1) % 2);
            setNodes([{}]);
            const tokenName: string = (
              document.getElementById('selectToken') as HTMLSelectElement
            ).value;
            const checkboxNodes =
              await window.electron.getTokenSpecificCheckboxNode(
                tokenName,
                masterPassword ?? ''
              );
            setNodes(checkboxNodes);
          }}
        >
          Show Permissions
        </button>
      </TopBar>
      <div>
        <CheckboxTree
          // @ts-ignore
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
    </div>
  );
}
