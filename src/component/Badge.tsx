import React from "react";
import { Tooltip, Badge, Rate } from "antd";

interface BadgesProps {
  github?: string;
  npm?: string;
}

/*
 * 来自gpt-4：https://sharegpt.com/c/XnNywsD
 * */

const Badges: React.FC<BadgesProps> = ({
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
    const imageUrl = `https://img.shields.io/github/stars/${user}/${repo}.svg?style=social&label=Star&maxAge=2592000`;

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
          <Badge offset={[-8, 0]} size="small" style={{ marginRight: 8 }}>
            <img src={imageUrl} alt="npm downloads" />
          </Badge>
        </a>
      </Tooltip>
    );
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {github && getGithubStarsBadge(github)}
      {npm && getNpmDownloadsBadge(npm)}
      {rate && <Rate defaultValue={rate} disabled />}
    </span>
  );
};

export default Badges;
