import React, { useState } from 'react';
import {
  Brain,
  MessageCircle,
  Smile,
  LayoutDashboard,
  BookOpen,
  Target,
  Info,
  LifeBuoy,
  Users,
  ShieldCheck,
  FileText,
  Crown,
} from 'lucide-react';

type PageId =
  | 'dashboard'
  | 'assessment'
  | 'coach'
  | 'mood'
  | 'modules'
  | 'growth'
  | 'about'
  | 'resources'
  | 'community'
  | 'support'
  | 'admin'
  | 'privacy'
  | 'terms'
  | 'premium'
  | 'login';

type NavItem = {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  section: 'main' | 'learn' | 'more';
};

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'main' },
  { id: 'assessment', label: 'EI Assessment', icon: Brain, section: 'main' },
  { id: 'coach', label: 'AI Coach', icon: MessageCircle, section: 'main' },
  { id: 'mood', label: 'Mood Tracker', icon: Smile, section: 'main' },
  { id: 'modules', label: 'Learning', icon: BookOpen, section: 'learn' },
  { id: 'growth', label: 'Growth Plan', icon: Target, section: 'learn' },
  { id: 'about', label: 'About', icon: Info, section: 'more' },
  { id: 'resources', label: 'Resources', icon: BookOpen, section: 'more' },
  { id: 'community', label: 'Community', icon: Users, section: 'more' },
  { id: 'support', label: 'Support', icon: LifeBuoy, section: 'more' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, section: 'more' },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck, section: 'more' },
  { id: 'terms', label: 'Terms', icon: FileText, section: 'more' },
  { id: 'premium', label: 'Premium', icon: Crown, section: 'more' },
];

type MoodEntry = {
  date: string;
  emoji: string;
  label: string;
};

const MOOD_OPTIONS: MoodEntry[] = [
  { emoji: '😄', label: 'Great', date: '' },
  { emoji: '😊', label: 'Good', date: '' },
  { emoji: '😐', label: 'Okay', date: '' },
  { emoji: '😕', label: 'Low', date: '' },
  { emoji: '😢', label: 'Down', date: '' },
];

const DUMMY_DAILY_MOODS: MoodEntry[] = [
  { date: 'Mon', emoji: '😊', label: 'Good' },
  { date: 'Tue', emoji: '😄', label: 'Great' },
  { date: 'Wed', emoji: '😐', label: 'Okay' },
  { date: 'Thu', emoji: '😕', label: 'Low' },
  { date: 'Fri', emoji: '😊', label: 'Good' },
  { date: 'Sat', emoji: '😄', label: 'Great' },
  { date: 'Sun', emoji: '😊', label: 'Good' },
];

type AssessmentQuestion = {
  id: number;
  text: string;
  dimension: 'Self-Awareness' | 'Self-Management' | 'Social Awareness' | 'Relationship Skills';
};

const ASSESSMENT_DIMENSIONS: AssessmentQuestion['dimension'][] = [
  'Self-Awareness',
  'Self-Management',
  'Social Awareness',
  'Relationship Skills',
];

const INITIAL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: 'I can name what I am feeling in the moment.',
    dimension: 'Self-Awareness',
  },
  {
    id: 2,
    text: 'I can pause instead of reacting immediately when I feel triggered.',
    dimension: 'Self-Management',
  },
  {
    id: 3,
    text: 'I notice how other people might be feeling, even if they don\'t say it.',
    dimension: 'Social Awareness',
  },
  {
    id: 4,
    text: 'I can repair conflicts and have difficult conversations respectfully.',
    dimension: 'Relationship Skills',
  },
  {
    id: 5,
    text: 'I regularly reflect on my day and my emotional patterns.',
    dimension: 'Self-Awareness',
  },
  {
    id: 6,
    text: 'I have healthy habits that help me manage stress (sleep, movement, breaks).',
    dimension: 'Self-Management',
  },
];

type AssessmentAnswers = Record<number, number>;

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
];

