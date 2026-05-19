const fetchGitHubActivity = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}
module.exports = fetchGitHubActivity;