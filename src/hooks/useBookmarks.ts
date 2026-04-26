import { useMyBookmarks, useAddBookmark, useDeleteBookmark } from "./useApi";
import type { Policy } from "../types";

function normalizeTags(tags: Policy["tags"]): string[] {
  if (Array.isArray(tags)) return tags;
  return String(tags)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function useBookmarks(isLoggedIn: boolean, token: string | null) {
  const activeToken = isLoggedIn ? token : null;
  const { data: bookmarks = [] } = useMyBookmarks(activeToken);
  const addMutation = useAddBookmark(activeToken);
  const deleteMutation = useDeleteBookmark(activeToken);

  const savedPolicyIds = bookmarks.map((b) => b.policyId);
  const isSaved = (plcyNo?: string) =>
    !!plcyNo && savedPolicyIds.includes(plcyNo);

  const toggle = (policy: Policy) => {
    const { plcyNo } = policy;
    if (!plcyNo) return;

    if (isSaved(plcyNo)) {
      deleteMutation.mutate(plcyNo);
    } else {
      const tags = normalizeTags(policy.tags);
      addMutation.mutate({
        policy_id: plcyNo,
        policy_name: policy.name.slice(0, 100),
        keywords: tags.join(",").slice(0, 200),
        large_category_name: (tags[0] ?? "").slice(0, 50),
        description: (policy.description ?? "").slice(0, 500),
      });
    }
  };

  return { bookmarks, savedPolicyIds, isSaved, toggle };
}
