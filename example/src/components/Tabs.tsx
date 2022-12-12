import React from "react";

interface Props {
  items: string[];
  clickHandler: (item: string) => void;
  currentItem: string;
}

export function Tabs(props: Props) {
  const { items, currentItem, clickHandler } = props;
  return (
    <ul>
      {items.map((item, i) => {
        return (
          <li
            key={i}
            onClick={() => clickHandler(item)}
            style={{
              textDecoration: currentItem === item ? "underline" : "none",
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
