"use client";

import { useState, useEffect, useCallback } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// Dashboard sub-components
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewPanel from "@/components/dashboard/OverviewPanel";
import BasicInfoForm from "@/components/dashboard/BasicInfoForm";
import TeachingDetailsForm from "@/components/dashboard/TeachingDetailsForm";
import QualificationsForm from "@/components/dashboard/QualificationsForm";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "basic-info", label: "Basic Info" },
  { id: "teaching", label: "Teaching Details" },
  { id: "qualifications", label: "Qualifications" },
];

export default function TutorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Auth Guard ───────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/login");
      } else {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ── Fetch Tutor Profile ──────────────────────────────────────────
  const fetchProfile = useCallback(async (uid) => {
    setLoadingProfile(true);
    try {
      const res = await fetch(`/api/tutor/profile?uid=${uid}`);
      const data = await res.json();
      setProfile(data.profile);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    if (user?.uid) fetchProfile(user.uid);
  }, [user, fetchProfile]);

  // ── Profile Save Handler ─────────────────────────────────────────
  const handleSave = useCallback(
    async (fields) => {
      if (!user?.uid) return { error: "Not authenticated" };
      const res = await fetch("/api/tutor/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid, ...fields }),
      });
      const data = await res.json();
      if (data.profile) setProfile(data.profile);
      return data;
    },
    [user]
  );

  // ── Loading Screen ───────────────────────────────────────────────
  if (!user || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#FF4D00]/20 border-t-[#FF4D00] animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading Dashboard…</p>
        </div>
      </div>
    );
  }

  const needsSetup = !profile || !profile.isProfileComplete;

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar */}
      <DashboardSidebar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(t) => { setActiveTab(t); setSidebarOpen(false); }}
        profile={profile}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          user={user}
          profile={profile}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-auto">

          {/* Completion Banner */}
          {needsSetup && (
            <ProfileCompletion
              profile={profile}
              onGoToBasicInfo={() => setActiveTab("basic-info")}
            />
          )}

          {/* Tab Panels */}
          {activeTab === "overview" && (
            <OverviewPanel profile={profile} user={user} />
          )}
          {activeTab === "basic-info" && (
            <BasicInfoForm profile={profile} onSave={handleSave} />
          )}
          {activeTab === "teaching" && (
            <TeachingDetailsForm profile={profile} onSave={handleSave} />
          )}
          {activeTab === "qualifications" && (
            <QualificationsForm profile={profile} onSave={handleSave} />
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
