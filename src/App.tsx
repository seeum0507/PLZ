import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainPage } from "./pages/MainPage";
import { PolicyListPage } from "./pages/PolicyListPage";
import { PolicyDetailPage } from "./pages/PolicyDetailPage";
import { MyPage } from "./pages/MyPage";
import { SearchModal } from "./components/SearchModal";
import { LoginPromptModal } from "./components/LoginPromptModal";
import { MOCK_POLICIES } from "./data";
import type { PageState, Policy } from "./types";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("main");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [searchRegion, setSearchRegion] = useState("전국");
  const [searchCategory, setSearchCategory] = useState("전체");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedPolicies, setSavedPolicies] = useState<number[]>([]);

  const handleSearch = (region: string, category: string) => {
    setSearchRegion(region);
    setSearchCategory(category);
    setCurrentPage("policyList");
    setIsSearchOpen(false);
  };

  const handlePolicyClick = (id: number) => {
    const policy = MOCK_POLICIES.find((p) => p.id === id);
    if (policy) {
      setSelectedPolicy(policy);
      setCurrentPage("policyDetail");
    }
  };

  const handleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    setSavedPolicies((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleBack = () => {
    if (currentPage === "policyDetail") setCurrentPage("policyList");
    else setCurrentPage("main");
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
            savedPolicies={savedPolicies}
          />
        )}
        {currentPage === "policyDetail" && selectedPolicy && (
          <PolicyDetailPage
            policy={selectedPolicy}
            onSave={handleSave}
            isSaved={savedPolicies.includes(selectedPolicy.id)}
          />
        )}
        {currentPage === "myPage" && (
          <MyPage
            isLoggedIn={isLoggedIn}
            savedPolicies={savedPolicies}
            allPolicies={MOCK_POLICIES}
            onPolicyClick={handlePolicyClick}
            onSave={handleSave}
            onLogout={() => setIsLoggedIn(false)}
            onLoginClick={() => setIsLoginOpen(true)}
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
        onKakaoLogin={() => {
          setIsLoggedIn(true);
          setIsLoginOpen(false);
        }}
      />
    </div>
  );
}

export default App;
