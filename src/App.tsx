import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";
import { PolicyListPage } from "./pages/PolicyListPage";
import { PolicyDetailPage } from "./pages/PolicyDetailPage";
import { MyPage } from "./pages/MyPage";
import { SearchModal } from "./components/SearchModal";
import { LoginPromptModal } from "./components/LoginPromptModal";
import { useAuth } from "./hooks/useAuth";
import { useBookmarks } from "./hooks/useBookmarks";
import type { PageState, Policy } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("main");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [searchRegion, setSearchRegion] = useState("전국");
  const [searchCategory, setSearchCategory] = useState("전체");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { token, isLoggedIn, kakaoUser, login, logout } = useAuth();
  const { bookmarks, savedPolicyIds, isSaved, toggle } = useBookmarks(
    isLoggedIn,
    token
  );

  const handleSearch = (region: string, category: string) => {
    setSearchRegion(region);
    setSearchCategory(category);
    setCurrentPage("policyList");
    setIsSearchOpen(false);
  };

  const handlePolicyClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setCurrentPage("policyDetail");
  };

  const handleSave = (policy: Policy, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    toggle(policy);
  };

  const handleBack = () => {
    setCurrentPage(currentPage === "policyDetail" ? "policyList" : "main");
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("main");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        showBack={currentPage === "policyDetail"}
        title={selectedPolicy?.name}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onBack={handleBack}
        onSearchClick={() => setIsSearchOpen(true)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
      />
      <main className="flex-1">
        {currentPage === "main" && (
          <MainPage onSearchClick={() => setIsSearchOpen(true)} />
        )}
        {currentPage === "policyList" && (
          <PolicyListPage
            region={searchRegion}
            category={searchCategory}
            onPolicyClick={handlePolicyClick}
            onSave={handleSave}
            savedPolicyIds={savedPolicyIds}
          />
        )}
        {currentPage === "policyDetail" && selectedPolicy && (
          <PolicyDetailPage
            policy={selectedPolicy}
            onSave={(e) => handleSave(selectedPolicy, e)}
            isSaved={isSaved(selectedPolicy.plcyNo)}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setIsLoginOpen(true)}
          />
        )}
        {currentPage === "myPage" && isLoggedIn && kakaoUser && (
          <MyPage
            user={kakaoUser}
            bookmarks={bookmarks}
            savedPolicyIds={savedPolicyIds}
            onPolicyClick={handlePolicyClick}
            onSave={handleSave}
            onLogout={handleLogout}
          />
        )}
      </main>
      <Footer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <LoginPromptModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onKakaoLogin={login}
      />
    </div>
  );
}

export default App;
