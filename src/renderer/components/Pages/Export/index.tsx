/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsChevronDown, BsChevronRight, BsDashSquare } from 'react-icons/bs';
import { FaCheckSquare } from 'react-icons/fa';

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
    value: 'mars2',
    label: 'Mars2',
    children: [
      { value: 'phobos2', label: 'Phobos2' },
      { value: 'deimos2', label: 'Deimos2' },
    ],
  },
  {
    value: 'mars3',
    label: 'Mars3',
    children: [
      { value: 'phobos3', label: 'Phobos3' },
      { value: 'deimos3', label: 'Deimos3' },
    ],
  },
];

export default function Export() {
  const [checked, setChecked] = useState(['']);
  const [expanded, setExpanded] = useState(['']);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(checked, expanded);
  }, [checked, expanded]);

  return (
    <div className="page-common text-text-generic-color justify-center">
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
    </div>
  );
}
