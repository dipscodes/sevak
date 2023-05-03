import { createContext, Context } from 'react';

const MasterContext: Context<string | null | undefined> = createContext<
  string | null | undefined
>(null);

const StatusContext: Context<any> = createContext<any>({});
const SetStatus: Context<Function> = createContext<Function>(() => {});

export { MasterContext, StatusContext, SetStatus };
