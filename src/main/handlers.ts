import { dialog } from 'electron';
import * as fs from 'fs/promises';

async function handleFileOpen(): Promise<string> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
  });
  if (canceled) {
    return 'No file was selected';
  }

  const fileContents = await fs.readFile(filePaths[0], { encoding: 'utf-8' });
  return fileContents;
}

// eslint-disable-next-line import/prefer-default-export
export { handleFileOpen };
