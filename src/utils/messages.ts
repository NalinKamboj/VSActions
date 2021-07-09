"use strict";

import { ConfigurationTarget, env, MessageItem, Uri, window } from "vscode";

export class Messages {
  // -----------------------------------------------------------------------------------------------------
  // Token Messages
  // -----------------------------------------------------------------------------------------------------
  static showEmptyTokenErrorMessage(): Promise<MessageItem | undefined> {
    return Messages.showMessage("error", "GitHub Token cannot be empty.");
  }

  static showTokenCancelledWarningMessage(): Promise<MessageItem | undefined> {
    return Messages.showMessage("warn", "GitHub Token set cancelled.");
  }

  // -----------------------------------------------------------------------------------------------------
  // Git Messages
  // -----------------------------------------------------------------------------------------------------
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

  // -----------------------------------------------------------------------------------------------------
  // Generic Messages
  // -----------------------------------------------------------------------------------------------------
  static async showGenericErrorMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    return await Messages.showMessage("error", message);
  }

  static async showGenericInformationMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    return await Messages.showMessage("info", message);
  }

  static async showGenericWarningMessage(
    message: string
  ): Promise<MessageItem | undefined> {
    return await Messages.showMessage("warn", message);
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
