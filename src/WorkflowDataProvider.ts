import * as vscode from "vscode";
// import * as fs from "fs";
// import * as path from "path";

export class WorkflowDataProvider implements vscode.TreeDataProvider<Workflow> {
  constructor(
    private workspaceRoot: string | null,
    private workflows = [
      {
        id: 161335,
        node_id: "MDg6V29ya2Zsb3cxNjEzMzU=",
        name: "CI",
        path: ".github/workflows/blank.yaml",
        state: "active",
        created_at: "2020-01-08T23:48:37.000-08:00",
        updated_at: "2020-01-08T23:50:21.000-08:00",
        url: "https://api.github.com/repos/octo-org/octo-repo/actions/workflows/161335",
        html_url:
          "https://github.com/octo-org/octo-repo/blob/master/.github/workflows/161335",
        badge_url:
          "https://github.com/octo-org/octo-repo/workflows/CI/badge.svg",
      },
      {
        id: 269289,
        node_id: "MDE4OldvcmtmbG93IFNlY29uZGFyeTI2OTI4OQ==",
        name: "Linter",
        path: ".github/workflows/linter.yaml",
        state: "active",
        created_at: "2020-01-08T23:48:37.000-08:00",
        updated_at: "2020-01-08T23:50:21.000-08:00",
        url: "https://api.github.com/repos/octo-org/octo-repo/actions/workflows/269289",
        html_url:
          "https://github.com/octo-org/octo-repo/blob/master/.github/workflows/269289",
        badge_url:
          "https://github.com/octo-org/octo-repo/workflows/Linter/badge.svg",
      },
    ]
  ) {}

  getTreeItem(element: Workflow): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Workflow): Thenable<Workflow[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage("Please open a workspace folder");
      return Promise.resolve([]);
    }

    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.getWorkflowsFromPayload());
    }
  }

  private getWorkflowsFromPayload(workflows?: any): Workflow[] {
    var response: Workflow[] = [];
    for (const data of this.workflows) {
      response.push(
        new Workflow(
          data.name,
          data.created_at,
          vscode.TreeItemCollapsibleState.Collapsed
        )
      );
    }
    return response;
  }
}

class Workflow extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private someData = "FROM CONSTRUCTOR",
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-TOOLTIP`;
    this.description = this.someData;
  }

  // TODO Add icon stuff
}
