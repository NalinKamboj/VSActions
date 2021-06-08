import * as _vscode from "vscode";

declare global {
  const tsvscode: {
    type: ({command: string, value: any}) => void
  };
}