type ChatMessage = {
  id: number;
  sender: 'user' | 'coach';
  text: string;
};

type LearningModule = {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tag: string;
  completed: boolean;
};

const ADMIN_CREDENTIALS = {
  username: 'vguadmin',
  password: 'vgu@123',
};

const INITIAL_MODULES: LearningModule[] = [
  {
    id: 1,
    title: 'Naming Your Emotions',
    level: 'Beginner',
    duration: '10 min',
    tag: 'Self-Awareness',
    completed: false,
  },
  {
    id: 2,
    title: 'The Pause Technique',
    level: 'Beginner',
    duration: '12 min',
    tag: 'Self-Management',
    completed: false,
  },
  {
    id: 3,
    title: 'Micro-Skills for Listening',
    level: 'Intermediate',
    duration: '15 min',
    tag: 'Relationship',
    completed: false,
  },
];

type GrowthTask = {
  id: number;
  title: string;
  area: string;
  done: boolean;
};

const INITIAL_TASKS: GrowthTask[] = [
  { id: 1, title: 'Daily 5-min emotion check-in', area: 'Self-Awareness', done: false },
  {
    id: 2,
    title: 'Practice one pause before reacting today',
    area: 'Self-Management',
    done: false,
  },
  {
    id: 3,
    title: 'Ask one person “How are you really?” and listen fully',
    area: 'Relationship',
    done: false,
  },
];

