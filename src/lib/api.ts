const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiPolicySummary {
  plcy_no: string;
  policy_name: string;
  keywords: string;
  large_category_name: string;
  description: string;
}

export interface ApiPolicyDetail {
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

export interface ApiPoliciesResponse {
  totalCount: number;
  policies: ApiPolicySummary[];
}

export interface ApiUser {
  id: number;
  email: string;
  nickname: string;
}

export interface ApiBookmark {
  id: number;
  policyId: string;
  policyName: string;
  keywords: string;
  largeCategoryName: string;
  description: string;
  createdAt: string;
}

export interface ApiBookmarkRequest {
  policy_id: string;
  policy_name: string;
  keywords: string;
  large_category_name: string;
  description: string;
}

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  token?: string | null
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  const text = await res.text();

  if (!res.ok) {
    console.error(`[apiFetch] ${res.status} ${path}`, text);
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return text ? (JSON.parse(text) as T) : (null as T);
}

function normalizeBookmark(raw: any): ApiBookmark {
  return {
    id: raw.id ?? 0,
    policyId: raw.policyId ?? raw.policy_id ?? "",
    policyName: raw.policyName ?? raw.policy_name ?? "",
    keywords: raw.keywords ?? "",
    largeCategoryName: raw.largeCategoryName ?? raw.large_category_name ?? "",
    description: raw.description ?? "",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
  };
}

export const fetchPolicies = (region: string, interest: string) =>
  apiFetch<ApiPoliciesResponse>(
    `/policies?region=${encodeURIComponent(
      region
    )}&interest=${encodeURIComponent(interest)}`
  );

export const fetchPolicyDetail = (plcyNo: string) =>
  apiFetch<ApiPolicyDetail>(`/policies/${plcyNo}`);

export const fetchMe = (token: string) =>
  apiFetch<ApiUser>("/api/users/me", {}, token);

export const fetchMyBookmarks = async (
  token: string
): Promise<ApiBookmark[]> => {
  const raw = await apiFetch<any[]>("/api/bookmarks/me", {}, token);
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeBookmark);
};

export const addBookmark = async (
  token: string,
  body: ApiBookmarkRequest
): Promise<ApiBookmark> => {
  const raw = await apiFetch<any>(
    "/api/bookmarks",
    { method: "POST", body: JSON.stringify(body) },
    token
  );
  return normalizeBookmark(raw);
};

export const deleteBookmark = (token: string, policyId: string) =>
  apiFetch<null>(`/api/bookmarks/${policyId}`, { method: "DELETE" }, token);
