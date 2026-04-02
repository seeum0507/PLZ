import React from "react";
import { BookmarkIcon } from "lucide-react";
import { PolicyCard } from "../components/PolicyCard";
import { HoneyDdukCharacter } from "../components/HoneyDdukCharacter";
import type { Policy } from "../types";

interface KakaoUser {
  id: string;
  email: string;
  nickname?: string;
}

interface MyPageProps {
  user: KakaoUser;
  savedPolicies: number[];
  allPolicies: Policy[];
  onPolicyClick: (id: number) => void;
  onSave: (id: number, e: React.MouseEvent) => void;
}

export function MyPage({
  user,
  savedPolicies,
  allPolicies,
  onPolicyClick,
  onSave,
}: MyPageProps) {
  const savedPolicyList = allPolicies.filter((p) =>
    savedPolicies.includes(p.id)
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50 pb-24">
      <main className="max-w-6xl mx-auto px-6 pt-10">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-3xl shadow-card mb-10 animate-fade-in-up py-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* 캐릭터 + 원형 노란 배경 */}
            <div className="flex items-end justify-center mb-0">
              <div
                className="relative flex items-end justify-center"
                style={{ width: 160, height: 130 }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 130,
                    height: 130,
                    background:
                      "radial-gradient(circle, #FFE97A 0%, #FFFACA 80%, transparent 100%)",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 0,
                  }}
                />
                <div className="relative z-10 mb-1">
                  <HoneyDdukCharacter size="lg" />
                </div>
              </div>
            </div>

            {/* 이름 + 이메일 노란 박스 */}
            <div
              className="flex flex-col items-center py-6 px-16 rounded-2xl -mt-6"
              style={{ backgroundColor: "#FFFACA" }}
            >
              <p className="font-heading text-xl font-bold text-warm-800">
                {user.nickname ?? user.id}님
              </p>
              <p className="font-body text-sm text-warm-400 mt-1">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* 저장한 정책 섹션 */}
        <div className="animate-fade-in-up stagger-1">
          <div className="flex items-center gap-3 mb-8 border-b border-warm-200 pb-4">
            <BookmarkIcon size={26} className="text-honey-500" />
            <h3 className="font-heading text-2xl text-warm-800">저장한 정책</h3>
            <span className="bg-honey-100 text-honey-700 text-base font-bold px-3 py-0.5 rounded-full ml-1">
              {savedPolicyList.length}
            </span>
          </div>

          {savedPolicyList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPolicyList.map((policy, index) => (
                <div
                  key={policy.id}
                  className={`animate-fade-in-up stagger-${
                    (index % 5) + 1
                  } h-full`}
                >
                  <PolicyCard
                    policy={policy}
                    onClick={() => onPolicyClick(policy.id)}
                    onSave={(e) => onSave(policy.id, e)}
                    isSaved={true}
                    className="h-full flex flex-col"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm">
              <p className="font-heading text-xl text-warm-400 mb-3">
                아직 저장한 정책이 없어요
              </p>
              <p className="font-body text-base text-warm-300">
                마음에 드는 정책을 북마크해보세요 💾
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
