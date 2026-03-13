// Mock data store for EduForge - replaces database calls for local development

export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
  avatar?: string
}

export interface Course {
  id: string
  title: string
  description: string
  language: string
  level: string
  category?: string
  tags: string[]
  thumbnail?: string
  teacherId: string
  teacher?: User
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED'
  license: string
  enrollmentCount?: number
  moduleCount?: number
  createdAt: string
  updatedAt: string
}

export interface Module {
  id: string
  courseId: string
  title: string
  description?: string
  objectives?: string
  order: number
  duration?: number
  topics: Topic[]
}

export interface Topic {
  id: string
  moduleId: string
  title: string
  type: 'THEORY' | 'PRESENTATION' | 'QUIZ' | 'ASSIGNMENT' | 'VIDEO' | 'DISCUSSION'
  content: Record<string, unknown>
  order: number
  duration?: number
  bloomLevel?: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'MCQ_SINGLE' | 'MCQ_MULTIPLE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'MATCHING' | 'ORDERING' | 'FILL_BLANK' | 'ESSAY' | 'HOTSPOT' | 'CODE'
  options?: string[]
  correctAnswer?: string | number | number[]
  explanation?: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  bloomLevel?: string
  points: number
}

export interface Feedback {
  id: string
  courseId: string
  userId?: string
  userName?: string
  rating: number
  comment?: string
  sentiment?: string
  createdAt: string
}

export interface ForumPost {
  id: string
  courseId: string
  userId: string
  userName: string
  userAvatar?: string
  title: string
  content: string
  tag: 'QUESTION' | 'DISCUSSION' | 'ANNOUNCEMENT' | 'RESOURCE'
  upvotes: number
  replyCount: number
  createdAt: string
}

export interface ChatMsg {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface MediaItem {
  id: string
  filename: string
  url: string
  type: 'image' | 'video' | 'audio' | 'document'
  size: number
  altText?: string
  tags: string[]
  createdAt: string
}

export interface AnalyticsData {
  enrollments: { date: string; count: number }[]
  completionRates: { module: string; rate: number }[]
  quizScores: { question: string; avgScore: number }[]
  timeSpent: { module: string; minutes: number }[]
  sentimentData: { positive: number; neutral: number; negative: number }
}

// Current user (mock authenticated user)
export const currentUser: User = {
  id: 'user-1',
  email: 'teacher@tatu.uz',
  name: 'Aziz Karimov',
  role: 'TEACHER',
  avatar: undefined
}

// Mock courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Python dasturlash asoslari',
    description: 'Python dasturlash tilining asosiy tushunchalari, ma\'lumotlar turlari, funksiyalar, OOP va amaliy loyihalar.',
    language: 'uz',
    level: 'beginner',
    category: 'Dasturlash',
    tags: ['python', 'dasturlash', 'boshlangʻich'],
    teacherId: 'user-1',
    status: 'PUBLISHED',
    license: 'CC BY',
    enrollmentCount: 156,
    moduleCount: 8,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-12-15T14:30:00Z'
  },
  {
    id: 'course-2',
    title: 'Ma\'lumotlar bazasi boshqaruvi',
    description: 'SQL, PostgreSQL, ma\'lumotlar bazasi loyihalash, normalizatsiya va optimallashtirish.',
    language: 'uz',
    level: 'intermediate',
    category: 'Ma\'lumotlar bazasi',
    tags: ['sql', 'postgresql', 'database'],
    teacherId: 'user-1',
    status: 'DRAFT',
    license: 'CC BY-SA',
    enrollmentCount: 0,
    moduleCount: 5,
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-02-20T16:45:00Z'
  },
  {
    id: 'course-3',
    title: 'Web dasturlash (Full-Stack)',
    description: 'HTML, CSS, JavaScript, React, Node.js va zamonaviy web texnologiyalar.',
    language: 'uz',
    level: 'intermediate',
    category: 'Web dasturlash',
    tags: ['web', 'react', 'nodejs', 'fullstack'],
    teacherId: 'user-1',
    status: 'REVIEW',
    license: 'CC BY-NC',
    enrollmentCount: 89,
    moduleCount: 12,
    createdAt: '2024-11-05T12:00:00Z',
    updatedAt: '2025-03-01T09:15:00Z'
  },
  {
    id: 'course-4',
    title: 'Sun\'iy intellekt asoslari',
    description: 'Machine Learning, Deep Learning, neural tarmoqlar va AI ning amaliy qoʻllanilishi.',
    language: 'uz',
    level: 'advanced',
    category: 'Sun\'iy intellekt',
    tags: ['ai', 'ml', 'deep-learning'],
    teacherId: 'user-1',
    status: 'DRAFT',
    license: 'CC BY',
    enrollmentCount: 0,
    moduleCount: 3,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-10T11:00:00Z'
  }
]

