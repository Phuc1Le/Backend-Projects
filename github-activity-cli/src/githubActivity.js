const fetchGitHubActivity = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Failed to fetch GitHub activity.");
            return;
        }

        const data = await response.json();

        if (data.length === 0) {
            console.log("No recent activity found.");
            return;
        }

        data.forEach((event) => {
            let action;

            switch (event.type) {
                case "PushEvent":
                    const commitCount = event.payload.commits?.length || 0;
                    action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
                    break;

                case "IssuesEvent":
                    action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
                    break;

                case "WatchEvent":
                    action = `Starred ${event.repo.name}`;
                    break;

                case "ForkEvent":
                    action = `Forked ${event.repo.name}`;
                    break;

                case "CreateEvent":
                    action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                    break;

                default:
                    action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
                    break;
            }

            console.log(`- ${action}`);
        });

    } catch (error) {
        console.log(error);
        console.log("An error occurred while fetching GitHub activity.");
    }
};

module.exports = fetchGitHubActivity;