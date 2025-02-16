import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getRecentWorkflowRuns() {
  try {
    const response = await octokit.actions.listWorkflowRunsForRepo({
      owner: "Alercio-hub",
      repo: "repo-name",
      per_page: 5,
    });

    const runs = response.data.workflow_runs;
    console.log("Recent Workflow Runs:", runs);
  } catch (error) {
    console.error("Error fetching workflow runs:", error);
  }
}

getRecentWorkflowRuns();