function Dashboard() {
  const eiScore = 72;
  const weeklyChange = +8;
  const moodPositiveDays = 5;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">EI Dashboard</h1>
        <p className="text-gray-500">
          Your emotional intelligence snapshot and weekly progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-wide">
              Overall EI Score
            </span>
            <Brain className="h-7 w-7 opacity-90" />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-semibold">{eiScore}</span>
            <span className="mb-1 text-sm font-medium opacity-80">/ 100</span>
          </div>
          <p className="mt-3 text-sm opacity-90">
            You&apos;re building strong emotional foundations. Keep going!
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-500">Weekly Progress</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-emerald-600">
              {weeklyChange > 0 ? '+' : ''}
              {weeklyChange}
            </span>
            <span className="text-sm text-gray-500">points vs last week</span>
          </div>
          <div className="mt-4 h-20 rounded-xl bg-gradient-to-r from-emerald-100 via-emerald-50 to-transparent">
            <div className="flex h-full items-end gap-1 px-1 pb-1">
              {[40, 55, 60, 64, 68, 72, 72].map((v, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-full bg-emerald-500/80"
                  style={{ height: `${30 + (v - 40)}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-500">Mood Summary (7 days)</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-3xl font-semibold text-indigo-600">
                {moodPositiveDays}
                <span className="text-base font-normal text-gray-400"> / 7</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">days felt good or better</p>
            </div>
            <div className="flex gap-1 text-2xl">
              {'😊 😊 😄 😐 😕 😊 😄'.split(' ').map((e, idx) => (
                <span key={idx}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 md:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">EI Dimensions</p>
            <span className="text-xs font-medium text-gray-400">Sample data</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Self-Awareness', value: 78, color: 'bg-indigo-500' },
              { label: 'Self-Management', value: 70, color: 'bg-emerald-500' },
              { label: 'Social Awareness', value: 68, color: 'bg-sky-500' },
              { label: 'Relationship', value: 75, color: 'bg-fuchsia-500' },
            ].map((dim) => (
              <div key={dim.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>{dim.label}</span>
                  <span className="text-gray-700">{dim.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${dim.color}`}
                    style={{ width: `${dim.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-700">Next best steps</p>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-indigo-500" />
              Schedule your next full EI assessment.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-500" />
              Add 1 new growth task for this week.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-fuchsia-500" />
              Check in with someone important to you.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Assessment({
  isAdmin,
  goToAdminLogin,
}: {
  isAdmin: boolean;
  goToAdminLogin: () => void;
}) {
  const [questions, setQuestions] =
    useState<AssessmentQuestion[]>(INITIAL_ASSESSMENT_QUESTIONS);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [newQuestion, setNewQuestion] = useState('');
  const [newDimension, setNewDimension] = useState<AssessmentQuestion['dimension']>(
    ASSESSMENT_DIMENSIONS[0]
  );

  const addQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((q) => q.id)) + 1 : 1,
        text: newQuestion.trim(),
        dimension: newDimension,
      },
    ]);
    setNewQuestion('');
    setNewDimension(ASSESSMENT_DIMENSIONS[0]);
  };

  const handleAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id]);

  const dimensionScores = questions.reduce(
    (acc, q) => {
      const val = answers[q.id];
      if (!val) return acc;
      if (!acc[q.dimension]) acc[q.dimension] = { total: 0, count: 0 };
      acc[q.dimension].total += val;
      acc[q.dimension].count += 1;
      return acc;
    },
    {} as Record<string, { total: number; count: number }>
  );

  const overallScore = (() => {
    const values = Object.values(answers);
    if (!values.length) return 0;
    const avg = values.reduce((s, v) => s + v, 0) / (values.length * 5);
    return Math.round(avg * 100);
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">EI Assessment</h1>
        <p className="text-gray-500">
          Quick self-check across core emotional intelligence dimensions.
        </p>
      </div>

      {isAdmin ? (
        <form
          onSubmit={addQuestion}
          className="space-y-3 rounded-2xl border border-indigo-500/20 bg-white/90 p-4 shadow-sm ring-1 ring-gray-100"
        >
          <p className="text-sm font-semibold text-gray-800">Add a custom question</p>
          <p className="text-xs text-gray-500">
            Personalize this reflection by adding new prompts for any EI dimension.
          </p>
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600" htmlFor="new-question-text">
              Question
            </label>
            <input
              id="new-question-text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Describe the moment you want to reflect on..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600" htmlFor="new-question-dimension">
              Dimension
            </label>
            <select
              id="new-question-dimension"
              value={newDimension}
              onChange={(e) =>
                setNewDimension(e.target.value as AssessmentQuestion['dimension'])
              }
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
            >
              {ASSESSMENT_DIMENSIONS.map((dim) => (
                <option key={dim} value={dim}>
                  {dim}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
            disabled={!newQuestion.trim()}
          >
            Add question
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Only admins can add new assessment questions.{' '}
          <button
            type="button"
            onClick={goToAdminLogin}
            className="font-semibold underline underline-offset-4"
          >
            Sign in as admin
          </button>{' '}
          with username <span className="font-mono">vguadmin</span> to unlock this tool.
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Q{q.id}. {q.text}
                </p>
                <p className="mt-1 text-xs font-medium text-indigo-500">
                  {q.dimension}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {LIKERT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(q.id, opt.value)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition
                    ${
                      answers[q.id] === opt.value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/60'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Your snapshot</p>
            <p className="mt-1 text-xs text-gray-500">
              This is a reflective tool, not a diagnosis. Use it to choose your next
              practice.
            </p>
          </div>
          <button
            type="button"
            disabled={!allAnswered}
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition
              ${
                allAnswered
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            View interpretation
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-xs font-medium text-gray-500">Estimated EI score</p>
            <p className="mt-2 text-4xl font-semibold text-indigo-600">
              {overallScore}
              <span className="text-sm font-normal text-gray-400"> / 100</span>
            </p>
          </div>
          <div className="md:col-span-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(dimensionScores).map(([dim, data]) => {
              const avg = data.total / data.count;
              const percent = Math.round((avg / 5) * 100);
              return (
                <div key={dim} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-medium">{dim}</span>
                    <span>{percent} / 100</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {!Object.keys(dimensionScores).length && (
              <p className="col-span-2 text-xs text-gray-400">
                Answer questions above to see dimension insights.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatCoach() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'coach',
      text: 'Hi, I\'m your EI Coach. What\'s on your mind emotionally right now?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    const simpleCoachReply: ChatMessage = {
      id: messages.length + 2,
      sender: 'coach',
      text:
        'Thank you for sharing. Try to name the main emotion and where you feel it in your body. ' +
        'Then ask yourself: “What might this emotion be trying to protect or tell me?”',
    };

    setMessages((prev) => [...prev, userMessage, simpleCoachReply]);
    setInput('');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">AI Chat Coach</h1>
        <p className="text-gray-500">
          Safe, reflective space to talk through emotions and get coaching prompts.
        </p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
              <Brain className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">EI Coach</p>
              <p className="text-xs text-emerald-500">Online · Reflective coach</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-gray-50 text-gray-800 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 bg-gray-50/60 p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Share what happened or how you feel. Press Enter to send."
              className="block w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="button"
              onClick={handleSend}
              className="mb-0.5 inline-flex h-9 items-center justify-center rounded-2xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            This is a demo AI coach. It offers gentle prompts, not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function MoodTracker() {
  const [selected, setSelected] = useState<MoodEntry | null>(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState<MoodEntry[]>(DUMMY_DAILY_MOODS);

  const handleSave = () => {
    if (!selected) return;
    const today = 'Today';
    const entry: MoodEntry = {
      ...selected,
      date: today,
    };
    setHistory((prev) => [...prev.slice(-6), entry]); // keep last 7
    setSelected(null);
    setNote('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Mood Tracker</h1>
        <p className="text-gray-500">
          Log how you feel with emojis and see your emotional trend over time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 md:col-span-2">
          <p className="text-sm font-medium text-gray-700">Today&apos;s mood</p>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setSelected(m)}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition
                  ${
                    selected?.label === m.label
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-indigo-200 hover:bg-indigo-50'
                  }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          <div>
            <p className="mt-4 text-xs font-medium text-gray-500">
              Optional note
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="What influenced your mood today? (e.g., sleep, conversation, work, weather)"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!selected}
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition
              ${
                selected
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Save mood
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-700">Last 7 entries</p>
          <div className="mt-4 flex items-end gap-2">
            {history.map((m, idx) => (
              <div key={`${m.date}-${idx}`} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xl">{m.emoji}</span>
                <span className="text-[11px] text-gray-500">{m.date}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Look for patterns. Are there days or contexts where positive moods are more
            common?
          </p>
        </div>
      </div>
    </div>
  );
}

function LearningModules() {
  const [modules, setModules] = useState<LearningModule[]>(INITIAL_MODULES);

  const toggleCompleted = (id: number) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">EI Learning Modules</h1>
        <p className="text-gray-500">
          Short, practice-focused lessons to grow emotional skills.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((m) => (
          <div
            key={m.id}
            className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">{m.title}</p>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                  {m.level}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Focus: <span className="font-medium text-indigo-600">{m.tag}</span>
              </p>
              <p className="text-xs text-gray-400">{m.duration} · reflection + practice</p>
            </div>

            <button
              type="button"
              onClick={() => toggleCompleted(m.id)}
              className={`mt-4 inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition
                ${
                  m.completed
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
            >
              {m.completed ? 'Completed' : 'Start practice'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthPlan() {
  const [tasks, setTasks] = useState<GrowthTask[]>(INITIAL_TASKS);
  const [journal, setJournal] = useState('');

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Growth Plan</h1>
        <p className="text-gray-500">
          Turn your EI insights into small, consistent actions and reflections.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-700">Focus tasks</p>
          <ul className="mt-2 space-y-2">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => toggleTask(t.id)}
                  className={`mt-0.5 h-4 w-4 rounded border text-xs ${
                    t.done
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {t.done ? '✓' : ''}
                </button>
                <div>
                  <p
                    className={`text-sm ${
                      t.done ? 'text-gray-400 line-through' : 'text-gray-800'
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="text-xs text-indigo-500">{t.area}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm font-medium text-gray-700">Reflection journal</p>
          <p className="mt-1 text-xs text-gray-500">
            End of day prompt: &quot;What emotion visited me most today and what did it
            need from me?&quot;
          </p>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            rows={8}
            className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            placeholder="Write 3–5 sentences reflecting on a key moment today..."
          />
          <p className="mt-2 text-[11px] text-gray-400">
            This text stays in your browser only in this demo (no backend connected).
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('success');
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-500">
          Secure access
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-50">Member login</h1>
        <p className="mt-1 text-sm text-gray-400">
          Sign in to continue your emotional intelligence journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-800/90 bg-slate-950/70 p-6 shadow-xl shadow-black/40"
      >
        <label className="space-y-2 text-sm text-slate-200" htmlFor="login-email">
          Email address
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            placeholder="you@example.com"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200" htmlFor="login-password">
          Password
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            placeholder="••••••••"
          />
        </label>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
            />
            Remember me
          </label>
          <button
            type="button"
            className="font-medium text-indigo-400 hover:text-indigo-200"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/60 transition hover:bg-indigo-400/90"
        >
          Log in
        </button>

        <p className="text-center text-[11px] text-slate-500">
          Admins can use the same credentials on the admin login page.
        </p>
      </form>

      {status === 'success' && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Demo only: credentials are not verified. Replace with your auth logic.
        </div>
      )}
    </div>
  );
}

function AdminLogin({
  isAdmin,
  onLogin,
  onLogout,
}: {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onLogin();
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-500">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-50">Secure login</h1>
        <p className="mt-1 text-sm text-gray-400">
          Sign in to manage assessment prompts and advanced controls.
        </p>
      </div>

      {isAdmin && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          You are currently logged in as{' '}
          <span className="font-semibold text-white">{ADMIN_CREDENTIALS.username}</span>.
          You can add questions from the assessment page.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-800/90 bg-slate-950/70 p-6 shadow-xl shadow-black/40"
      >
        <label className="space-y-2 text-sm text-slate-200" htmlFor="admin-username">
          Username
          <input
            id="admin-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            placeholder="vguadmin"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200" htmlFor="admin-password">
          Password
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            placeholder="vgu@123"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/60 transition hover:bg-indigo-400/90"
        >
          {isAdmin ? 'Re-authenticate' : 'Login as admin'}
        </button>

        {status === 'error' && (
          <p className="text-center text-xs font-medium text-rose-300">
            Invalid credentials. Try username <span className="font-mono">vguadmin</span> with
            password <span className="font-mono">vgu@123</span>.
          </p>
        )}

        {isAdmin && (
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-2xl border border-slate-700/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-rose-400 hover:text-white"
          >
            Logout
          </button>
        )}
      </form>

      {status === 'success' && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Access granted. Navigate to the assessment to add new questions.
        </div>
      )}
    </div>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-500">{description}</p>
      <p className="text-xs text-gray-400">
        This is a placeholder page. Extend it with real content, sections and actions as
        your product evolves.
      </p>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'assessment':
        return <Assessment isAdmin={isAdmin} goToAdminLogin={() => setActivePage('admin')} />;
      case 'coach':
        return <ChatCoach />;
      case 'mood':
        return <MoodTracker />;
      case 'modules':
        return <LearningModules />;
      case 'growth':
        return <GrowthPlan />;
      case 'about':
        return (
          <PlaceholderPage
            title="About this EI app"
            description="Share the story, science, and intention behind this emotional intelligence journey."
          />
        );
      case 'resources':
        return (
          <PlaceholderPage
            title="Resources"
            description="Curated books, articles, videos, and exercises to support your EI growth."
          />
        );
      case 'community':
        return (
          <PlaceholderPage
            title="Community"
            description="Space for group challenges, reflections, and peer support."
          />
        );
      case 'support':
        return (
          <PlaceholderPage
            title="Support"
            description="Contact, FAQs, and guidance if you need help using the app."
          />
        );
      case 'admin':
        return (
          <AdminLogin
            isAdmin={isAdmin}
            onLogin={() => setIsAdmin(true)}
            onLogout={() => setIsAdmin(false)}
          />
        );
      case 'privacy':
        return (
          <PlaceholderPage
            title="Privacy"
            description="Explain how emotional data is handled with care and respect."
          />
        );
      case 'terms':
        return (
          <PlaceholderPage
            title="Terms of Use"
            description="Legal terms for using this EI coaching and tracking experience."
          />
        );
      case 'premium':
        return (
          <PlaceholderPage
            title="Premium"
            description="Upsell page for deeper coaching, more modules, and advanced analytics."
          />
        );
      case 'login':
        return <LoginPage />;
      default:
        return null;
    }
  };

  const mainNav = NAV_ITEMS.filter((n) => n.section === 'main');
  const learnNav = NAV_ITEMS.filter((n) => n.section === 'learn');
  const moreNav = NAV_ITEMS.filter((n) => n.section === 'more');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-900">
      {/* Side navigation (desktop) */}
      <aside className="hidden w-64 flex-col border-r border-slate-800/80 bg-slate-950/60 px-4 py-5 text-sm text-slate-200/90 shadow-xl shadow-black/40 backdrop-blur-xl md:flex">
        <div className="flex items-center gap-3 px-2 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/80 shadow-md shadow-indigo-900/70">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">Emotional OS</p>
            <p className="text-[11px] text-slate-400">EI Dashboard & Coach</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-5">
          <div>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Main
            </p>
            <div className="mt-1 space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePage(item.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition
                      ${
                        active
                          ? 'bg-indigo-500/20 text-indigo-100'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-50'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Learn
            </p>
            <div className="mt-1 space-y-1">
              {learnNav.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePage(item.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition
                      ${
                        active
                          ? 'bg-indigo-500/20 text-indigo-100'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-50'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              More
            </p>
            <div className="mt-1 space-y-1">
              {moreNav.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePage(item.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition
                      ${
                        active
                          ? 'bg-indigo-500/20 text-indigo-100'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-50'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="mt-4 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-3 py-3 text-[11px] text-slate-300 shadow-sm">
          <p className="flex items-center gap-1 text-slate-100">
            <Crown className="h-3.5 w-3.5 text-amber-400" /> Premium reflection
          </p>
          <p className="mt-1 text-slate-400">
            Unlock deeper analytics, longer coach sessions, and guided programs.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-20 pt-4 sm:px-6 sm:pt-6 md:pb-6 md:pt-8">
          {/* Top bar */}
          <header className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-500/90 shadow-md shadow-indigo-900/70">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-50">Emotional OS</p>
                <p className="text-[11px] text-slate-400">
                  {NAV_ITEMS.find((n) => n.id === activePage)?.label}
                </p>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-1.5 text-xs text-slate-200 shadow-sm">
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-slate-400">Today&apos;s focus</span>
                  <span className="font-medium text-slate-100">
                    Name, feel, and then choose.
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition
                    ${
                      activePage === 'login'
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100'
                        : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-indigo-400 hover:text-white'
                    }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('admin')}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition
                    ${
                      activePage === 'admin'
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100'
                        : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-indigo-400 hover:text-white'
                    }`}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </header>

          {/* Routed page content */}
          <div className="flex-1 rounded-3xl border border-slate-800/90 bg-slate-950/60 p-4 shadow-xl shadow-black/40 backdrop-blur-xl sm:p-6 md:p-7">
            {renderPage()}
          </div>
        </div>

        {/* Bottom navigation (mobile) */}
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-800/90 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-300 shadow-[0_-10px_30px_rgba(15,23,42,0.9)] backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-1">
            {['dashboard', 'assessment', 'coach', 'mood', 'modules'].map((id) => {
              const item = NAV_ITEMS.find((n) => n.id === id)!;
              const Icon = item.icon;
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1.5 py-1.5 transition
                    ${
                      active
                        ? 'bg-indigo-500/20 text-indigo-100'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-50'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

export default App;
