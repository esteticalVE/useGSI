import React from "react";

interface Props {
  href: string;
  title: string;
}
export function Link(props: Props) {
  const { href, title } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
}
