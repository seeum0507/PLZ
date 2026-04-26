import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { kakaoLogin, kakaoLogout } from "../lib/kakao";
import { fetchMe } from "../lib/api";
import type { KakaoUser } from "../types";

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>(
    "ggulddeok_token",
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>(
    "ggulddeok_isLoggedIn",
    false
  );
  const [kakaoUser, setKakaoUser] = useLocalStorage<KakaoUser | null>(
    "ggulddeok_user",
    null
  );

  useEffect(() => {
    const { pathname, search } = window.location;
    const params = new URLSearchParams(search);

    if (pathname === "/oauth/callback") {
      const accessToken = params.get("access_token");
      const accessExp = params.get("access_exp");
      if (accessToken) {
        setToken(accessToken);
        if (accessExp) localStorage.setItem("ggulddeok_token_exp", accessExp);
      }
      window.history.replaceState({}, "", "/");
      return;
    }

    const tokenFromUrl = params.get("access_token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchMe(token)
      .then((user) => {
        setKakaoUser({
          id: String(user.id),
          email: user.email,
          nickname: user.nickname,
        });
        setIsLoggedIn(true);
      })
      .catch(() => {
        setToken(null);
        setIsLoggedIn(false);
        setKakaoUser(null);
      });
  }, [token]);

  const login = () => kakaoLogin();

  const logout = () => {
    kakaoLogout();
    setToken(null);
    setKakaoUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("ggulddeok_token_exp");
  };

  return { token, isLoggedIn, kakaoUser, login, logout };
}
