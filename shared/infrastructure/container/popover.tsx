"use client";

import { Dispatch, SetStateAction, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Leaflet from "./leaflet";
import { useViewportSize } from "@lib/hooks/useViewportSize";

export default function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile, isDesktop } = useViewportSize();
  if (!isMobile && !isDesktop) return <>{children}</>;
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root
          open={openPopover}
          onOpenChange={(isOpen) => setOpenPopover(isOpen)}
        >
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="z-20 animate-slide-up-fade items-center rounded-md border border-gray-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
}