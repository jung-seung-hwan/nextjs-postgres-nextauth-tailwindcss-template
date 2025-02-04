"use client";

import React, { useEffect, useState } from "react";

export default function TestPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("🟢 Vue.js 웹 컴포넌트 로드 시작");

    // ✅ Vue 스타일 (CSS) 동적으로 추가
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "/vue/css/app.css"; // ✅ Vue 빌드된 CSS 경로
    document.head.appendChild(cssLink);

    // ✅ Vue chunk-vendors.js (공통 라이브러리) 로드
    const vendorScript = document.createElement("script");
    vendorScript.src = "/vue/js/chunk-vendors.js"; // ✅ Vue 빌드된 공통 JS
    vendorScript.async = false; // ❗ script 실행 순서 보장
    vendorScript.onload = () => {
      console.log("✅ chunk-vendors.js 로드 완료");
    };
    document.body.appendChild(vendorScript);

    // ✅ Vue 웹 컴포넌트 스크립트 로드
    const script = document.createElement("script");
    script.src = "/vue/js/app.js"; // ✅ Vue 메인 JS 파일
    script.async = false; // ❗ script 실행 순서 보장
    script.onload = () => {
      console.log("✅ Vue.js 웹 컴포넌트 로드 완료");
      setIsLoaded(true); // ✅ Vue가 로드되었음을 상태로 업데이트
    };

    document.body.appendChild(script);

    return () => {
      console.log("🛑 Vue.js 리소스 제거됨");

      // ✅ 추가된 리소스 정리
      if (document.head.contains(cssLink)) {
        document.head.removeChild(cssLink);
      }
      if (document.body.contains(vendorScript)) {
        document.body.removeChild(vendorScript);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <h1>React에서 Vue.js 웹 컴포넌트 사용</h1>
      {isLoaded ? (
        // ✅ JSX에서 Vue 컴포넌트를 직접 렌더링
        <landing-page></landing-page>
      ) : (
        <p>⏳ Vue.js 웹 컴포넌트 로드 중...</p>
      )}
    </div>
  );
}
