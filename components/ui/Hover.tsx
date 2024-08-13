"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Hover = ({
  children,
  title,
  key,
  id,
}: {
  children: React.ReactNode;
  title: string;
  key: number;
  id: number;
}) => {
  return (
    <HoverCard key={key}>
      <HoverCardTrigger className="flex">{children}</HoverCardTrigger>
      <HoverCardContent>{title}</HoverCardContent>
    </HoverCard>
  );
};

export default Hover;
