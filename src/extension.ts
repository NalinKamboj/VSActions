// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ActionsPanel } from "./ActionsPanel";
import { SidebarProvider } from "./SidebarProvider";
import { WorkflowDataProvider } from "./WorkflowDataProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vsactions-sidebar",
      sidebarProvider
    )
  );

<<<<<<< Updated upstream
	// TODO Implement TreeView!

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("vsactions-sidebar", sidebarProvider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vsactions.helloWorld', () => {
			ActionsPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vsactions.refresh', async () => {
			// ActionsPanel.kill();
			// ActionsPanel.createOrShow(context.extensionUri);
			await vscode.commands.executeCommand("workbench.action.closeSidebar");
			vscode.commands.executeCommand("workbench.view.extension.vsactions-sidebar-view");
			
			// setTimeout(() => {
			// 	vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			// }, 500);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vsactions.askQuestion", async () => {
			const answer = await vscode.window.showInformationMessage("How was your day?", "Good", "Bad");

			if (answer === 'Bad') {
				vscode.window.showInformationMessage("Sorry to hear that :(");
			}
			else {
				console.log(answer);
			}
		})
	);
=======
  context.subscriptions.push(
    vscode.commands.registerCommand("vsactions.helloWorld", () => {
      ActionsPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vsactions.refresh", async () => {
      // ActionsPanel.kill();
      // ActionsPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      vscode.commands.executeCommand(
        "workbench.view.extension.vsactions-sidebar-view"
      );

      // setTimeout(() => {
      // 	vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
      // }, 500);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vsactions.askQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "How was your day?",
        "Good",
        "Bad"
      );

      if (answer === "Bad") {
        vscode.window.showInformationMessage("Sorry to hear that :(");
      } else {
        console.log(answer);
      }
    })
  );

  // Register data providers
  vscode.window.registerTreeDataProvider(
    "workflows",
    new WorkflowDataProvider(
      vscode.workspace.workspaceFolders === undefined
        ? null
        : vscode.workspace.workspaceFolders[0].uri.fsPath
    )
  );

  // Register views
  vscode.window.createTreeView("workflows", {
    treeDataProvider: new WorkflowDataProvider(
      vscode.workspace.workspaceFolders === undefined
        ? null
        : vscode.workspace.workspaceFolders[0].uri.fsPath
    ),
  });
>>>>>>> Stashed changes
}

// this method is called when your extension is deactivated
export function deactivate() {}
