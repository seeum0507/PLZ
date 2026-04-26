const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function kakaoLogin() {
  window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
}

export function kakaoLogout() {}

export function initKakao() {}
