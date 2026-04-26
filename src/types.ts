export interface Policy {
  id: number;
  plcyNo?: string;
  name: string;
  summary: string;
  description: string;
  tags: string[];
  region: string;
  details: string;
  min_age?: number | null;
  max_age?: number | null;
  support_content?: string;
  required_documents?: string;
  apply_url?: string;
  reference_url?: string;
  organization_name?: string;
  target_info?: string;
  apply_period?: string;
}

export type PageState = "main" | "policyList" | "policyDetail" | "myPage";

export interface KakaoUser {
  id: string;
  email: string;
  nickname: string;
}
