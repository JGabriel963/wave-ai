import React from "react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import { RiAddLine } from "@remixicon/react";

const NavNotes = () => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Notes</h5>
          <SidebarGroupAction className="mt-[1.5px] flex items-center size-5.5 rounded-md bg-primary/20 border cursor-pointer">
            <RiAddLine className="size-5!" />
            <span className="sr-only">Add Notes</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="w-full h-auto min-h-32 max-h-90 overflow-y-auto"></SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavNotes;
