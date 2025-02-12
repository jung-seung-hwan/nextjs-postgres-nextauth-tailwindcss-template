"use client";

import React, { useEffect, useState } from "react";
const VueWebApp = "vue-web-app" as any;

export default function NewNamePage() {
  const [name, setName] = useState(""); // ✅ React에서 입력한 이름
  const [vueName, setVueName] = useState(""); // ✅ Vue에서 전달받은 이름

  // ✅ React에서 `name` 값 유지 (localStorage 활용)
  useEffect(() => {
    const savedName = localStorage.getItem("react-name");
    if (savedName) setName(savedName);

    const savedVueName = localStorage.getItem("vue-name");
    if (savedVueName) setVueName(savedVueName);
  }, []);

  // ✅ React에서 Vue로 `name` 값 전송
  const sendNameToVue = () => {
    localStorage.setItem("react-name", name);
    window.dispatchEvent(new CustomEvent("update-name", { detail: name }));
  };

  // ✅ Vue에서 `name` 값을 React로 전달받음
  useEffect(() => {
    const handleVueNameUpdated = (event) => {
      console.log("🟢 Vue에서 name 값 변경됨:", event.detail);
      setVueName(event.detail);
      localStorage.setItem("vue-name", event.detail); // ✅ Vue에서 받은 값 저장
    };

    window.addEventListener("vue-name-updated", handleVueNameUpdated);

    return () => {
      window.removeEventListener("vue-name-updated", handleVueNameUpdated);
    };
  }, []);

  // ✅ localStorage 변경 감지 (다른 탭이나 Vue에서 변경 시)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "vue-name") {
        console.log("🟢 localStorage에서 Vue의 name 값 변경 감지:", event.newValue);
        setVueName(event.newValue || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <h1>이름 주고 받기</h1>

      {/* ✅ React에서 name 입력 */}
      <input
        type="text"
        placeholder="React에서 이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={sendNameToVue}>Vue로 name 전송</button>

      {/* ✅ Vue에서 받은 name 값 */}
      <p>Vue에서 전달된 name 값: {vueName}</p>
    </div>
  );
}