// Mock modules for course-1
export const mockModules: Module[] = [
  {
    id: 'mod-1',
    courseId: 'course-1',
    title: 'Kirish va muhit sozlash',
    description: 'Python dasturlash muhitini o\'rnatish va sozlash',
    objectives: 'Python o\'rnatish, IDE tanlash, birinchi dastur yozish',
    order: 1,
    duration: 45,
    topics: [
      { id: 'topic-1', moduleId: 'mod-1', title: 'Python nima?', type: 'THEORY', content: { blocks: [{ type: 'paragraph', content: 'Python — yuqori darajali, umumiy maqsadli dasturlash tili.' }] }, order: 1, duration: 15, bloomLevel: 'REMEMBER' },
      { id: 'topic-2', moduleId: 'mod-1', title: 'Python o\'rnatish', type: 'THEORY', content: {}, order: 2, duration: 20, bloomLevel: 'APPLY' },
      { id: 'topic-3', moduleId: 'mod-1', title: 'Kirish testi', type: 'QUIZ', content: { questions: [] }, order: 3, duration: 10, bloomLevel: 'UNDERSTAND' },
    ]
  },
  {
    id: 'mod-2',
    courseId: 'course-1',
    title: 'O\'zgaruvchilar va ma\'lumotlar turlari',
    description: 'Python da ma\'lumotlar turlari va o\'zgaruvchilar bilan ishlash',
    objectives: 'int, float, str, bool turlarini tushunish',
    order: 2,
    duration: 60,
    topics: [
      { id: 'topic-4', moduleId: 'mod-2', title: 'O\'zgaruvchilar', type: 'THEORY', content: {}, order: 1, duration: 20, bloomLevel: 'UNDERSTAND' },
      { id: 'topic-5', moduleId: 'mod-2', title: 'Ma\'lumotlar turlari', type: 'THEORY', content: {}, order: 2, duration: 25, bloomLevel: 'UNDERSTAND' },
      { id: 'topic-6', moduleId: 'mod-2', title: 'Amaliy mashq', type: 'ASSIGNMENT', content: {}, order: 3, duration: 15, bloomLevel: 'APPLY' },
    ]
  },
  {
    id: 'mod-3',
    courseId: 'course-1',
    title: 'Shart operatorlari',
    description: 'if, elif, else operatorlari va mantiqiy ifodalar',
    order: 3,
    duration: 50,
    topics: [
      { id: 'topic-7', moduleId: 'mod-3', title: 'if-else operatorlari', type: 'THEORY', content: {}, order: 1, duration: 25, bloomLevel: 'UNDERSTAND' },
      { id: 'topic-8', moduleId: 'mod-3', title: 'Video dars', type: 'VIDEO', content: {}, order: 2, duration: 15, bloomLevel: 'UNDERSTAND' },
      { id: 'topic-9', moduleId: 'mod-3', title: 'Nazorat testi', type: 'QUIZ', content: {}, order: 3, duration: 10, bloomLevel: 'APPLY' },
    ]
  },
  {
    id: 'mod-4',
    courseId: 'course-1',
    title: 'Sikllar (Loops)',
    description: 'for va while sikllari, break, continue operatorlari',
    order: 4,
    duration: 55,
    topics: []
  },
  {
    id: 'mod-5',
    courseId: 'course-1',
    title: 'Funksiyalar',
    description: 'Funksiyalarni yaratish va ishlatish, parametrlar, return',
    order: 5,
    duration: 60,
    topics: []
  }
]

