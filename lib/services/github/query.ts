export const GITHUB_ACTIVITY_QUERY = `
  query GithubActivity($monthStart: DateTime!, $yearStart: DateTime!) {
    viewer {
      login
      month: contributionsCollection(from: $monthStart) {
        totalCommitContributions
        restrictedContributionsCount
        commitContributionsByRepository(maxRepositories: 100) {
          repository { nameWithOwner }
        }
      }
      year: contributionsCollection(from: $yearStart) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
      recent: repositories(
        first: 12
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          nameWithOwner
          isPrivate
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 8) {
                  nodes {
                    oid
                    messageHeadline
                    committedDate
                    author { user { login } }
                  }
                }
              }
            }
          }
        }
      }
      langs: repositories(
        first: 100
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name }
            }
          }
        }
      }
    }
  }
`;
export type GithubHistoryNode = {
  oid: string;
  messageHeadline: string;
  committedDate: string;
  author?: { user?: { login?: string } | null } | null;
};
export type GithubRepoNode = {
  nameWithOwner: string;
  isPrivate: boolean;
  defaultBranchRef?: { target?: { history?: { nodes?: (GithubHistoryNode | null)[] } } | null } | null;
} | null;
export type GithubLangNode = {
  languages?: { edges?: { size: number; node: { name: string } }[] };
} | null;
export type GithubGraphResponse = {
  data?: {
    viewer?: {
      login?: string;
      month?: {
        totalCommitContributions?: number;
        restrictedContributionsCount?: number;
        commitContributionsByRepository?: { repository: { nameWithOwner: string } }[];
      };
      year?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
      recent?: { nodes?: GithubRepoNode[] };
      langs?: { nodes?: GithubLangNode[] };
    };
  };
  errors?: { message: string }[];
};