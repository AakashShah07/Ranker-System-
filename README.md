# Ranker System

A gamified 60-day exam preparation app built with React Native and Expo. Inspired by Solo Leveling, it turns your study grind into an RPG quest system with XP, ranks, streaks, and battle phases.

## Screenshots

<!-- Add screenshots here -->

## Features

### Quest System
- **60-Day Battle Plan** — A structured study schedule broken into 4 phases: Foundation, Core Building, Completion, and Mock Intensive
- **Daily Quests** — Paper 1, Paper 2, and Practice tasks each day with difficulty ratings (Easy, Normal, Hard, Boss)
- **XP & Leveling** — Earn XP for completing quests, level up through rank tiers (E → D → C → B → A → S → National)

### Progress Tracking
- **Streak System** — Track daily study streaks with penalties for missed days
- **Subject-wise Progress** — See completion rates per subject (Quant, Reasoning, English, DBMS, etc.)
- **Mock Scores** — Log and track mock test performance over time
- **Error Notebook** — Record mistakes with concepts and schedule revisions

### Gamification
- **Rank Badges** — Visual rank progression with hunter-themed titles (E-Rank Hunter → National Level)
- **Phase System** — 4 battle phases with increasing difficulty and score targets
- **Animated UI** — Glowing effects, pulse animations, and a dark cyberpunk aesthetic

### Study Plan (Quest Map)
- **Timeline View** — Visual timeline connecting daily tasks with phase-colored indicators
- **Week Progress Bars** — Track completion per week at a glance
- **Auto-scroll** — Jumps to the current day on screen load
- **Jump to Today FAB** — Floating button to navigate back to the current day
- **Status Indicators** — Color-coded cards for today (cyan), completed (green), missed (amber), and future (dark)

## Tech Stack

- **React Native** with Expo SDK 56
- **TypeScript**
- **Zustand** for state management
- **React Navigation** (Bottom Tabs + Native Stack)
- **AsyncStorage** for persistent data
- **React Native Reanimated** for animations
- **NativeWind** (Tailwind CSS)

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── GlowText.tsx      # Glowing text with shadow effects
│   ├── QuestCard.tsx      # Individual quest display
│   ├── RankBadge.tsx      # Rank tier badge
│   ├── StatCard.tsx       # Stats display card
│   ├── XPBar.tsx          # Experience progress bar
│   ├── LevelUpModal.tsx   # Level up celebration modal
│   └── PenaltyModal.tsx   # Missed day penalty modal
├── screens/          # App screens
│   ├── HomeScreen.tsx         # Hunter status dashboard
│   ├── DailyQuestsScreen.tsx  # Today's quest list
│   ├── StudyPlanScreen.tsx    # 60-day quest map timeline
│   ├── ProgressScreen.tsx     # Stats and analytics
│   ├── SettingsScreen.tsx     # App settings
│   ├── ErrorNotebookScreen.tsx # Mistake tracker
│   └── SplashScreen.tsx       # Launch screen
├── constants/        # App data and config
│   ├── studyPlan.ts      # Full 60-day study plan
│   ├── types.ts          # TypeScript interfaces
│   ├── theme.ts          # Colors and styling
│   └── xp.ts             # XP values per difficulty
├── store/            # State management
│   ├── useGameStore.ts   # Zustand store
│   └── storage.ts        # AsyncStorage adapter
├── utils/            # Helper functions
│   ├── dateUtils.ts      # Date calculations
│   ├── notifications.ts  # Push notifications
│   ├── sound.ts          # Sound effects
│   └── xpCalculator.ts   # XP computation logic
└── navigation/       # Navigation config
    └── AppNavigator.tsx  # Tab + Stack navigator
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- Android/iOS device or emulator

### Installation

```bash
# Clone the repo
git clone https://github.com/AakashShah07/Ranker-System-.git
cd Ranker-System-

# Install dependencies
npm install

# Start the dev server
npx expo start

# Run on Android
npx expo start --android
```

## Rank Progression

| Rank | Title | XP Required |
|------|-------|-------------|
| E | E-Rank Hunter | 0 |
| D | D-Rank Hunter | 500 |
| C | C-Rank Hunter | 1500 |
| B | B-Rank Hunter | 3500 |
| A | A-Rank Hunter | 7000 |
| S | S-Rank Hunter | 12000 |
| National | National Level | 20000 |

## Battle Phases

| Phase | Focus | Duration | Target |
|-------|-------|----------|--------|
| Foundation | DBMS + Quant Basics | Weeks 1-3 | 60% |
| Core Building | Advanced Topics | Weeks 4-6 | 70% |
| Completion | Full Syllabus | Weeks 7-8 | 80% |
| Mock Intensive | Mock Tests + Revision | Week 9 | 85%+ |

## License

This project is for personal use.

---

Built by [Aakash Shah](https://github.com/AakashShah07)
