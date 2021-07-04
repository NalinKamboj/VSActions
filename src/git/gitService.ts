"use strict";
import { Extension, extensions } from "vscode";
import {
  API as DefaultGitApi,
  Repository as DefaultRepository,
  GitExtension,
} from "../@types/git";

// TODO Maybe use a better implementation of service in future...like one from GitLens
// export class GitService implements Disposable {
//   private _onDidChangeRepositories = new EventEmitter<void>();

//   get onDidChangeRepositories(): Event<void> {
//     return this._onDidChangeRepositories.event;
//   }

//   private readonly _disposable: Disposable;

//   constructor() {
//     this._disposable = Disposable.from(
//       // window.onDidChangeWindowState(this.onWindowStateChanged, this)

//     )
//   }

//   static async getDefaultGitApi(): Promise<DefaultGitApi | undefined> {
//     try {
//       const extension = extensions.getExtension('vscode.git') as Extension<GitExtension>;
//       if (extension !== undefined) {
//         const gitExtension = extension.isActive ? extension.exports : await extension.activate();
//         return gitExtension.getAPI(1);
//       }
//     } catch {}
//     return undefined;
//   }
// }

async function getDefaultGetApi(): Promise<DefaultGitApi | undefined> {
  try {
    const extension = extensions.getExtension(
      "vscode.git"
    ) as Extension<GitExtension>;
    if (extension !== undefined) {
      const gitExtension = extension.isActive
        ? extension.exports
        : await extension.activate();
      return gitExtension.getAPI(1);
    }
  } catch {}
  return undefined;
}

export default [getDefaultGetApi];
