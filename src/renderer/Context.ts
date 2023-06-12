import { createContext, Context } from 'react';

const MasterContext: Context<string> = createContext<string>('');

const StatusContext: Context<any> = createContext<any>({});
const SetStatus: Context<Function> = createContext<Function>(() => {});

export { MasterContext, StatusContext, SetStatus };
