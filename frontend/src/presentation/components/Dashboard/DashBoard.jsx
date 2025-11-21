import React, { useState } from "react";
import Header from "./Header";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";
import ContentHighlights from "./ContentHighlights";
import SystemManagement from "./SystemManagement";
import HomeSlidesManager from "./HomeSlidesManager";

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header isRefreshing={isRefreshing} onRefresh={handleRefresh} />
        <StatsCards />
        <ChartsSection />
        <ContentHighlights />
        <SystemManagement />
        <HomeSlidesManager />
      </div>
    </div>
  );
}