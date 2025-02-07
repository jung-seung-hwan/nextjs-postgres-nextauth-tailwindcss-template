"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
  const [count, setCount] = useState(0);

  // ✅ 서버 재시작 시 localStorage 초기화
  useEffect(() => {
    if (!sessionStorage.getItem("sessionActive")) {
      localStorage.removeItem("count"); // ✅ localStorage에서 count 삭제
      sessionStorage.setItem("sessionActive", "true"); // ✅ 세션이 유지되는 동안 다시 초기화되지 않도록 설정
    }

    const savedCount = localStorage.getItem("count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10)); // ✅ 문자열을 숫자로 변환하여 저장
    }
  }, []);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    // ✅ count 값을 localStorage에 저장할 때 문자열로 변환
    localStorage.setItem("count", newCount.toString());

    // ✅ Vue의 new-page로 이동하면서 count 전달
    window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "new-page", count: newCount } }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick}>Add Customer</Button>
        <p>현재 count 값: {count}</p>
      </CardContent>
    </Card>
  );
}
