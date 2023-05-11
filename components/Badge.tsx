import React from "react";
import { Tooltip, Badge as _Badge, Rate } from "antd";

interface BadgesProps {
  github?: string;
  npm?: string;
}

/*
 * 来自gpt-4：https://sharegpt.com/c/XnNywsD
 * */

export const Badge: React.FC<BadgesProps> = ({
  github,
  npm,
  rate,
}: {
  github?: string;
  npm?: string;
  rate?: number;
}) => {
  const getGithubStarsBadge = (repoUrl: string) => {
    const [_, user, repo] = repoUrl.split("/").slice(-3);
    let imageUrl;

    if (repoUrl.includes("github")) {
      imageUrl = `https://img.shields.io/github/stars/${user}/${repo}`;
    } else if (repoUrl.includes("gitlab")) {
      imageUrl = `https://img.shields.io/gitlab/stars/${user}/${repo}`;
    } else {
      return null;
    }

    return (
      <Tooltip title="GitHub Stars">
        <a href={repoUrl} target="_blank" rel="noreferrer">
          <img src={imageUrl} alt="GitHub stars" style={{ marginRight: 8 }} />
        </a>
      </Tooltip>
    );
  };

  const getNpmDownloadsBadge = (packageName: string) => {
    const imageUrl = `https://badgen.net/npm/dm/${packageName}`;

    return (
      <Tooltip title="npm月下载量">
        <a
          href={`https://npmjs.com/package/${packageName}`}
          target="_blank"
          rel="noreferrer"
        >
          <_Badge offset={[-8, 0]} size="small" style={{ marginRight: 8 }}>
            <img src={imageUrl} alt="npm downloads" />
          </_Badge>
        </a>
      </Tooltip>
    );
  };

  const getLastCommitBadge = (repoUrl: string) => {
    const [_, user, repo] = repoUrl.split("/").slice(-3);
    let imageUrl;

    if (repoUrl.includes("github")) {
      imageUrl = `https://img.shields.io/github/last-commit/${user}/${repo}`;
    } else if (repoUrl.includes("gitlab")) {
      imageUrl = `https://img.shields.io/gitlab/last-commit/${user}/${repo}`;
    } else {
      return null;
    }

    return (
      <Tooltip title="Last Commit">
        <a href={repoUrl} target="_blank" rel="noreferrer">
          <img src={imageUrl} alt="last commit" style={{ marginRight: 8 }} />
        </a>
      </Tooltip>
    );
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {github && getGithubStarsBadge(github)}
      {github && getLastCommitBadge(github)}
      {npm && getNpmDownloadsBadge(npm)}
      {rate && <Rate defaultValue={rate} disabled />}
    </span>
  );
};
