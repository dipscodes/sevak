import Sidebar from 'components/sideBar';
import { useState } from 'react';
import Power from 'components/Pages/power';

export default function Window() {
  const [pageView, setPageView] = useState('token');

  return (
    <div className="flex flex-row">
      <Sidebar setPageView={setPageView} />
      {/* <Page pageView={pageView} /> */}
      <Power />
    </div>
  );
}
