async function createBranch(octokit, context, branch) {
  try {
    console.log(`checking if branch exists: '${branch}'`)
    await octokit.repos.getBranch({
      ...context.repo,
      branch,
    });
  } catch (error) {
    if (error.name === "HttpError" && error.status === 404) {
      console.log(`creating branch: '${branch}'`)
      await octokit.git.createRef({
        ref: `refs/heads/${branch}`,
        sha: context.sha,
        ...context.repo,
      });
    } else {
      console.log("Error while creating new branch");
      throw Error(error);
    }
  }
}

module.exports = createBranch;
