import { createContext, Context } from 'react';

const MasterContext: Context<string | null | undefined> = createContext<
  string | null | undefined
>(null);

export default MasterContext;
