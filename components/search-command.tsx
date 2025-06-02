"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchData } from "@/lib/search-data";

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Pressione{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou busque..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Vendas">
            {searchData
              .filter((item) => item.category === "vendas")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Clientes">
            {searchData
              .filter((item) => item.category === "clientes")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Suporte">
            {searchData
              .filter((item) => item.category === "suporte")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Financeiro">
            {searchData
              .filter((item) => item.category === "financeiro")
              .map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}