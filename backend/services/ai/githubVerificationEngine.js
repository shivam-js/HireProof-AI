import axios from "axios";

/*
  ==========================================
  EXTRACT GitHub USERNAME
  ==========================================
*/

const extractGitHubUsername = (
  githubUrl = ""
) => {
  try {
    const cleanedUrl =
      githubUrl.trim();

    const parts =
      cleanedUrl.split("github.com/");

    if (!parts[1]) {
      return null;
    }

    return parts[1]
      .split("/")[0]
      .trim();
  } catch (error) {
    return null;
  }
};

/*
  ==========================================
  FETCH GitHub PROFILE
  ==========================================
*/

const fetchgithubProfile =
  async (username) => {
    const response =
      await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          },
        }
      );

    return response.data;
  };

/*
  ==========================================
  FETCH USER REPOSITORIES
  ==========================================
*/

const fetchGitHubRepositories =
  async (username) => {
    const response =
      await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          },
        }
      );

    return response.data;
  };

/*
  ==========================================
  GitHub VERIFICATION ENGINE
  ==========================================
*/

export const analyzeGitHubProfile =
  async (githubUrl) => {
    try {
      /*
        ==========================================
        VALIDATION
        ==========================================
      */

      if (!githubUrl) {
        return {
          verified: false,

          message:
            "GitHub profile not provided.",
        };
      }

      /*
        ==========================================
        USERNAME EXTRACTION
        ==========================================
      */

      const username =
        extractGitHubUsername(
          githubUrl
        );

      if (!username) {
        return {
          verified: false,

          message:
            "Invalid GitHub profile URL.",
        };
      }

      /*
        ==========================================
        FETCH PROFILE
        ==========================================
      */

      const profile =
        await fetchgithubProfile(
          username
        );

      /*
        ==========================================
        FETCH REPOSITORIES
        ==========================================
      */

      const repositories =
        await fetchGitHubRepositories(
          username
        );

      /*
        ==========================================
        LANGUAGE ANALYSIS
        ==========================================
      */

      const languages =
        [
          ...new Set(
            repositories
              .map(
                (repo) =>
                  repo.language
              )
              .filter(Boolean)
          ),
        ];

      /*
        ==========================================
        ENGINEERING SIGNALS
        ==========================================
      */

      const engineeringSignals =
        [];

      if (
        profile.public_repos >= 5
      ) {
        engineeringSignals.push(
          "Strong public repository presence detected."
        );
      }

      if (
        repositories.some(
          (repo) => repo.homepage
        )
      ) {
        engineeringSignals.push(
          "Deployment evidence detected across repositories."
        );
      }

      if (
        languages.length >= 3
      ) {
        engineeringSignals.push(
          "Multi-technology engineering exposure detected."
        );
      }

      if (
        profile.followers >= 10
      ) {
        engineeringSignals.push(
          "Active GitHub ecosystem presence detected."
        );
      }

      /*
        ==========================================
        FINAL ANALYSIS
        ==========================================
      */

      return {
        verified: true,

        username:
          profile.login,

        profileImage:
          profile.avatar_url,

        githubProfile:
          profile.html_url,

        bio:
          profile.bio || "",

        publicRepos:
          profile.public_repos,

        followers:
          profile.followers,

        following:
          profile.following,

        repositories:
          repositories.map(
            (repo) => ({
              name: repo.name,

              description:
                repo.description,

              stars:
                repo.stargazers_count,

              forks:
                repo.forks_count,

              language:
                repo.language,

              repoUrl:
                repo.html_url,

              deployedUrl:
                repo.homepage,
            })
          ),

        languages,

        engineeringSignals,
      };
    } catch (error) {
      console.error(
        "GitHub Verification Error:",
        error.message
      );

      return {
        verified: false,

        message:
          "GitHub verification failed.",
      };
    }
  };