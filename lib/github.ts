import axios from "axios";

export const getGitHubStats = async () => {
  const username = "amr12338kh";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("Github token is not found");
    return;
  }

  try {
    // Configure axios with authentication headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Fetch user data with authentication
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`,
      config
    );
    const userData = userRes.data;

    // Fetch repositories with authentication
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      config
    );
    const reposData = reposRes.data;

    // Sum up the stargazers_count for each repository
    const totalStars = reposData.reduce((acc: number, repo: any) => {
      return acc + (repo.stargazers_count || 0);
    }, 0);

    return {
      followers: userData.followers || 0,
      totalStars,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching GitHub data: ",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching GitHub data: ", error);
    }
    return {
      followers: 0,
      totalStars: 0,
    };
  }
};
