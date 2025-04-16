export interface GithubRepo {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    fork: boolean
    stargazers_count: number
    forks_count: number
    [key: string]: any
  }
  