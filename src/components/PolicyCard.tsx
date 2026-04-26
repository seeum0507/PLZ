import React from "react";
import { BookmarkIcon } from "lucide-react";
import type { Policy } from "../types";

interface PolicyCardProps {
  policy: Policy;
  onClick: () => void;
  onSave: (e: React.MouseEvent) => void;
  isSaved: boolean;
  className?: string;
}

export function PolicyCard({
  policy,
  onClick,
  onSave,
  isSaved,
  className = "",
}: PolicyCardProps) {
  const keywords: string[] = Array.isArray(policy.tags)
    ? policy.tags
    : policy.tags.split(",").map((k) => k.trim());

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-honey-50 ${className}`}
    >
      <span className="absolute -top-3 left-4 text-sm font-heading px-4 py-1.5 rounded-full border bg-warm-100 text-warm-500 border-warm-200 shadow-sm">
        {keywords[0]}
      </span>

      <div className="pr-10 mt-2">
        <h3 className="text-xl text-warm-800 mb-2 line-clamp-2 font-heading">
          {policy.name}
        </h3>

        <p className="text-sm text-warm-500 mb-3 line-clamp-2 font-heading">
          {policy.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-[#FFF4CD] text-[#E5BA73] border border-[#E5BA73] font-heading"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
