"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchData } from "@/lib/search-data";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchData.slice(0, 3));
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = query
      ? searchData.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
      : searchData.slice(0, 3); // Mostra apenas 3 sugestões quando a busca está vazia
    setFilteredSuggestions(filtered);
  }, [query]);

  const handleSearch = (suggestion?: typeof searchData[0]) => {
    if (suggestion) {
      router.push(suggestion.url);
    }
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar..."
          className="w-full pl-8 bg-muted"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && (
        <div className="absolute mt-1 w-full bg-popover rounded-md border shadow-md z-50">
          {filteredSuggestions.length > 0 ? (
            <div className="p-2">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-accent flex items-center gap-2 text-sm"
                  onClick={() => handleSearch(suggestion)}
                >
                  <span className="text-lg">{suggestion.icon}</span>
                  <div>
                    <div className="font-medium">{suggestion.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {suggestion.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
}