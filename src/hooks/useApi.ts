import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPolicies,
  fetchPolicyDetail,
  fetchMe,
  fetchMyBookmarks,
  addBookmark,
  deleteBookmark,
  type ApiBookmark,
  type ApiBookmarkRequest,
} from "../lib/api";
import { mapSummaryToPolicy, mapDetailToPolicy } from "../lib/mapper";

export function usePolicies(region: string, interest: string) {
  return useQuery({
    queryKey: ["policies", region, interest],
    queryFn: async () => {
      const data = await fetchPolicies(region, interest);
      if (!data?.policies || !Array.isArray(data.policies)) return [];
      return data.policies.map(mapSummaryToPolicy);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePolicyDetail(plcyNo: string | null) {
  return useQuery({
    queryKey: ["policy", plcyNo],
    queryFn: () => fetchPolicyDetail(plcyNo!).then(mapDetailToPolicy),
    enabled: !!plcyNo,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMe(token: string | null) {
  return useQuery({
    queryKey: ["me", token],
    queryFn: () => fetchMe(token!),
    enabled: !!token,
  });
}

export function useMyBookmarks(token: string | null) {
  return useQuery({
    queryKey: ["bookmarks", token],
    queryFn: () => fetchMyBookmarks(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddBookmark(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ApiBookmarkRequest) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return addBookmark(token, body);
    },
    onSuccess: (newBookmark) => {
      queryClient.setQueryData(
        ["bookmarks", token],
        (old: ApiBookmark[] = []) => {
          if (old.some((b) => b.policyId === newBookmark.policyId)) return old;
          return [...old, newBookmark];
        }
      );
    },
  });
}

export function useDeleteBookmark(token: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (policyId: string) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return deleteBookmark(token, policyId);
    },
    onSuccess: (_, policyId) => {
      queryClient.setQueryData(
        ["bookmarks", token],
        (old: ApiBookmark[] = []) => old.filter((b) => b.policyId !== policyId)
      );
    },
  });
}
