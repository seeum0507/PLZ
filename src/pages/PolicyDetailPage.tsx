import React, { useEffect } from "react";
import {
  UsersIcon,
  CoinsIcon,
  CalendarIcon,
  FileTextIcon,
  ExternalLinkIcon,
  BookmarkIcon,
} from "lucide-react";
import type { Policy } from "../types";
import { usePolicyDetail } from "../hooks/useApi";
import { HoneyDdukCharacter } from "../components/HoneyDdukCharacter";

interface PolicyDetailPageProps {
  policy: Policy;
  onSave: (e: React.MouseEvent) => void;
  isSaved: boolean;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export function PolicyDetailPage({
  policy,
  onSave,
  isSaved,
  isLoggedIn,
  onLoginClick,
}: PolicyDetailPageProps) {
  const {
    data: detailPolicy,
    isLoading,
    error,
  } = usePolicyDetail(policy.plcyNo ?? null);

  const p: Policy = detailPolicy
    ? {
        ...policy,
        name:
          detailPolicy.name && detailPolicy.name !== "제목 없음"
            ? detailPolicy.name
            : policy.name,
        description: detailPolicy.description || policy.description,
        summary: detailPolicy.summary || policy.summary || policy.description,
        tags: detailPolicy.tags.length > 0 ? detailPolicy.tags : policy.tags,
        support_content: detailPolicy.support_content || "",
        required_documents: detailPolicy.required_documents || "",
        min_age: detailPolicy.min_age,
        max_age: detailPolicy.max_age,
        apply_url: detailPolicy.apply_url || "",
        reference_url: detailPolicy.reference_url || "",
        organization_name: detailPolicy.organization_name || "",
      }
    : policy;

  const tags: string[] = Array.isArray(p.tags)
    ? p.tags
    : p.tags
    ? p.tags.split(",").map((t: string) => t.trim())
    : [];

  const handleSaveClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }
    onSave(e);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50 pb-24">
      <main className="max-w-3xl mx-auto px-6 pt-10">
        <div className="mb-6 animate-fade-in-up">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm font-medium px-3 py-1.5 rounded-full bg-white border border-warm-200 text-warm-600 shadow-sm"
              >
                {tag}
              </span>
            ))}
            <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-honey-100 border border-honey-200 text-honey-800 shadow-sm">
              {p.region}
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl text-warm-900 leading-tight mb-4">
            {p.name}
          </h1>

          {p.description && (
            <p className="font-body text-warm-500 text-base md:text-lg leading-relaxed border-l-4 border-honey-300 pl-4">
              {p.description}
            </p>
          )}
        </div>

        <div className="bg-honey-100 rounded-3xl p-6 md:p-8 mb-10 shadow-sm animate-fade-in-up stagger-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-honey-400 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
              AI 요약
            </span>
            <h3 className="font-heading text-honey-800 text-xl md:text-2xl">
              AI의 요약 ✨
            </h3>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-3">
              <HoneyDdukCharacter size="sm" animate />
              <p className="font-body text-warm-400 animate-pulse">
                요약 불러오는 중...
              </p>
            </div>
          ) : (
            <p className="font-body text-warm-800 font-medium text-lg leading-relaxed">
              {p.summary || p.description || "요약 정보가 없습니다."}
            </p>
          )}
        </div>

        <div className="space-y-6 animate-fade-in-up stagger-2 mb-12">
          <SectionCard
            icon={<UsersIcon size={24} className="text-blue-500" />}
            title="지원 대상"
          >
            {isLoading ? (
              <LoadingText />
            ) : (
              <AgeRange min={p.min_age} max={p.max_age} />
            )}
          </SectionCard>

          <SectionCard
            icon={<CoinsIcon size={24} className="text-honey-500" />}
            title="지원 내용"
          >
            {isLoading ? (
              <LoadingText />
            ) : (
              <MultiLineText
                content={p.support_content}
                fallback="지원 내용 정보가 없습니다."
              />
            )}
          </SectionCard>

          <SectionCard
            icon={<CalendarIcon size={24} className="text-green-500" />}
            title="필요 문서"
          >
            {isLoading ? (
              <LoadingText />
            ) : (
              <MultiLineText content={p.required_documents} fallback="" />
            )}
          </SectionCard>

          <SectionCard
            icon={<FileTextIcon size={24} className="text-purple-500" />}
            title="신청 방법"
          >
            {isLoading ? (
              <LoadingText />
            ) : (
              <>
                {p.apply_url && (
                  <LinkButton
                    href={p.apply_url}
                    label="신청하러 가기"
                    primary
                  />
                )}
                {p.reference_url && (
                  <LinkButton href={p.reference_url} label="참고 링크 보기" />
                )}
                {!p.apply_url && !p.reference_url && (
                  <p className="text-sm text-warm-500">
                    {p.organization_name
                      ? `${p.organization_name} 홈페이지에서 신청하세요.`
                      : "청년몽땅정보통 또는 해당 지자체 홈페이지에서 신청하세요."}
                  </p>
                )}
              </>
            )}
          </SectionCard>
        </div>

        <div className="flex justify-center animate-fade-in-up stagger-3 border-t border-warm-200 pt-10">
          <button
            onClick={handleSaveClick}
            className={`w-full sm:w-64 py-4 rounded-2xl font-heading text-xl flex items-center justify-center gap-2 transition-all duration-300 ${
              isSaved
                ? "bg-warm-100 text-warm-600 border border-warm-200"
                : "bg-honey-400 text-white shadow-soft hover:bg-honey-500 hover:-translate-y-1"
            }`}
          >
            <BookmarkIcon
              size={24}
              className={isSaved ? "fill-warm-400 text-warm-400" : ""}
            />
            {isSaved
              ? "저장됨 ✅"
              : isLoggedIn
              ? "저장하기 💾"
              : "로그인 후 저장 🍯"}
          </button>
        </div>
      </main>
    </div>
  );
}

function LoadingText() {
  return (
    <p className="font-body text-warm-300 animate-pulse text-base">
      불러오는 중...
    </p>
  );
}

function SectionCard({ icon, title, children }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-warm-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-warm-50 rounded-xl">{icon}</div>
        <h3 className="font-heading text-2xl text-warm-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function AgeRange({ min, max }: { min?: number | null; max?: number | null }) {
  if ((min == null && max == null) || (min === 0 && max === 0)) {
    return (
      <p className="font-body text-warm-400 text-base md:text-lg">전체 대상</p>
    );
  }
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 font-heading text-lg px-4 py-1.5 rounded-full">
        {min != null && min !== 0 ? `${min}세` : "제한 없음"}
        <span className="text-blue-400 font-body text-base">~</span>
        {max != null && max !== 0 ? `${max}세` : "제한 없음"}
      </span>
    </div>
  );
}

function MultiLineText({
  content,
  fallback,
}: {
  content?: string;
  fallback: string;
}) {
  if (!content || content.trim() === "") {
    return (
      <p className="font-body text-warm-400 text-base md:text-lg">{fallback}</p>
    );
  }
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-body text-warm-600 text-base md:text-lg leading-relaxed"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function LinkButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 mb-2 mr-2 ${
        primary
          ? "bg-honey-400 text-white hover:bg-honey-500 shadow-sm"
          : "bg-warm-50 text-warm-700 border border-warm-200 hover:bg-warm-100"
      }`}
    >
      {label}
      <ExternalLinkIcon size={15} />
    </a>
  );
}
