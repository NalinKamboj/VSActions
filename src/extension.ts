// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, extensions, window } from "vscode";
import { ActionsPanel } from "./ActionsPanel";
import { SidebarProvider } from "./SidebarProvider";

// Testing
import { API as GitAPI, GitExtension } from "./@types/git";
import { extensionQualifiedId } from "./constants";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Some QoL stuff from GitLens
  // const vsactions = extensions.getExtension(extensionQualifiedId);
  // const vsactionsVersion = vsactions?.packageJSON.version;

  const _root = context.extensionPath;

  console.log("Extension Activated. Path - " + _root);

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    window.registerWebviewViewProvider("vsactions-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    commands.registerCommand("vsactions.helloWorld", () => {
      ActionsPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("vsactions.refresh", async () => {
      // ActionsPanel.kill();
      // ActionsPanel.createOrShow(context.extensionUri);
      await commands.executeCommand("workbench.action.closeSidebar");
      commands.executeCommand(
        "workbench.view.extension.vsactions-sidebar-view"
      );

      // setTimeout(() => {
      // 	commands.executeCommand("workbench.action.webview.openDeveloperTools");
      // }, 500);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("vsactions.askQuestion", async () => {
      const answer = await window.showInformationMessage(
        "How was your day?",
        "Good",
        "Bad"
      );

      if (answer === "Bad") {
        window.showInformationMessage("Sorry to hear that :(");
      } else {
        console.log(answer);
      }
    })
  );

  // GitHub Token Set
  context.subscriptions.push(
    commands.registerCommand("vsactions.setToken", async () => {
      const token = await window.showInputBox({
        prompt: "Please enter the GitHub Token",
        title: "GitHub Token",
      });

      switch (token) {
        case undefined:
          window.showInformationMessage("Token set cancelled");
          break;
        case null:
          window.showInformationMessage("Please enter a token");
          break;
        case "":
          window.showInformationMessage("Empty bitch");
        default:
          // TODO Use regex match for token validity
          const prevToken = await context.workspaceState.get("ghToken");
          prevToken === undefined
            ? window.showInformationMessage("Old token not defined")
            : window.showInformationMessage("Old Token:" + prevToken);
          window.showInformationMessage("Not Empty bitch");
          await context.workspaceState.update("ghToken", token);
      }
    })
  );

  const gitExtension = extensions.getExtension<GitExtension>("vscode.git");
  var api;
  if (gitExtension !== undefined) {
    api = gitExtension.exports.getAPI(1);
  }
  if (api) {
    console.log("Git State: " + api.state);
    console.log("Git Repos:", api.repositories);
    console.log(api.repositories[0].state.remotes);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
