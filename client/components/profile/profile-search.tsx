"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronDownIcon, Search } from "lucide-react";

import { Routes } from "@/lib/routes";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filterItems = [
  { value: "name" },
  { value: "gender" },
  { value: "email" },
  { value: "address" },
];

interface ProfileSearchProps {
  initLimit: string;
  count?: number;
}

export const ProfileSearch = ({ initLimit, count }: ProfileSearchProps) => {
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  const router = useRouter();
  const params = new URLSearchParams();

  const onSearch = async () => {
    if (!keyword.trim()) return;

    params.set(!filter.trim() ? "name" : filter, keyword);
    params.set("limit", initLimit);
    router.replace("?" + params.toString());
    toast.info(`found ${count || 0} results for "${keyword}"`);
  };

  const onClearParams = () => {
    setFilter("");
    setKeyword("");
    router.replace(Routes.profile.all);
  };

  return (
    <div className="flex items-center gap-2">
      <InputGroup className="max-w-lg">
        <InputGroupInput
          placeholder="Type to search..."
          value={keyword}
          onKeyUp={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className="text-xs cursor-pointer capitalize"
              >
                {filter ? filter : "select filter"}
                <ChevronDownIcon className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filterItems.map((item, i) => (
                <DropdownMenuItem
                  key={i}
                  className="text-muted-foreground hover:text-foreground cursor-pointer capitalize"
                  onClick={() => setFilter(item.value)}
                >
                  {item.value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <InputGroupButton
            variant="default"
            className="text-xs btn capitalize"
            onClick={onSearch}
          >
            search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button
        size="sm"
        variant="link"
        className="text-xs cursor-pointer capitalize"
        onClick={onClearParams}
      >
        clear
      </Button>
    </div>
  );
};
