"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { initialCoursesData, Course } from "@/data/courses";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineChevronRight,
  HiOutlineAcademicCap,
  HiPlay,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

export default function LessonPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId") || "python-101";

  const course: Course =
    initialCoursesData.find((c: Course) => c.id === courseId) || initialCoursesData[0];

  const [completed, setCompleted] = useState(false);
  const [activeOutlineIndex, setActiveOutlineIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceDetected, setVoiceDetected] = useState(false);

  const outlineItems = [
    { title: "What Is Recursion?", duration: "3m", isQuiz: false },
    { title: "The Call Stack In Action", duration: "3m", isQuiz: false },
    { title: "Stack Overflow & Tail Recursion", duration: "3m", isQuiz: false },
    { title: "Tree Recursion & Fibonacci", duration: "3m", isQuiz: false },
    { title: "Recursion vs Iteration: Tradeoffs", duration: "3m", isQuiz: false },
    { title: "Recursion Mastery Quiz", duration: "2m", isQuiz: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none pb-16">
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

        {/* 2-COLUMN MAIN GRID WITH ENLARGED RIGHT PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT MAIN CONTENT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* ── AI TEACHER SVG DRAWING CANVAS (ENLARGED WHITE BG) ── */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm min-h-[560px] flex flex-col justify-between">
              
              {/* SVG Drawing Canvas Area */}
              <div className="my-2 relative flex items-center justify-center min-h-[400px] bg-slate-50/80 rounded-2xl border border-slate-200/80 p-8 sm:p-10">
                {course.category === "Python" || course.category === "C++" ? (
                  /* SVG DIAGRAM 1: ALGORITHMIC FLOW & MEMORY TREE */
                  <svg className="w-full max-w-xl h-72 sm:h-80 text-[#0062b1]" viewBox="0 0 500 220" fill="none">
                    {/* Connection Lines */}
                    <path
                      d="M 80 110 L 220 110 M 280 110 L 420 110 M 250 80 L 250 30 M 250 140 L 250 190"
                      stroke="#38a1f3"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      className="animate-[dash_10s_linear_infinite]"
                    />

                    {/* Left Node */}
                    <g className="transition-transform hover:scale-105 cursor-pointer">
                      <rect x="15" y="75" width="115" height="70" rx="16" fill="#063966" stroke="#0062b1" strokeWidth="2.5" />
                      <circle cx="72.5" cy="110" r="14" fill="#38a1f3" />
                    </g>

                    {/* Center Node */}
                    <g className="transition-transform hover:scale-105 cursor-pointer">
                      <circle cx="250" cy="110" r="44" fill="#0062b1" stroke="#38a1f3" strokeWidth="3.5" />
                      <circle cx="250" cy="110" r="18" fill="#ffffff" opacity="0.95" />
                    </g>

                    {/* Right Node */}
                    <g className="transition-transform hover:scale-105 cursor-pointer">
                      <rect x="370" y="75" width="115" height="70" rx="16" fill="#10b981" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="427.5" cy="110" r="14" fill="#ffffff" opacity="0.95" />
                    </g>

                    {/* Top Branch Node */}
                    <rect x="195" y="10" width="110" height="35" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Bottom Branch Node */}
                    <rect x="195" y="175" width="110" height="35" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  </svg>
                ) : (
                  /* SVG DIAGRAM 2: COMPONENT GRAPH & DOM TREE */
                  <svg className="w-full max-w-xl h-72 sm:h-80 text-[#0062b1]" viewBox="0 0 500 220" fill="none">
                    <path
                      d="M 250 45 L 150 110 M 250 45 L 350 110 M 150 145 L 100 185 M 150 145 L 200 185"
                      stroke="#0062b1"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />

                    {/* Root Node */}
                    <rect x="190" y="15" width="120" height="46" rx="12" fill="#0062b1" stroke="#38a1f3" strokeWidth="2.5" />

                    {/* Child Left */}
                    <rect x="90" y="100" width="120" height="44" rx="12" fill="#063966" stroke="#38a1f3" strokeWidth="2" />

                    {/* Child Right */}
                    <rect x="290" y="100" width="120" height="44" rx="12" fill="#10b981" stroke="#059669" strokeWidth="2" />
                  </svg>
                )}
              </div>

              {/* Board Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setCompleted(!completed)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    completed
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-[#38a1f3] hover:bg-blue-600 text-white shadow-md"
                  }`}
                >
                  <HiOutlineCheckCircle className="w-4 h-4" />
                  {completed ? "Completed!" : "Mark Completed"}
                </button>
              </div>
            </div>

            {/* ── LESSON OUTLINE CARD ── */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
              <h2 className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase mb-4">
                Lesson Outline
              </h2>

              <div className="space-y-1">
                {outlineItems.map((item, idx) => {
                  const isActive = activeOutlineIndex === idx;
                  return (
                    <button
                      key={item.title}
                      onClick={() => setActiveOutlineIndex(idx)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-50/80 text-[#0062b1]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate pr-2">
                        {item.isQuiz ? (
                          <HiOutlineClipboardDocumentCheck className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0062b1]" : "text-slate-400"}`} />
                        ) : (
                          <HiPlay className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#0062b1]" : "text-slate-400 opacity-60"}`} />
                        )}
                        <span className="truncate tracking-tight">{item.title}</span>
                      </div>
                      <span className={`text-[11px] font-mono shrink-0 ${isActive ? "text-blue-500 font-bold" : "text-slate-400 font-semibold"}`}>
                        {item.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ANIMATED AI ROBOT WITH FIXED TEXT & CIRCULAR VOICE BUTTON */}
          <div className="lg:col-span-2 lg:sticky lg:top-4 w-full flex flex-col items-center justify-center py-2 relative">
            
            {/* FIXED SPEECH BUBBLE RIGHT AT ROBOT MOUTH (NOT MOVING) */}
            <div className="relative -mb-4 z-20 max-w-xs">
              <div className="bg-gradient-to-r from-[#063966] via-[#0062b1] to-[#38a1f3] text-white text-xs font-bold p-3 px-4 rounded-2xl shadow-xl border border-cyan-300/40 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 shrink-0">
                  <span className="w-1 h-3 bg-cyan-300 rounded-full animate-pulse" />
                  <span className={`w-1 h-4 rounded-full ${isRecording ? "bg-emerald-300 animate-ping" : "bg-white animate-bounce"}`} />
                  <span className="w-1 h-2.5 bg-cyan-200 rounded-full animate-pulse" />
                </div>
                <p className="leading-snug">
                  {isRecording
                    ? voiceDetected
                      ? '"I hear you! Listening to your question..." 🎙️'
                      : '"Speak now! I am listening..." 👂'
                    : '"Hi! Click the mic button to talk!" 🚀'}
                </p>
              </div>
              {/* Pointer tail pointing to mouth */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0062b1] rotate-45 border-r border-b border-cyan-400/40" />
            </div>

            {/* ANIMATED FLOATING ROBOT IMAGE */}
            <div className="relative w-full flex items-center justify-center bg-transparent">
              <img
                src="/assets/robot.png"
                alt="AI Teacher Robot"
                className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl scale-105 sm:scale-115 transition-transform duration-500 animate-[float_4s_ease-in-out_infinite]"
                style={{
                  animation: "float 4s ease-in-out infinite",
                }}
              />
            </div>

            {/* ── UNCARDED CIRCULAR VOICE BUTTON & ORB UNDER ROBOT ── */}
            <div className="mt-2 w-full flex flex-col items-center gap-3 bg-transparent z-20">
              
              {/* Voice Powered Orb (Visible when active) */}
              {isRecording && (
                <div className="w-20 h-20 relative overflow-hidden rounded-full border-2 border-cyan-300/80 shadow-lg shadow-cyan-500/20">
                  <VoicePoweredOrb
                    enableVoiceControl={isRecording}
                    hue={200}
                    onVoiceDetected={setVoiceDetected}
                  />
                </div>
              )}

              {/* Circular Student Voice Button */}
              <Button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-16 h-16 rounded-full flex items-center justify-center p-0 transition-all shadow-xl cursor-pointer hover:scale-110 active:scale-95 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-300 ring-4 ring-red-300/40 animate-pulse"
                    : "bg-gradient-to-r from-[#063966] via-[#0062b1] to-[#38a1f3] hover:from-[#0062b1] hover:to-blue-600 text-white shadow-blue-400/50"
                }`}
                title={isRecording ? "Stop Recording" : "Start Voice Interaction"}
              >
                {isRecording ? (
                  <MicOff className="w-7 h-7" />
                ) : (
                  <Mic className="w-7 h-7" />
                )}
              </Button>

              <span className="text-[11px] font-bold text-slate-500 text-center tracking-wide">
                {isRecording ? "Listening to your voice..." : "Click mic to speak"}
              </span>
            </div>
            
            {/* Inline keyframe injection for floating robot animation */}
            <style jsx>{`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) scale(1.1);
                }
                50% {
                  transform: translateY(-14px) scale(1.12);
                }
              }
            `}</style>
          </div>
        </div>
      </main>
    </div>
  );
}
