export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  lessonsCount: number;
  iconName: string;
  gradient: string;
  enrolled: boolean;
}

// Editable Course List
export const initialCoursesData: Course[] = [
  {
    id: "python-101",
    title: "Python Programming Jungle",
    description: "Master Python fundamentals, variables, loops, and OOP with step-by-step AI guidance.",
    category: "Python",
    level: "Beginner",
    lessonsCount: 30,
    iconName: "python",
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    enrolled: true,
  },
  {
    id: "web-dev-202",
    title: "Web Development Starter",
    description: "Build modern websites with HTML, CSS, JavaScript, and React from scratch.",
    category: "Web Dev",
    level: "Beginner",
    lessonsCount: 45,
    iconName: "code",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    enrolled: true,
  },
  {
    id: "cpp-303",
    title: "C++ & Data Structures",
    description: "Learn memory management, pointers, arrays, stacks, queues, and algorithms.",
    category: "C++",
    level: "Intermediate",
    lessonsCount: 36,
    iconName: "cpu",
    gradient: "from-blue-600 to-violet-700",
    enrolled: false,
  },
  {
    id: "ai-404",
    title: "AI & Machine Learning Intro",
    description: "Understand artificial intelligence concepts, neural networks, and prompt engineering.",
    category: "AI & Data",
    level: "Advanced",
    lessonsCount: 20,
    iconName: "sparkles",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    enrolled: false,
  },
  {
    id: "js-505",
    title: "JavaScript & Async Masterclass",
    description: "Explore closures, promises, async/await, and ES6+ modern JavaScript syntax.",
    category: "JavaScript",
    level: "Intermediate",
    lessonsCount: 28,
    iconName: "terminal",
    gradient: "from-blue-500 to-cyan-500",
    enrolled: false,
  },
];
