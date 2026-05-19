const fetchGitHubActivity = require("./githubActivity");
const args = process.argv;
const username = process.argv[2];

if (!username) {
    console.log("Please provide a GitHub username.");
    process.exit(1);
}

console.log(`Fetching activity for ${username}...`);
fetchGitHubActivity(username);