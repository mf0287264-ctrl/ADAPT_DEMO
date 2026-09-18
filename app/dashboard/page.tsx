"use client";

import React from "react";
import Link from "next/link";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useCourses } from "@/context/CourseContext";
import {
  HiOutlineBookOpen,
  HiOutlineQuestionMarkCircle,
  HiOutlineAcademicCap,
  HiOutlineClipboardDocumentList,
  HiOutlineTrophy,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from "react-icons/hi2";

export default function DashboardPage() {
  const { myCourses } = useCourses();

  const quickActions = [
    {
      title: "Quizzes",
      subtitle: "460 available",
      icon: <HiOutlineQuestionMarkCircle className="w-5 h-5 text-blue-600" />,
      href: "#quizzes",
    },
    {
      title: "Certificates",
      subtitle: "0 earned",
      icon: <HiOutlineAcademicCap className="w-5 h-5 text-blue-600" />,
      href: "#certificates",
    },
    {
      title: "My Requests",
      subtitle: "0 pending",
      icon: <HiOutlineClipboardDocumentList className="w-5 h-5 text-blue-600" />,
      href: "#requests",
    },
    {
      title: "Leaderboard",
      subtitle: "Rank --",
      icon: <HiOutlineTrophy className="w-5 h-5 text-blue-600" />,
      href: "#leaderboard",
    },
  ];

  // Dummy Feed Items
  const dummyFeedPosts = [
    {
      id: 1,
      tag: "Announcement",
      readTime: "2 Min - Today",
      title: "Sample Feed Item #1 Title Placeholder",
      description: "This is a placeholder post description. You can replace this text with your real feed content later.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      tag: "Update",
      readTime: "5 Min - Yesterday",
      title: "Sample Feed Item #2 Title Placeholder",
      description: "This is another placeholder post description. Ready for your actual articles and announcements.",
      gradient: "from-sky-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none pb-16">
      {/* Top Navigation Bar */}
      <DashboardNavbar />

      {/* Main Container - Expands gracefully on Desktop */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        
        {/* RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT MAIN COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* 1. WELCOME HEADER BANNER (Student name removed) */}
            <div className="bg-gradient-to-r from-[#063966] via-[#0a4778] to-[#093c68] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="relative z-10">
                <p className="text-xs sm:text-sm font-medium text-cyan-200/90 flex items-center gap-1.5">
                  Welcome To AdaptAcademy 👋
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-1">
                  Learning Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
                  Continue your programming journey with your interactive AI Teacher.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/my-courses"
                  className="px-5 py-2.5 bg-white text-[#093d6b] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm text-center flex-1 sm:flex-none"
                >
                  My Courses ({myCourses.length})
                </Link>
                <Link
                  href="/courses"
                  className="px-5 py-2.5 bg-cyan-500 text-white rounded-xl font-bold text-xs hover:bg-cyan-600 transition-colors shadow-sm text-center flex-1 sm:flex-none"
                >
                  Explore
                </Link>
              </div>

              {/* Background Glow */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* 2. STATS & MY COURSES COUNTER (Using React Icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                    <HiOutlineBookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      My Enrolled Courses
                    </p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-0.5">
                      {myCourses.length}
                    </p>
                  </div>
                </div>
                <Link
                  href="/my-courses"
                  className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <HiOutlineSparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      AI Tutor Status
                    </p>
                    <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active & Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. QUICK ACTIONS GRID */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 font-sans">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-cyan-400 transition-all flex flex-col justify-between h-28 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-blue-50/80 flex items-center justify-center">
                        {action.icon}
                      </div>
                      <svg className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {action.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. FROM OUR FEED SECTION */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 font-sans">
                  From Our Feed
                </h2>
                <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer">
                  See All
                </button>
              </div>

              <div className="space-y-4">
                {dummyFeedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-stretch"
                  >
                    <div className={`sm:w-48 h-28 sm:h-auto bg-gradient-to-r ${post.gradient} relative p-4 flex items-center justify-center text-white overflow-hidden shrink-0`}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
                      <span className="text-xl font-bold tracking-widest opacity-80">
                        FEED
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="bg-cyan-100 text-cyan-800 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
                          {post.tag}
                        </span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-800 mt-2 font-sans leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {post.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="flex flex-col gap-6">
            
            {/* AI Teacher Assistant Card (Clean SVG icons) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xl shadow-sm">
                  <HiOutlineSparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Teacher</h3>
                  <p className="text-xs text-slate-500">Ask questions & debug code</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed mb-4">
                "Hi! I'm your AI Teacher. Need help understanding a programming concept or fixing a bug?"
              </div>

              <input
                type="text"
                placeholder="Ask AI Teacher a question..."
                className="w-full bg-slate-100/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors mb-3"
              />

              <button className="w-full bg-[#063966] hover:bg-[#093c68] text-white text-xs font-semibold py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2">
                <HiOutlinePaperAirplane className="w-4 h-4" />
                Start AI Session
              </button>
            </div>

            {/* Enrolled Courses Quick List */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">My Workspace</h3>
                <Link href="/my-courses" className="text-xs text-cyan-600 font-semibold hover:underline">
                  View All
                </Link>
              </div>

              {myCourses.length === 0 ? (
                <p className="text-xs text-slate-400">No enrolled courses yet.</p>
              ) : (
                <div className="space-y-3">
                  {myCourses.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          <HiOutlineBookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{c.title}</p>
                          <p className="text-[10px] text-slate-500">{c.lessonsCount} lessons</p>
                        </div>
                      </div>
                      <Link
                        href={`/my-courses`}
                        className="text-xs text-cyan-600 font-semibold hover:underline"
                      >
                        Start
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
