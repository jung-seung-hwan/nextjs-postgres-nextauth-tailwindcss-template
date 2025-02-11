// "use client";

// import React, { useEffect, useState } from "react";

// export default function TestPage() {
//   const [currentPage, setCurrentPage] = useState("landing-page"); // 기본 페이지 설정
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const savedCount = localStorage.getItem("count");
//     if (savedCount) {
//       setCount(parseInt(savedCount, 10)); // ✅ 문자열을 숫자로 변환하여 저장
//     }
//   }, []);

//   useEffect(() => {
//     if (document.getElementById("vue-script")) {
//       console.log("🔵 Vue.js 이미 로드됨");
//       setIsLoaded(true);
//       return;
//     }
    

//     console.log("🟢 Vue.js 웹 컴포넌트 로드 시작");

//     // ✅ Vue 스타일 (CSS) 추가
//     const cssLink = document.createElement("link");
//     cssLink.id = "vue-style";
//     cssLink.rel = "stylesheet";
//     cssLink.href = "/vue/css/app.css";
//     document.head.appendChild(cssLink);

//     // ✅ Vue chunk-vendors.js (공통 라이브러리) 로드
//     const vendorScript = document.createElement("script");
//     vendorScript.id = "vue-vendors";
//     vendorScript.src = "/vue/js/chunk-vendors.js";
//     vendorScript.async = false;
//     vendorScript.onload = () => console.log("✅ chunk-vendors.js 로드 완료");
//     document.body.appendChild(vendorScript);

//     // ✅ Vue 웹 컴포넌트 스크립트 로드
//     const script = document.createElement("script");
//     script.id = "vue-script";
//     script.src = "/vue/js/app.js";
//     script.async = false;
//     script.onload = () => {
//       console.log("✅ Vue.js 웹 컴포넌트 로드 완료");
//       setIsLoaded(true);
//     };

//     document.body.appendChild(script);

//     // ✅ Vue 웹 컴포넌트의 이벤트 감지 (페이지 전환)
//     const handleNavigation = (event) => {
//       console.log("React에서 Vue 이벤트 감지:", event.detail);

//       // 🚀 URL 문자열이 아니라 Vue 컴포넌트 태그 이름으로 설정해야 함
//       if (event.detail === "/new-page") {
//         setCurrentPage("new-page");
//       } else {
//         setCurrentPage("landing-page");
//       }
//     };

//     window.addEventListener("navigate", handleNavigation);

//     return () => {
//       console.log("🛑 Vue.js 리소스 제거됨");

//       if (document.getElementById("vue-style")) {
//         document.head.removeChild(cssLink);
//       }
//       if (document.getElementById("vue-vendors")) {
//         document.body.removeChild(vendorScript);
//       }
//       if (document.getElementById("vue-script")) {
//         document.body.removeChild(script);
//       }

//       window.removeEventListener("navigate", handleNavigation);
//     };
//   }, []);

//   return (
//     <div>
//       <p>현재 count 값: {count}</p>
//       <h1>React에서 Vue.js 웹 컴포넌트 사용</h1>
//       {isLoaded ? (
//         // ✅ 현재 페이지 상태에 따라 Vue 웹 컴포넌트 변경
//         React.createElement(currentPage, { "data-count": count })
//       ) : (
//         <p>⏳ Vue.js 웹 컴포넌트 로드 중...</p>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
const VueWebApp = "vue-web-app" as any;

export default function TestPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [vueCount, setVueCount] = useState(0); // ✅ Vue에서 변경된 count 값 저장

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    if (document.getElementById("vue-script")) {
      console.log("🔵 Vue.js 이미 로드됨");
      setIsLoaded(true);
      return;
    }

    console.log("🟢 Vue.js 웹 컴포넌트 로드 시작");

    const cssLink = document.createElement("link");
    cssLink.id = "vue-style";
    cssLink.rel = "stylesheet";
    cssLink.href = "/vue/css/app.css";
    document.head.appendChild(cssLink);

    const vendorScript = document.createElement("script");
    vendorScript.id = "vue-vendors";
    vendorScript.src = "/vue/js/chunk-vendors.js";
    vendorScript.async = false;
    vendorScript.onload = () => console.log("✅ chunk-vendors.js 로드 완료");
    document.body.appendChild(vendorScript);

    const script = document.createElement("script");
    script.id = "vue-script";
    script.src = "/vue/js/app.js";
    script.async = false;
    script.onload = () => {
      console.log("✅ Vue.js 웹 컴포넌트 로드 완료");
      setIsLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      console.log("🛑 Vue.js 리소스 제거됨");

      if (document.getElementById("vue-style")) {
        document.head.removeChild(cssLink);
      }
      if (document.getElementById("vue-vendors")) {
        document.body.removeChild(vendorScript);
      }
      if (document.getElementById("vue-script")) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const sendCountToVue = () => {
    const vueComponent = document.querySelector("vue-web-app");
    window.dispatchEvent(new CustomEvent("update-count", { detail: count })); // ✅ Vue에서 받을 수 있도록 변경
  };

  // ✅ Vue에서 count 값이 변경될 때 React에서 감지
  useEffect(() => {
    const handleVueCountUpdated = (event) => {
      console.log("🟢 Vue에서 count 값 변경됨:", event.detail);
      setVueCount(event.detail); // ✅ Vue에서 전달된 count 값 업데이트
    };

    window.addEventListener("vue-count-updated", handleVueCountUpdated);

    return () => {
      window.removeEventListener("vue-count-updated", handleVueCountUpdated);
    };
  }, []);

  return (
    <div>
      <p>현재 count 값: {count}</p>
      <p>현재 vuejs count 값: {vueCount}</p> {/* ✅ Vue에서 변경된 값 표시 */}
      <button onClick={() => setCount(count + 1)}>React에서 count 증가</button>
      <button onClick={sendCountToVue}>Vue로 count 전송</button>
      <h1>React에서 Vue.js 웹 컴포넌트 사용</h1>
      {isLoaded ? (
        <VueWebApp  data-count={"count"}></VueWebApp>
      ) : (
        <p>⏳ Vue.js 웹 컴포넌트 로드 중...</p>
      )}
    </div>
  );
}
