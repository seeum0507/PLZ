import React from "react";
import { PolicyCard } from "../components/PolicyCard";
import { HoneyDdukCharacter } from "../components/HoneyDdukCharacter";
import type { Policy } from "../types";
import { usePolicies } from "../hooks/useApi";

interface PolicyListPageProps {
  region: string;
  category: string;
  onPolicyClick: (policy: Policy) => void;
  onSave: (policy: Policy, e: React.MouseEvent) => void;
  savedPolicyIds: string[];
}

export function PolicyListPage({
  region,
  category,
  onPolicyClick,
  onSave,
  savedPolicyIds,
}: PolicyListPageProps) {
  const {
    data: policies = [],
    isLoading,
    isError,
    error,
  } = usePolicies(region, category);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <HoneyDdukCharacter size="lg" animate />
        <p className="font-heading text-2xl text-warm-400 animate-pulse">
          정책을 불러오는 중... 🍯
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <div className="opacity-50 grayscale">
          <HoneyDdukCharacter size="lg" />
        </div>
        <p className="font-heading text-2xl text-warm-400">
          정책을 불러오지 못했어요 😢
        </p>
        <p className="font-body text-sm text-red-400 bg-red-50 px-4 py-2 rounded-xl max-w-md text-center break-all">
          {(error as Error)?.message ?? "알 수 없는 오류"}
        </p>
        <p className="font-body text-base text-warm-300">
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50 pb-16">
      <main className="max-w-6xl mx-auto px-6 pt-8">
        <div className="bg-honey-100 rounded-2xl p-5 md:p-6 mb-8 flex items-center gap-4 shadow-sm animate-fade-in-up">
          <HoneyDdukCharacter size="md" animate />
          <p className="font-heading text-warm-800 text-base md:text-lg leading-relaxed">
            <strong className="font-heading text-xl text-honey-600">
              {region}
            </strong>{" "}
            지역에는{" "}
            {category !== "전체" && (
              <strong className="text-honey-600">{category} 관련 </strong>
            )}
            정책이{" "}
            <strong className="font-heading text-xl text-honey-600">
              {policies.length}개
            </strong>{" "}
            있어요! ✨
          </p>
        </div>

        {policies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <div
                key={policy.id}
                className={`animate-fade-in-up stagger-${
                  (index % 5) + 1
                } h-full`}
              >
                <PolicyCard
                  policy={policy}
                  onClick={() => onPolicyClick(policy)}
                  onSave={(e) => onSave(policy, e)}
                  isSaved={savedPolicyIds.includes(policy.plcyNo ?? "")}
                  className="h-full flex flex-col"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl shadow-sm animate-fade-in-up">
            <div className="opacity-50 grayscale mb-6">
              <HoneyDdukCharacter size="lg" />
            </div>
            <p className="font-heading text-2xl text-warm-400">
              아직 정책 정보가 없어요 😢
            </p>
            <p className="font-body text-base text-warm-400 mt-2">
              다른 지역이나 분야를 찾아볼까요?
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
