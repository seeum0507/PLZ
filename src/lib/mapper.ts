import type { Policy } from "../types";
import type { ApiBookmark } from "./api";

export function mapSummaryToPolicy(raw: ApiPolicySummaryRaw): Policy {
  const tags = raw.keywords
    ? raw.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : raw.large_category_name
    ? [raw.large_category_name]
    : [];

  return {
    id: stableId(raw.plcy_no),
    plcyNo: raw.plcy_no || undefined,
    name: raw.policy_name || "제목 없음",
    summary: raw.description,
    description: raw.description,
    tags,
    region: "전국",
    details: raw.description,
  };
}

export function mapDetailToPolicy(raw: ApiPolicyDetailRaw): Policy {
  const plcyNo = raw.plcy_no ?? "";
  const minAge = raw.min_age ? parseInt(raw.min_age, 10) : null;
  const maxAge = raw.max_age ? parseInt(raw.max_age, 10) : null;

  return {
    id: stableId(plcyNo),
    plcyNo: plcyNo || undefined,
    name: raw.policy_name || "제목 없음",
    description: raw.description ?? "",
    summary: raw.ai_description || raw.description || "",
    tags: [],
    region: "전국",
    details: raw.support_content ?? "",
    support_content: raw.support_content ?? "",
    min_age: minAge,
    max_age: maxAge,
    required_documents: raw.required_documents ?? "",
    apply_url: raw.apply_url ?? "",
    reference_url: raw.ref_url1 ?? "",
    organization_name: raw.organization_name ?? "",
  };
}

export function bookmarkToPolicy(b: ApiBookmark): Policy {
  return {
    id: stableId(b.policyId),
    plcyNo: b.policyId,
    name: b.policyName,
    summary: b.description,
    description: b.description,
    tags: b.keywords
      ? b.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : b.largeCategoryName
      ? [b.largeCategoryName]
      : [],
    region: "전국",
    details: b.description,
  };
}

interface ApiPolicySummaryRaw {
  plcy_no: string;
  policy_name: string;
  keywords: string;
  large_category_name: string;
  description: string;
}

interface ApiPolicyDetailRaw {
  plcy_no: string;
  policy_name: string;
  description: string;
  support_content: string;
  min_age: string;
  max_age: string;
  required_documents: string;
  apply_url: string;
  ref_url1: string;
  organization_name: string;
  ai_description: string;
}

function stableId(str: string): number {
  if (!str) return (Math.random() * 1_000_000) | 0;
  return str.split("").reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0);
}
