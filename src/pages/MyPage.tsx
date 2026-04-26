import React from "react";
import { BookmarkIcon, LogOutIcon } from "lucide-react";
import { PolicyCard } from "../components/PolicyCard";
import { HoneyDdukCharacter } from "../components/HoneyDdukCharacter";
import { bookmarkToPolicy } from "../lib/mapper";
import type { KakaoUser, Policy } from "../types";
import type { ApiBookmark } from "../lib/api";

interface MyPageProps {
  user: KakaoUser;
  bookmarks: ApiBookmark[];
  savedPolicyIds: string[];
  onPolicyClick: (policy: Policy) => void;
  onSave: (policy: Policy, e: React.MouseEvent) => void;
  onLogout: () => void;
}

export function MyPage({
  user,
  bookmarks,
  savedPolicyIds,
  onPolicyClick,
  onSave,
  onLogout,
}: MyPageProps) {
  const savedPolicyList = bookmarks.map(bookmarkToPolicy);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50 pb-24">
      <main className="max-w-6xl mx-auto px-6 pt-10">
        <div className="bg-white rounded-3xl shadow-card mb-10 animate-fade-in-up py-10 flex items-center justify-center relative">
          <button
            onClick={onLogout}
            className="absolute top-5 right-6 flex items-center gap-1.5 text-sm text-warm-400 hover:text-warm-700 transition-colors"
            aria-label="로그아웃"
          >
            <LogOutIcon size={16} />
            <span className="font-body">로그아웃</span>
          </button>

          <div className="flex flex-col items-center">
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

        <div className="animate-fade-in-up stagger-1">
          <div className="flex items-center gap-3 mb-8 border-b border-warm-200 pb-4">
            <BookmarkIcon size={26} className="text-honey-500" />
            <h3 className="font-heading text-2xl text-warm-800">저장한 정책</h3>
            <span className="bg-honey-100 text-honey-700 text-base font-bold px-3 py-0.5 rounded-full ml-1">
              {bookmarks.length}
            </span>
          </div>

          {savedPolicyList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPolicyList.map((policy, index) => (
                <div
                  key={policy.plcyNo ?? index}
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
