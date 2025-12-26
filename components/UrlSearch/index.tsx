"use client";

import React from "react";
import { Command } from "cmdk";
import ky from "ky";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

export function UrlSearch() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const [list, setList] = React.useState<Array<{ label: string; url: string }>>(
    []
  );
  const divRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    ky.get(
      "https://wiki.dev-hub.top/_next/static/chunks/nextra-data-en-US.json"
    )
      .json<Record<string, { title: string }>>()
      .then((res) => {
        const list = Object.entries(res)
          .map(([url, { title }]) => ({
            label: title.trim(),
            url: url.trim(),
          }))
          .filter(({ label }) => !["App"].includes(label));
        setList(list);
      });
  }, []);

  useHotkeys("mod+p", (e) => {
    e.preventDefault();
    setOpen(true);
    setTimeout(() => {
      const input = divRef.current?.querySelector("input");
      if (input) {
        input.value = "";
      }
      input?.focus();
      input?.focus();
    }, 100);
  });

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
    <Modal
      mask
      open={open}
      maskClosable
      footer={null}
      closeIcon={null}
      className="cmkd-modal"
      onCancel={() => setOpen(false)}
    >
      <div className="vercel" ref={divRef}>
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
            {activePage === "home" && <Home list={list} setOpen={setOpen} />}
          </Command.List>
        </Command>
      </div>
    </Modal>
  );
}

function Home({
  list,
  setOpen,
}: {
  list: any[];
  setOpen?: (value: boolean) => void;
}) {
  const router = useRouter();
  return (
    <>
      <Command.Group heading="url 列表">
        {list.map(({ label, url }) => (
          <Item
            key={url}
            value={url}
            onSelect={() => {
              router.push(url);
              setOpen(false);
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
  value,
  onSelect = () => {},
}: {
  children: React.ReactNode;
  onSelect?: (value: string) => void;
  value: string;
}) {
  return (
    <Command.Item value={value} onSelect={onSelect}>
      {children}
    </Command.Item>
  );
}
