import dotenv from "dotenv";
dotenv.config();

export const createClient = () => {
  const fetchResponse = async (url: string) => {
    try {
      const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Something went wrong while fetching:", error);
      return null;
    }
  };

  return {
    getTotalOfCommits: async (user: string, repo: string) => {
      const url = `https://api.github.com/repos/${user}/${repo}/stats/participation`;

      const data = await fetchResponse(url);
      if (!data || !data.all) {
        return null;
      }

      return data.all.reduce((acc: number, value: number) => acc + value, 0);
    },

    getAllIssues: async (user: string, repo: string) => {
      const url = `https://api.github.com/search/issues?q=repo:${user}/${repo}+type:issue`;

      const result = await fetchResponse(url);
      const issues = result.total_count;

      return issues;
    },
    getAllCommits: async (user: string, repo: string) => {
      const url = `https://api.github.com/search/issues?q=repo:${user}/${repo}/commits`;

      const result = await fetchResponse(url);
      const lastCommit = result.items[0].created_at.split("T")[0];
      return lastCommit;
    },

    testPagePerformance: async (url: string) => {
      const apiKey = process.env.GOOGLE_PAGE_SPEED_API_KEY;
      const pageUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`;
      let performanceScore = 0;

      try {
        const response = await fetch(pageUrl);
        const data = await response.json();
        performanceScore = data.lighthouseResult.categories.performance.score;
      } catch (error) {
        console.error("Error fetching performance score:", error);
        return "NA";
      }

      return `${(performanceScore * 100).toString()}%`;
    },
  };
};
