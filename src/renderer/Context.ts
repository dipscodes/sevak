import { createContext, Context } from 'react';

const MasterContext: Context<string | null | undefined> = createContext<
  string | null | undefined
>(null);

const StatusContext: Context<string> = createContext<string>('');

export { MasterContext, StatusContext };
