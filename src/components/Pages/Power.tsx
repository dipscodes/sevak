import { useEffect, useState } from 'react';

export default function Power() {
  const [pulse, setPulse] = useState(true);
  let dStatus = 'off';
  return <div className="page-common">{dStatus}</div>;
}
