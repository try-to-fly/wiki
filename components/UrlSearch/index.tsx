import React from "react";
import { Command } from "cmdk";
import ky from "ky";
import styles from "./index.module.scss";
import { Modal } from "antd";

export function UrlSearch() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const [list, setList] = React.useState<Array<{ label: string; url: string }>>(
    []
  );

  React.useEffect(() => {
    ky.get(
      "https://wiki.dev-hub.top/_next/static/chunks/nextra-data-en-US.json"
    )
      .json<Record<string, { title: string }>>()
      .then((res) => {
        const list = Object.entries(res).map(([url, { title }]) => ({
          label: title,
          url,
        }));
        setList(list);
      });
  }, []);

  const [pages, setPages] = React.useState<string[]>(["home"]);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === "home";

  const popPage = React.useCallback(() => {
    setPages((pages) => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "";
        }
      }, 100);

      setInputValue("");
    }
  }

  return (
    <Modal mask open>
      <div className={styles.vercel}>
        <Command
          ref={ref}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              bounce();
            }

            if (isHome || inputValue.length) {
              return;
            }

            if (e.key === "Backspace") {
              e.preventDefault();
              popPage();
              bounce();
            }
          }}
        >
          <div>
            {pages.map((p) => (
              <div key={p} cmdk-vercel-badge="">
                {p}
              </div>
            ))}
          </div>
          <Command.Input
            autoFocus
            placeholder="输入url关键词"
            onValueChange={(value) => {
              setInputValue(value);
            }}
          />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            {activePage === "home" && (
              <Home
                list={list}
                searchProjects={() => setPages([...pages, "projects"])}
              />
            )}
          </Command.List>
        </Command>
      </div>
    </Modal>
  );
}

function Home({
  list,
  searchProjects,
}: {
  searchProjects: Function;
  list: any[];
}) {
  return (
    <>
      <Command.Group heading="url 列表">
        {list.map(({ label, url }) => (
          <Item
            key={url}
            onSelect={() => {
              console.log(url);
              window.open(`${location.host}${url}`);
            }}
          >
            {label}
          </Item>
        ))}
      </Command.Group>
    </>
  );
}

function Item({
  children,
  onSelect = () => {},
}: {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}) {
  return <Command.Item onSelect={onSelect}>{children}</Command.Item>;
}
