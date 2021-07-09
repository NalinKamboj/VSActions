"use strict";

import { ConfigurationTarget, env, MessageItem, Uri, window } from "vscode";

export class Messages {
  static showGitDisabledErrorMessage(): Promise<MessageItem | undefined> {
    return Messages.showMessage(
      "error",
      "VSActions requires Git to be enabled. Please re-enable Git \u2014 set `git.enabled` to true and reload"
    );
  }

  static showNoRepositoryWarningMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    return Messages.showMessage("warn", `${message}. No repository found.`);
  }

  static async showGenericErrorMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    const result = await Messages.showMessage("error", message);
    return result;
  }

  // TODO Add implementation to work with some actions
  private static async showMessage(
    type: "info" | "warn" | "error",
    message: string,
    ...actions: MessageItem[]
  ): Promise<MessageItem | undefined> {
    let result: MessageItem | undefined = undefined;

    switch (type) {
      case "info":
        result = await window.showInformationMessage(message, ...actions);
        break;
      case "warn":
        result = await window.showWarningMessage(message, ...actions);
        break;
      case "error":
        result = await window.showErrorMessage(message, ...actions);
        break;
    }

    return result;
  }
}
