// import fs from 'fs';
import {
  AiOutlinePoweroff,
  AiOutlineKey,
  AiOutlineApi,
  AiOutlinePlusCircle,
  AiOutlineExport,
} from 'react-icons/ai';
import { BsDroplet } from 'react-icons/bs';

export default function getAllPages(): Object {
  //   const allPages = fs
  //     .readdirSync('components/Pages', {
  //       withFileTypes: true,
  //     })
  //     .filter((dirent: any) => dirent.isDirectory());
  //   return allPages;
  const sideBarIcons = {
    Token: <AiOutlineApi size={30} />,
    Power: <AiOutlinePoweroff size={30} />,
    Droplet: <BsDroplet size={30} />,
    Key: <AiOutlineKey size={30} />,
    Import: <AiOutlinePlusCircle size={30} />,
    Export: <AiOutlineExport size={30} />,
  };
  return sideBarIcons;
}
