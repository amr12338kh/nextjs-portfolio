"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Hover = ({
  children,
  title,
  id,
}: {
  children: React.ReactNode;
  title: string;
  id: number;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex">{children}</HoverCardTrigger>
      <HoverCardContent>{title}</HoverCardContent>
    </HoverCard>
  );
};

export default Hover;
