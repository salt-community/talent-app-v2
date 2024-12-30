export function extractRepositoryDetails(url: string) {
  const parts = url.split("/");
  if (parts.length < 5) {
    throw new Error("Invalid GitHub repository URL");
  }
  const username = parts[3];
  const repoName = parts[4];

  const titleFromUrl = repoName;

  return { username, titleFromUrl };
}
