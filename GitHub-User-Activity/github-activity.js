// GitHub User Activity Fetcher
const [,, username] = process.argv;

if (!username) {
  console.error('Please provide a GitHub username as an argument.');
  process.exit(1);
}


async function fetchUserActivity(username) {
  try {
    const url = `https://api.github.com/users/${username}/events/public`;
    const response = await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const activities = data.map(event => {
          return {
            type: event.type,
            repo: event.repo.name,
            created_at: event.created_at
          };
        });
        return JSON.stringify(activities, null, 2);
      });
      return response;
  } catch (error) {
    console.error('Error fetching GitHub user activity:', error);
  }
}

/**
 *  Output:
 *  - Pushed 3 commits to kamranahmedse/developer-roadmap
 *  - Opened a new issue in kamranahmedse/developer-roadmap
 *  - Starred kamranahmedse/developer-roadmap
 *  - ...
 */

const response = await fetchUserActivity(username);
console.log(response);
process.exit(0);