// Mock quiz questions
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Python dasturlash tili qachon yaratilgan?',
    type: 'MCQ_SINGLE',
    options: ['1989-yil', '1991-yil', '1995-yil', '2000-yil'],
    correctAnswer: 1,
    explanation: 'Python 1991-yilda Guido van Rossum tomonidan yaratilgan.',
    difficulty: 'EASY',
    bloomLevel: 'REMEMBER',
    points: 10
  },
  {
    id: 'q-2',
    question: 'Python interpretatsiya qilinadigan tildir.',
    type: 'TRUE_FALSE',
    options: ['To\'g\'ri', 'Noto\'g\'ri'],
    correctAnswer: 0,
    explanation: 'Python interpretatsiya qilinadigan tildir, ya\'ni kodni kompilyatsiya qilmasdan to\'g\'ridan-to\'g\'ri bajaradi.',
    difficulty: 'EASY',
    bloomLevel: 'REMEMBER',
    points: 5
  },
  {
    id: 'q-3',
    question: 'Quyidagi kodning natijasi nima bo\'ladi?\n\nx = 10\ny = 3\nprint(x % y)',
    type: 'SHORT_ANSWER',
    correctAnswer: '1',
    explanation: '10 ni 3 ga bo\'lgandagi qoldiq 1 ga teng.',
    difficulty: 'MEDIUM',
    bloomLevel: 'APPLY',
    points: 15
  },
  {
    id: 'q-4',
    question: 'Quyidagi ma\'lumotlar turlarining mosligini toping:',
    type: 'MATCHING',
    options: ['42 → int', '"hello" → str', '3.14 → float', 'True → bool'],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Python da har bir qiymat o\'z turiga ega.',
    difficulty: 'MEDIUM',
    bloomLevel: 'UNDERSTAND',
    points: 20
  },
  {
    id: 'q-5',
    question: 'Python da list va tuple orasidagi asosiy farqni tushuntiring.',
    type: 'ESSAY',
    explanation: 'List o\'zgaruvchan (mutable), tuple esa o\'zgarmas (immutable). List [] bilan, tuple () bilan yaratiladi.',
    difficulty: 'HARD',
    bloomLevel: 'ANALYZE',
    points: 25
  }
]

// Mock feedback
export const mockFeedback: Feedback[] = [
  { id: 'fb-1', courseId: 'course-1', userId: 'student-1', userName: 'Sherzod T.', rating: 5, comment: 'Juda foydali kurs, tushuntirishlar aniq va ravshan.', sentiment: 'positive', createdAt: '2025-02-15T10:00:00Z' },
  { id: 'fb-2', courseId: 'course-1', userId: 'student-2', userName: 'Malika R.', rating: 4, comment: 'Yaxshi kurs, lekin videolar ko\'proq bo\'lsa yaxshi bo\'lardi.', sentiment: 'positive', createdAt: '2025-02-14T14:30:00Z' },
  { id: 'fb-3', courseId: 'course-1', userId: 'student-3', userName: 'Bobur K.', rating: 3, comment: 'Ba\'zi mavzular juda tez o\'tilgan, ko\'proq misol kerak.', sentiment: 'neutral', createdAt: '2025-02-13T09:15:00Z' },
  { id: 'fb-4', courseId: 'course-1', userId: 'student-4', userName: 'Nilufar A.', rating: 5, comment: 'Eng yaxshi Python kursi! O\'qituvchi juda yaxshi tushuntiradi.', sentiment: 'positive', createdAt: '2025-02-12T16:00:00Z' },
  { id: 'fb-5', courseId: 'course-1', userId: 'student-5', userName: 'Jasur M.', rating: 2, comment: 'Testlar juda qiyin, mavzuga mos emas.', sentiment: 'negative', createdAt: '2025-02-11T11:45:00Z' },
  { id: 'fb-6', courseId: 'course-1', userId: 'student-6', userName: 'Dilnoza S.', rating: 4, comment: 'Kurs yaxshi tuzilgan, amaliy mashqlar foydali.', sentiment: 'positive', createdAt: '2025-02-10T08:30:00Z' },
]

