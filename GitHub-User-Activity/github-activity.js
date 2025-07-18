// GitHub User Activity Fetcher
const [,, username] = process.argv;

if (!username) {
  console.error('Please provide a GitHub username as an argument.');
  process.exit(1);
}


async function fetchUserActivity(username) {
  try {
    const url = `https://api.github.com/users/${username}/events/public`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'node-github-activity-cli' }
    });
    if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user activity:', error.message);
    process.exit(1);
  }
}

/**
 *  Output:
 *  - Pushed 3 commits to kamranahmedse/developer-roadmap
 *  - Opened a new issue in kamranahmedse/developer-roadmap
 *  - Starred kamranahmedse/developer-roadmap
 *  - ...
 */

function describeEvent(event) {
  switch (event.type) {
    case 'PushEvent':
      return `  - Pushed ${event.payload.commits ? event.payload.commits.length : '?'} commit(s)`;
    case 'IssuesEvent':
      return `  - ${event.payload.action[0].toUpperCase() + event.payload.action.slice(1)} an issue`;
    case 'IssueCommentEvent':
      return `  - Commented on an issue`;
    case 'PullRequestEvent':
      return `  - ${event.payload.action[0].toUpperCase() + event.payload.action.slice(1)} a pull request`;
    case 'WatchEvent':
      return `  - Starred the repository`;
    case 'ForkEvent':
      return `  - Forked the repository`;
    default:
      return `  - ${event.type}`;
  }
}

function formatGroupedActivity(groups) {
  let out = '';
  for (const repo of Object.keys(groups)) {
    out += `\nRepository: ${repo}\n`;
    for (const date of Object.keys(groups[repo]).sort()) {
      out += ` ${date}:\n`;
      for (const event of groups[repo][date]) {
        out += describeEvent(event) + '\n';
      }
    }
  }
  return out.trim();
}

function groupByRepoAndDate(events) {
  const groups = {};
  for (const event of events) {
    const repo = event.repo.name;
    const date = new Date(event.created_at).toISOString().slice(0, 10); // YYYY-MM-DD

    if (!groups[repo]) groups[repo] = {};
    if (!groups[repo][date]) groups[repo][date] = [];
    groups[repo][date].push(event);
  }
  return groups;
}

const response = await fetchUserActivity(username);
if (!response) {
  console.error('No activity found or an error occurred.');
  process.exit(1);
}
console.log('Fetching user activity...');
console.log('-----------------------------------');
console.log(`User: ${username}`);
console.log('-----------------------------------');
console.log('Activity:');
console.log('-----------------------------------');
console.log(formatGroupedActivity(groupByRepoAndDate(response)));
process.exit(0);