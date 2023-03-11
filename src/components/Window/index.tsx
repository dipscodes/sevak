import Sidebar from 'components/sideBar';
import Page from 'components/Page';
import { useState } from 'react';

export default function Window() {
  const [pageView, setPageView] = useState('token');

  return (
    <div className="flex flex-row">
      <Sidebar setPageView={setPageView} />
      <Page pageView={pageView} />
    </div>
  );
}
