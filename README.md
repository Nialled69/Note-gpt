# Note-GPT  <img src="https://note-gpt-oo.vercel.app/favicon.ico" width="28" height="28" style="vertical-align: middle;" />

An AI-powered simple notes app built with ❤️(and labour) using **Next.js**, **React**, **TailwindCSS**, **TypeScript** and **ShadCN UI**. 

Capture your thoughts and turn them into intelligent summaries — fast, clean, and beautifully dark-mode ready.

---

## 🧪 Tech Stack

| Layer         | Tech                         |
| ------------- | ---------------------------- |
| Framework     | [Next.js](https://nextjs.org/)  |
| Database      | [Supabase](https://supabase.com) |
| Auth          | [Supabase](https://supabase.com/auth) + [Google Cloud client](https://console.cloud.google.com/auth/overview)|
| AI tool       | [DeepSeek R1](https://deepseek.com) |
| Styling       | [TailwindCSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| State handling| [React Query](https://tanstack.com/query/latest) |
| Toasts UI     | [Sonner](https://sonner.emilkowal.dev/) |

---

## ⚙️ Features

- ✍️ Write and manage your personal notes
- 🧠 Generate AI-powered summaries using powerful DeepSeek R1 LLM model
- 🔐 Secure login with Supabase Auth (Google + regular Emails)
- 🌗 Dark mode toggle (because... why not?)
- 💬 Toast notifications via Sonner
- ♻️ Auto-refreshing state with seamless handling of cookies and tokens
- 🧼 TypeScript + ESLint + Prettier enforced

---

## 🚀 Getting Started

### 1. Cloning the repo

```bash
git clone https://github.com/Nialled69/Note-gpt.git
```
```bash
cd note-gpt
```

### 2. Installing the dependencies

```bash
npm i
# or
yarn i
#or
pnpm i
```

### 3. Settin up environment variables

Create a `.env.local` file in the root and add these:

```env
NEXT_PUBLIC_SUPABASE_URL=<Your supabase project URL without quotes>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your supabase project anon Key without quotes>
OPENROUTER_API_KEY=<Your LLM model API key without quotes>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Note-GPT
```

### 4. Run in localhost

```bash
npm run dev
```

Open `http://localhost:3000` and ✨ start writing, editing and summarizing your notes!

---

## 🧠 AI Summarization

Powered by the blazing-fast [DeepSeek R1](https://deepseek.com) API.

- Summary generation is triggered via a `Summarize` button on each note.
- The `summarizeNote` server action sends note content to the DeepSeek R1 API.
- Responses are parsed with full TypeScript safety and fallback error handling.
- Toast messages via `sonner` display feedback for success, rate-limits, or unknown errors.
- Server error parsing uses strict `unknown` type narrowing for clean logs and lint-free code.
