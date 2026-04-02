import React from "react";
import { HoneyDdukCharacter } from "./HoneyDdukCharacter";

export function Footer() {
  return (
    <footer className="bg-warm-800 text-warm-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <HoneyDdukCharacter size="sm" />
              <span className="font-heading text-2xl text-honey-400">꿀떡</span>
            </div>
            <p className="font-body text-sm text-warm-300 leading-relaxed">
              고졸 청년의 더 나은 내일을 위해
              <br />
              꿀떡이 함께합니다. 🍯
            </p>
          </div>
        </div>

        <div className="border-t border-warm-700 pt-4 flex flex-col md:flex-row items-center gap-4">
          <p className="font-body text-xs text-warm-400">
            © 2025 (사)한국꿀떡협회. All rights reserved. 본 서비스는 고졸 청년
            정책 정보 제공을 목적으로 운영됩니다.
          </p>

          <div className="flex items-center gap-3 text-xs text-warm-400 ml-40">
            <a
              href="https://github.com/Ggul-Ddeok"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-honey-400 transition-colors"
            >
              Github
            </a>

            <span className="text-warm-600">|</span>

            <a href="#" className="hover:text-honey-400 transition-colors">
              정책찾기
            </a>

            <span className="text-warm-600">|</span>

            <a href="#" className="hover:text-honey-400 transition-colors">
              홈 가기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