// Mock analytics
export const mockAnalytics: AnalyticsData = {
  enrollments: [
    { date: '2025-01', count: 23 },
    { date: '2025-02', count: 45 },
    { date: '2025-03', count: 38 },
    { date: '2025-04', count: 52 },
    { date: '2025-05', count: 67 },
    { date: '2025-06', count: 89 },
  ],
  completionRates: [
    { module: 'Kirish', rate: 95 },
    { module: 'O\'zgaruvchilar', rate: 87 },
    { module: 'Shart op.', rate: 78 },
    { module: 'Sikllar', rate: 65 },
    { module: 'Funksiyalar', rate: 52 },
  ],
  quizScores: [
    { question: '1-savol', avgScore: 92 },
    { question: '2-savol', avgScore: 85 },
    { question: '3-savol', avgScore: 67 },
    { question: '4-savol', avgScore: 73 },
    { question: '5-savol', avgScore: 45 },
  ],
  timeSpent: [
    { module: 'Kirish', minutes: 35 },
    { module: 'O\'zgaruvchilar', minutes: 58 },
    { module: 'Shart op.', minutes: 42 },
    { module: 'Sikllar', minutes: 65 },
    { module: 'Funksiyalar', minutes: 71 },
  ],
  sentimentData: { positive: 65, neutral: 20, negative: 15 }
}

// Mock forum posts
export const mockForumPosts: ForumPost[] = [
  { id: 'fp-1', courseId: 'course-1', userId: 'student-1', userName: 'Sherzod T.', title: 'for sikl ichida break ishlatish', content: 'break operatori qachon ishlatiladi?', tag: 'QUESTION', upvotes: 5, replyCount: 3, createdAt: '2025-02-15T10:00:00Z' },
  { id: 'fp-2', courseId: 'course-1', userId: 'student-2', userName: 'Malika R.', title: 'Python da eng yaxshi IDE', content: 'Qaysi IDE dan foydalanish yaxshi?', tag: 'DISCUSSION', upvotes: 12, replyCount: 8, createdAt: '2025-02-14T14:30:00Z' },
  { id: 'fp-3', courseId: 'course-1', userId: 'user-1', userName: 'Aziz Karimov', title: 'Yangi modul qo\'shildi', content: 'Funksiyalar moduli qo\'shildi!', tag: 'ANNOUNCEMENT', upvotes: 20, replyCount: 2, createdAt: '2025-02-13T09:15:00Z' },
]

// Mock media
export const mockMedia: MediaItem[] = [
  { id: 'media-1', filename: 'python-logo.png', url: '/placeholder-img.svg', type: 'image', size: 45000, altText: 'Python logotipi', tags: ['python', 'logo'], createdAt: '2025-01-10T08:00:00Z' },
  { id: 'media-2', filename: 'dars-1-video.mp4', url: '/placeholder-vid.svg', type: 'video', size: 125000000, altText: '1-dars video', tags: ['video', 'dars'], createdAt: '2025-01-15T10:00:00Z' },
  { id: 'media-3', filename: 'slides-kirish.pdf', url: '/placeholder-doc.svg', type: 'document', size: 2500000, tags: ['slayd', 'kirish'], createdAt: '2025-01-20T12:00:00Z' },
  { id: 'media-4', filename: 'diagram-oop.png', url: '/placeholder-img.svg', type: 'image', size: 78000, altText: 'OOP diagrammasi', tags: ['oop', 'diagram'], createdAt: '2025-02-01T09:00:00Z' },
]
