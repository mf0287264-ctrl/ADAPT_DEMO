"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import RobotModelViewer from "@/components/RobotModelViewer";
import { initialCoursesData, Course } from "@/data/courses";
import {
  HiOutlineArrowLeft,
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineChevronRight,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

export default function LessonPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId") || "python-101";

  const course: Course =
    initialCoursesData.find((c: Course) => c.id === courseId) || initialCoursesData[0];

  const [activeTab, setActiveTab] = useState<"overview" | "code" | "notes">("overview");
  const [askInput, setAskInput] = useState("");
  const [aiResponse, setAiResponse] = useState(
    `Hello! I'm your AI Teacher for "${course.title}". Ask me any questions about this lesson!`
  );
  const [isThinking, setIsThinking] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAskMe = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!askInput.trim()) return;

    setIsThinking(true);
    setAiResponse("Analyzing your question...");

    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(
        `Here is my explanation for "${askInput}": In ${course.category}, always remember to verify your variables and structure logic step-by-step.`
      );
      setAskInput("");
    }, 1200);
  };

  const samplePrompts = [
    "Explain this lesson in simple terms",
    "Give me a code example",
    "Test my understanding with a question",
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none pb-16">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/my-courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0062b1] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs transition-colors"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to My Courses
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-[#0062b1] font-bold">
              {course.category}
            </span>
            <HiOutlineChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-extrabold">{course.title}</span>
          </div>
        </div>

        {/* 2-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT MAIN CONTENT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Lesson Title Banner */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
                <HiOutlineAcademicCap className="w-4 h-4" />
                Lesson 1 of {course.lessonsCount}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                {course.title}: Fundamentals & Key Concepts
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Interactive Player / Workspace Area */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl text-white">
              <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    lesson-1-{course.id}.py
                  </span>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                  Interactive Preview
                </span>
              </div>

              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed text-slate-200 bg-slate-900/90 min-h-[260px] flex flex-col justify-between">
                <div>
                  <p className="text-slate-500 mb-2"># Lesson 1: Introduction to {course.title}</p>
                  <p className="text-purple-400">def <span className="text-blue-300">start_learning</span>():</p>
                  <p className="pl-4 text-emerald-300">topic = "{course.category}"</p>
                  <p className="pl-4 text-emerald-300">status = "Enrolled & Ready"</p>
                  <p className="pl-4 text-cyan-300">print(f"Mastering {course.title} with AI Teacher...")</p>
                  <p className="mt-2 text-purple-400">start_learning()</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-sans">
                    ?? Click on the AI Teacher sidebar to ask questions in real-time.
                  </span>
                  <button
                    onClick={() => setCompleted(!completed)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      completed
                        ? "bg-emerald-600 text-white"
                        : "bg-[#38a1f3] hover:bg-blue-600 text-white shadow-md"
                    }`}
                  >
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    {completed ? "Completed!" : "Mark Completed"}
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex border-b border-slate-200 pb-3 gap-6 text-xs font-black">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === "overview"
                      ? "text-[#0062b1] border-b-2 border-[#0062b1]"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === "code"
                      ? "text-[#0062b1] border-b-2 border-[#0062b1]"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Key Takeaways
                </button>
              </div>

              <div className="mt-4 text-xs font-semibold text-slate-600 leading-relaxed">
                {activeTab === "overview" ? (
                  <div className="space-y-3">
                    <p>
                      In this lesson, you will explore core principles of <strong>{course.title}</strong>.
                      Use the 3D AI Teacher panel on the right to clear doubts or test your skills.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                      <li>Understand fundamental syntax & structural concepts.</li>
                      <li>Learn best practices for writing clean, maintainable code.</li>
                      <li>Reinforce your knowledge with interactive AI feedback.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-slate-800">? Point 1: Always declare clear variable names.</p>
                    <p className="text-slate-800">? Point 2: Keep functions modular and focused.</p>
                    <p className="text-slate-800">? Point 3: Leverage AI assistance for quick debugging.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D AI TEACHER PANEL */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-md flex flex-col items-center text-center relative overflow-hidden group">
              {/* Card Header */}
              <div className="w-full flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-black tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#063966] via-[#0062b1] to-[#38a1f3] flex items-center gap-1.5">
                  <HiOutlineSparkles className="w-5 h-5 text-cyan-500 animate-spin" style={{ animationDuration: "8s" }} />
                  3D AI Teacher
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Tutor
                </div>
              </div>

              {/* AI Speech Bubble */}
              <div className="relative w-full mb-3">
                <div className="bg-gradient-to-r from-[#063966] to-[#0062b1] text-white text-xs font-semibold p-4 rounded-2xl shadow-md border border-cyan-400/30 text-left relative transition-all duration-300">
                  <p className="leading-relaxed">
                    {isThinking ? (
                      <span className="flex items-center gap-2 text-cyan-200">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        AI is thinking...
                      </span>
                    ) : (
                      aiResponse
                    )}
                  </p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0062b1] rotate-45 border-r border-b border-cyan-400/30" />
                </div>
              </div>

              {/* -- 3D ROBOT MODEL VIEWER (ANIMATION REMOVED) -- */}
              <div className="relative w-full h-56 my-2 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
                <RobotModelViewer className="w-full h-full" autoRotate={true} enableControls={true} />
              </div>

              {/* Quick Prompts */}
              <div className="w-full flex flex-wrap gap-1.5 mt-3 mb-2">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setAskInput(prompt);
                    }}
                    className="text-[10px] font-bold bg-slate-50 hover:bg-cyan-50 text-slate-600 hover:text-[#0062b1] border border-slate-200 hover:border-cyan-200 px-2.5 py-1 rounded-full transition-all cursor-pointer text-left"
                  >
                    ?? {prompt}
                  </button>
                ))}
              </div>

              {/* Question Input Form */}
              <form onSubmit={handleAskMe} className="w-full mt-2">
                <input
                  type="text"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  placeholder="Ask your AI Teacher..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#38a1f3] focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />

                <button
                  type="submit"
                  className="w-full mt-3 bg-gradient-to-r from-[#063966] via-[#0062b1] to-[#38a1f3] hover:from-[#0062b1] hover:to-blue-500 text-white font-extrabold text-xs tracking-wide py-3 rounded-xl shadow-md hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 uppercase"
                >
                  <HiOutlineChatBubbleLeftRight className="w-4 h-4" />
                  <span>Ask AI Teacher</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
