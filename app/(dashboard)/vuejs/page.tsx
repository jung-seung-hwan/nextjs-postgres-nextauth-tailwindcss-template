"use client";
import { useEffect } from 'react';
import Vue from 'vue';
import VuejsApp from '@/vue-app/template/src/renderer/components/vuejs-app.vue'; // Vue 컴포넌트 경로

export default function VuejsPage() {
  useEffect(() => {
    // Vue.js 앱 초기화
    const vueMountPoint = document.getElementById('vue-mount-point');
    if (vueMountPoint) {
      new Vue({
        render: (h) => h(VuejsApp),
      }).$mount(vueMountPoint);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-6">
      <div id="vue-mount-point" className="w-full"></div>
    </div>
  );
}
