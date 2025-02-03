// import { useEffect } from "react";

export default function VueWrapper() {
  return (
    <iframe
      src="http://localhost:5173/index.html" // Vue.js 2 실행되는 URL
      width="100%"
      height="800px"
      style={{
        border: "none",
        overflow: "hidden"
      }}
    />
  );
}
