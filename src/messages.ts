"use strict";

import { ConfigurationTarget, env, MessageItem, Uri, window } from "vscode";

export class Messages {
  // static async showGenericErrorMessage(message: string): Promise<MessageItem | undefined> {

  // }

  static showGitDisabledErrorMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    // TODO Implement this!
    return await Messages.showMessage(message);
  }

  static async showMessage(message: string, args?: any): Promise<void> {
    // TODO Add implementation
  }
}
