import { DayPlan, Quest, Difficulty } from './types';
import { XP_VALUES } from './xp';

let questIdCounter = 0;
function q(
  title: string,
  subject: string,
  category: 'paper1' | 'paper2' | 'practice',
  difficulty: Difficulty,
  estimatedMinutes: number
): Quest {
  questIdCounter++;
  return {
    id: `q${questIdCounter}`,
    title,
    subject,
    category,
    difficulty,
    xp: XP_VALUES[difficulty],
    estimatedMinutes,
    status: 'pending',
  };
}

export const STUDY_PLAN: DayPlan[] = [
  // ==================== WEEK 1 (23 May - 29 May) ====================
  // Focus: DBMS + Quant Basics | Score Target: 60%
  {
    dayNumber: 1, weekNumber: 1, phase: 'foundation', date: '2026-05-23',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Quant: Number System + LCM HCF', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Blood Relations', 'Reasoning', 'paper1', 'normal', 40),
      q('DBMS: ER Model, Entities, Attributes, Relationships', 'DBMS', 'paper2', 'normal', 60),
      q('DBMS: ER Diagram Practice', 'DBMS', 'paper2', 'easy', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Make formula sheet', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 2, weekNumber: 1, phase: 'foundation', date: '2026-05-24',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Quant: Average + Age Problems', 'Quant', 'paper1', 'normal', 45),
      q('English: Synonyms + Antonyms', 'English', 'paper1', 'easy', 30),
      q('DBMS: Relational Model, Keys (Primary, Foreign, Candidate)', 'DBMS', 'paper2', 'normal', 60),
      q('DBMS: Relational Algebra', 'DBMS', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Revise Day 1 notes', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 3, weekNumber: 1, phase: 'foundation', date: '2026-05-25',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Quant: Percentage', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Coding-Decoding', 'Reasoning', 'paper1', 'normal', 40),
      q('DBMS: SQL - SELECT, WHERE, GROUP BY, HAVING, ORDER BY', 'DBMS', 'paper2', 'hard', 60),
      q('DBMS: Nested Queries Practice', 'DBMS', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('SQL practice on paper', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 4, weekNumber: 1, phase: 'foundation', date: '2026-05-26',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Quant: Ratio & Proportion', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Alphabetical Series', 'Reasoning', 'paper1', 'easy', 30),
      q('DBMS: Normalization - 1NF, 2NF, 3NF, BCNF', 'DBMS', 'paper2', 'hard', 60),
      q('DBMS: Functional Dependencies', 'DBMS', 'paper2', 'hard', 30),
      q('TOPIC TEST: DBMS (30 MCQs) + Quant (25 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 5, weekNumber: 1, phase: 'foundation', date: '2026-05-27',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Quant: Profit & Loss', 'Quant', 'paper1', 'normal', 45),
      q('English: Parts of Speech + Tenses', 'English', 'paper1', 'easy', 30),
      q('DBMS: Transactions, ACID Properties', 'DBMS', 'paper2', 'normal', 50),
      q('DBMS: Concurrency Control (Locking, Timestamp)', 'DBMS', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Revise Normalization', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 6, weekNumber: 1, phase: 'foundation', date: '2026-05-28',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('Reasoning: Direction & Distance', 'Reasoning', 'paper1', 'normal', 40),
      q('English: Error Spotting', 'English', 'paper1', 'normal', 30),
      q('DBMS: Indexing, Joins (Inner, Outer, Cross, Self)', 'DBMS', 'paper2', 'hard', 60),
      q('DBMS: B/B+ Trees', 'DBMS', 'paper2', 'hard', 40),
      q('SECTIONAL TEST: Full DBMS (50 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('Quant + Reasoning (30 MCQs)', 'Practice', 'practice', 'hard', 30),
    ],
  },
  {
    dayNumber: 7, weekNumber: 1, phase: 'foundation', date: '2026-05-29',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'DBMS + Quant Basics', scoreTarget: '60%',
    quests: [
      q('REVISION: All Week 1 topics', 'Practice', 'practice', 'normal', 60),
      q('DBMS complete revision', 'DBMS', 'paper2', 'normal', 60),
      q('Quant formulas recap', 'Quant', 'paper1', 'easy', 30),
      q('Error notebook review', 'Practice', 'practice', 'easy', 20),
      q('Mini Mock: 30 P1 + 30 P2', 'Practice', 'practice', 'boss', 60),
      q('Analyze weak areas', 'Practice', 'practice', 'easy', 15),
    ],
  },

  // ==================== WEEK 2 (30 May - 5 Jun) ====================
  // Focus: Operating System + Quant Arithmetic | Score Target: 65%
  {
    dayNumber: 8, weekNumber: 2, phase: 'foundation', date: '2026-05-30',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Quant: Time, Speed & Distance', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Number Series', 'Reasoning', 'paper1', 'normal', 40),
      q('OS: Process Concepts, PCB, Process States', 'OS', 'paper2', 'normal', 50),
      q('OS: Threads, Multithreading', 'OS', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('DBMS quick revision (30 min)', 'Practice', 'practice', 'easy', 30),
    ],
  },
  {
    dayNumber: 9, weekNumber: 2, phase: 'foundation', date: '2026-05-31',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Quant: Time & Work', 'Quant', 'paper1', 'normal', 45),
      q('English: Reading Comprehension (Basics)', 'English', 'paper1', 'normal', 40),
      q('OS: CPU Scheduling - FCFS, SJF, SRTF', 'OS', 'paper2', 'hard', 50),
      q('OS: Round Robin, Priority, MLQ', 'OS', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Solve 5 scheduling numericals', 'Practice', 'practice', 'normal', 30),
    ],
  },
  {
    dayNumber: 10, weekNumber: 2, phase: 'foundation', date: '2026-06-01',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Quant: Simple & Compound Interest', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Syllogism', 'Reasoning', 'paper1', 'normal', 40),
      q('OS: Deadlock - Conditions, Prevention, Avoidance', 'OS', 'paper2', 'hard', 50),
      q("OS: Banker's Algorithm, Detection", 'OS', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q("Practice Banker's algorithm", 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 11, weekNumber: 2, phase: 'foundation', date: '2026-06-02',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Quant: Mixture & Allegation', 'Quant', 'paper1', 'normal', 45),
      q('Reasoning: Statement & Conclusions', 'Reasoning', 'paper1', 'normal', 40),
      q('OS: Memory Management - Paging, Segmentation', 'OS', 'paper2', 'hard', 50),
      q('OS: Page Table', 'OS', 'paper2', 'normal', 30),
      q('TOPIC TEST: OS (30 MCQs) + Quant Arith (25 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 12, weekNumber: 2, phase: 'foundation', date: '2026-06-03',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Quant: Pipes & Cistern + Boat & Stream', 'Quant', 'paper1', 'normal', 45),
      q('English: Sentence Correction', 'English', 'paper1', 'normal', 30),
      q('OS: Virtual Memory, Page Replacement (FIFO, LRU, Optimal)', 'OS', 'paper2', 'hard', 50),
      q('OS: Thrashing', 'OS', 'paper2', 'normal', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Solve page replacement numericals', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 13, weekNumber: 2, phase: 'foundation', date: '2026-06-04',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('Reasoning: Clocks & Calendars', 'Reasoning', 'paper1', 'normal', 40),
      q('English: Fill in Blanks', 'English', 'paper1', 'easy', 30),
      q('OS: File System, Synchronization (Semaphores, Mutex)', 'OS', 'paper2', 'hard', 50),
      q('OS: Monitors', 'OS', 'paper2', 'normal', 30),
      q('SECTIONAL TEST: Full OS (50 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('Reasoning (30 MCQs)', 'Practice', 'practice', 'hard', 30),
    ],
  },
  {
    dayNumber: 14, weekNumber: 2, phase: 'foundation', date: '2026-06-05',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'Operating System + Quant Arithmetic', scoreTarget: '65%',
    quests: [
      q('REVISION: Week 1-2 topics', 'Practice', 'practice', 'normal', 60),
      q('DBMS + OS combined revision', 'DBMS', 'paper2', 'normal', 60),
      q('Quant Arithmetic formulas', 'Quant', 'paper1', 'easy', 30),
      q('Error notebook review', 'Practice', 'practice', 'easy', 20),
      q('Mini Mock: 40 P1 + 40 P2', 'Practice', 'practice', 'boss', 60),
      q('Compare with Week 1 score', 'Practice', 'practice', 'easy', 15),
    ],
  },

  // ==================== WEEK 3 (6 Jun - 12 Jun) ====================
  // Focus: Computer Networks + Reasoning Advanced | Score Target: 65%
  {
    dayNumber: 15, weekNumber: 3, phase: 'foundation', date: '2026-06-06',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Reasoning: Directions + Analogy', 'Reasoning', 'paper1', 'normal', 40),
      q('Quant: Surds and Indices', 'Quant', 'paper1', 'normal', 40),
      q('CN: OSI Model (7 Layers), TCP/IP Model (4 Layers)', 'CN', 'paper2', 'normal', 50),
      q('CN: Layer Comparison', 'CN', 'paper2', 'easy', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Draw layer diagrams', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 16, weekNumber: 3, phase: 'foundation', date: '2026-06-07',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Reasoning: Cubes & Dice', 'Reasoning', 'paper1', 'normal', 40),
      q('English: Para Jumbles', 'English', 'paper1', 'normal', 30),
      q('CN: IP Addressing (IPv4, IPv6), Subnetting, CIDR', 'CN', 'paper2', 'hard', 60),
      q('CN: Classful/Classless', 'CN', 'paper2', 'normal', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Solve 10 subnetting problems', 'Practice', 'practice', 'hard', 30),
    ],
  },
  {
    dayNumber: 17, weekNumber: 3, phase: 'foundation', date: '2026-06-08',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Reasoning: Mirror Images + Embedded Figures', 'Reasoning', 'paper1', 'normal', 40),
      q('Quant: Mensuration (2D)', 'Quant', 'paper1', 'normal', 40),
      q('CN: Routing Protocols (RIP, OSPF, BGP)', 'CN', 'paper2', 'hard', 50),
      q('CN: TCP vs UDP, 3-Way Handshake', 'CN', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Protocol comparison chart', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 18, weekNumber: 3, phase: 'foundation', date: '2026-06-09',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Reasoning: Data Analysis (Tables & Graphs)', 'Reasoning', 'paper1', 'hard', 45),
      q('English: Jumbled Sentences', 'English', 'paper1', 'normal', 30),
      q('CN: DNS, HTTP/HTTPS, FTP, SMTP, POP3, IMAP, DHCP', 'CN', 'paper2', 'normal', 50),
      q('TOPIC TEST: CN (30 MCQs) + Reasoning (25 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 19, weekNumber: 3, phase: 'foundation', date: '2026-06-10',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Reasoning: Seating Arrangements (Linear & Circular)', 'Reasoning', 'paper1', 'hard', 45),
      q('Quant: Probability', 'Quant', 'paper1', 'normal', 40),
      q('CN: Network Security - Firewall, Encryption, SSL/TLS', 'CN', 'paper2', 'normal', 50),
      q('CN: VPN', 'CN', 'paper2', 'easy', 20),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Seating arrangement practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 20, weekNumber: 3, phase: 'foundation', date: '2026-06-11',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('Quant: Mensuration (3D)', 'Quant', 'paper1', 'normal', 40),
      q('Reasoning: Statement & Arguments', 'Reasoning', 'paper1', 'normal', 40),
      q('CN Revision: All protocols, layers, addressing', 'CN', 'paper2', 'normal', 60),
      q('SECTIONAL TEST: Full CN (50 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('Quant (30 MCQs)', 'Practice', 'practice', 'hard', 30),
    ],
  },
  {
    dayNumber: 21, weekNumber: 3, phase: 'foundation', date: '2026-06-12',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'Computer Networks + Reasoning Advanced', scoreTarget: '65%',
    quests: [
      q('REVISION: Week 1-3 | DBMS + OS + CN combined', 'Practice', 'practice', 'normal', 60),
      q('All Quant formulas revision', 'Quant', 'paper1', 'easy', 30),
      q('Error notebook review', 'Practice', 'practice', 'easy', 20),
      q('Mini Mock: 50 P1 + 50 P2', 'Practice', 'practice', 'boss', 90),
      q('Track improvement', 'Practice', 'practice', 'easy', 15),
    ],
  },

  // ==================== WEEK 4 (13 Jun - 19 Jun) ====================
  // PHASE 2: CORE BUILDING | Focus: DSA + English Completion | Score Target: 70%
  {
    dayNumber: 22, weekNumber: 4, phase: 'core', date: '2026-06-13',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('English: RC Practice (2 passages)', 'English', 'paper1', 'normal', 40),
      q('Quant: Permutation & Combination', 'Quant', 'paper1', 'hard', 45),
      q('DSA: Programming Basics, Arrays, Strings', 'DSA', 'paper2', 'normal', 50),
      q('DSA: Linked List (Singly, Doubly, Circular)', 'DSA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Code tracing practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 23, weekNumber: 4, phase: 'core', date: '2026-06-14',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('English: Sentence Completion + Idioms', 'English', 'paper1', 'normal', 30),
      q('Reasoning: Non-Verbal Series', 'Reasoning', 'paper1', 'normal', 40),
      q('DSA: Stack (Applications, Infix/Postfix)', 'DSA', 'paper2', 'normal', 50),
      q('DSA: Queue (Circular, Priority, Deque)', 'DSA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Stack/Queue output tracing', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 24, weekNumber: 4, phase: 'core', date: '2026-06-15',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('Quant: Decimal Fractions + Elementary Statistics', 'Quant', 'paper1', 'normal', 40),
      q('English: Idiomatic Usage', 'English', 'paper1', 'easy', 30),
      q('DSA: Trees - Binary Tree, BST, Heap', 'DSA', 'paper2', 'hard', 60),
      q('DSA: Traversals (In/Pre/Post), Heap Sort', 'DSA', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Tree traversal practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 25, weekNumber: 4, phase: 'core', date: '2026-06-16',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('Reasoning: Decision Making + Embedded Figures', 'Reasoning', 'paper1', 'normal', 40),
      q('GA: Indian Polity & Constitution', 'GA', 'paper1', 'normal', 40),
      q('DSA: Graphs (BFS, DFS, Representations)', 'DSA', 'paper2', 'hard', 50),
      q('DSA: Hashing (Hash Functions, Collision Handling)', 'DSA', 'paper2', 'normal', 40),
      q('TOPIC TEST: DSA (30 MCQs) + English (25 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 26, weekNumber: 4, phase: 'core', date: '2026-06-17',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('GA: Indian History (Ancient + Medieval + Modern)', 'GA', 'paper1', 'normal', 45),
      q('Quant: Revision - Number System, Percentage', 'Quant', 'paper1', 'easy', 30),
      q('DSA: Searching (Linear, Binary), Sorting algorithms', 'DSA', 'paper2', 'hard', 60),
      q('DSA: Time & Space Complexity (Big O)', 'DSA', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Complexity comparison chart', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 27, weekNumber: 4, phase: 'core', date: '2026-06-18',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('English: RC + Error Spotting Practice', 'English', 'paper1', 'normal', 40),
      q('Reasoning: Data Analysis Charts', 'Reasoning', 'paper1', 'hard', 40),
      q('DSA Revision: All data structures summary', 'DSA', 'paper2', 'normal', 60),
      q('SECTIONAL TEST: Full DSA (50 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('English (30 MCQs)', 'Practice', 'practice', 'hard', 30),
    ],
  },
  {
    dayNumber: 28, weekNumber: 4, phase: 'core', date: '2026-06-19',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'DSA + English Completion', scoreTarget: '70%',
    quests: [
      q('REVISION: Week 1-4 | DBMS + OS + CN + DSA', 'Practice', 'practice', 'normal', 60),
      q('English grammar rules revision', 'English', 'paper1', 'easy', 30),
      q('Error notebook deep review', 'Practice', 'practice', 'easy', 20),
      q('Half Mock: 60 P1 + 60 P2', 'Practice', 'practice', 'boss', 120),
      q('Time yourself strictly', 'Practice', 'practice', 'easy', 10),
    ],
  },

  // ==================== WEEK 5 (20 Jun - 26 Jun) ====================
  // Focus: Algorithms + GA Foundation | Score Target: 70%
  {
    dayNumber: 29, weekNumber: 5, phase: 'core', date: '2026-06-20',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Indian Geography (Physical + Economic)', 'GA', 'paper1', 'normal', 45),
      q('Reasoning: Revision - Coding-Decoding', 'Reasoning', 'paper1', 'easy', 30),
      q('Algo: Greedy Algorithms - Activity Selection, Fractional Knapsack', 'Algorithms', 'paper2', 'hard', 50),
      q('Algo: Huffman Coding', 'Algorithms', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Greedy vs DP comparison', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 30, weekNumber: 5, phase: 'core', date: '2026-06-21',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Indian Economy (Basics + Budget)', 'GA', 'paper1', 'normal', 45),
      q('English: Revision - Error Spotting', 'English', 'paper1', 'easy', 30),
      q('Algo: Dynamic Programming - 0/1 Knapsack, LCS, LIS', 'Algorithms', 'paper2', 'hard', 60),
      q('Algo: Matrix Chain, Coin Change', 'Algorithms', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('DP table filling practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 31, weekNumber: 5, phase: 'core', date: '2026-06-22',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Science - Inventions & Discoveries', 'GA', 'paper1', 'easy', 40),
      q('Quant: Revision - TSD + Time & Work', 'Quant', 'paper1', 'easy', 30),
      q('Algo: Divide & Conquer (Merge Sort, Quick Sort, Binary Search)', 'Algorithms', 'paper2', 'hard', 50),
      q('Algo: Backtracking (N-Queen, Subset Sum)', 'Algorithms', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Recurrence relations practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 32, weekNumber: 5, phase: 'core', date: '2026-06-23',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Awards, Sports, National/International Orgs', 'GA', 'paper1', 'easy', 40),
      q('Reasoning: Revision - Syllogism', 'Reasoning', 'paper1', 'easy', 30),
      q('Algo: Graph Algorithms - BFS, DFS, Dijkstra', 'Algorithms', 'paper2', 'hard', 50),
      q('Algo: Bellman-Ford, Kruskal, Prim (MST)', 'Algorithms', 'paper2', 'hard', 40),
      q('TOPIC TEST: Algo (30 MCQs) + GA (25 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 33, weekNumber: 5, phase: 'core', date: '2026-06-24',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Coal Sector India + SDGs + Climate Change', 'GA', 'paper1', 'normal', 45),
      q('Quant: Revision - P&L, Ratio', 'Quant', 'paper1', 'easy', 30),
      q('Algo: Complexity Analysis (P, NP, NP-Hard, NP-Complete)', 'Algorithms', 'paper2', 'hard', 50),
      q('Algo: Algorithm comparison', 'Algorithms', 'paper2', 'normal', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Coal India facts sheet', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 34, weekNumber: 5, phase: 'core', date: '2026-06-25',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('GA: Revision - All GA topics', 'GA', 'paper1', 'normal', 45),
      q('Quant: Mixed Practice', 'Quant', 'paper1', 'normal', 30),
      q('Paper 2 Mini Test: DBMS+OS+CN+DSA+Algo', 'Algorithms', 'paper2', 'boss', 60),
      q('SECTIONAL TEST: GA (40 MCQs) + Algo (40 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('Full P2 sectional', 'Practice', 'practice', 'boss', 60),
    ],
  },
  {
    dayNumber: 35, weekNumber: 5, phase: 'core', date: '2026-06-26',
    isTestDay: false, isMockDay: true, isRevisionDay: true,
    weekFocus: 'Algorithms + GA Foundation', scoreTarget: '70%',
    quests: [
      q('FULL MOCK TEST #1: Paper 1 (2 hrs)', 'Practice', 'practice', 'boss', 120),
      q('FULL MOCK TEST #1: Paper 2 (2 hrs)', 'Practice', 'practice', 'boss', 120),
      q('Strict time limit simulation', 'Practice', 'practice', 'normal', 10),
      q('Detailed analysis', 'Practice', 'practice', 'normal', 30),
    ],
  },

  // ==================== WEEK 6 (27 Jun - 3 Jul) ====================
  // PHASE 3: COMPLETION & ADVANCED | Focus: COA + SE + Web/IT + GA | Score Target: 75%
  {
    dayNumber: 36, weekNumber: 6, phase: 'completion', date: '2026-06-27',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('Quant: Revision - SI-CI + Mixture', 'Quant', 'paper1', 'easy', 40),
      q('Reasoning: Revision - Seating Arrangements', 'Reasoning', 'paper1', 'normal', 40),
      q('COA: Number Systems (Binary, Octal, Hex)', 'COA', 'paper2', 'normal', 40),
      q('COA: Boolean Algebra, Logic Gates', 'COA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Number conversion drills', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 37, weekNumber: 6, phase: 'completion', date: '2026-06-28',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('English: Revision - RC + Para Jumbles', 'English', 'paper1', 'normal', 40),
      q('GA: Current Affairs (Last 6 months)', 'GA', 'paper1', 'normal', 40),
      q('COA: CPU Organization (ALU, CU, Registers)', 'COA', 'paper2', 'normal', 50),
      q('COA: Memory Hierarchy, Cache (Direct, Associative)', 'COA', 'paper2', 'hard', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Cache hit/miss numericals', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 38, weekNumber: 6, phase: 'completion', date: '2026-06-29',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('Reasoning: Revision - Data Analysis', 'Reasoning', 'paper1', 'normal', 40),
      q('Quant: Revision - Probability + P&C', 'Quant', 'paper1', 'normal', 40),
      q('COA: Pipelining (Stages, Hazards, Stalls)', 'COA', 'paper2', 'hard', 50),
      q('COA: I/O Organization (Programmed, Interrupt, DMA)', 'COA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Pipeline throughput problems', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 39, weekNumber: 6, phase: 'completion', date: '2026-06-30',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('GA: Monuments, National Parks, Ports, Power Plants', 'GA', 'paper1', 'easy', 40),
      q('English: Revision - Sentence Correction', 'English', 'paper1', 'easy', 30),
      q('SE: SDLC Models (Waterfall, Spiral, V-Model, Agile)', 'SE', 'paper2', 'normal', 45),
      q('SE: Requirement Analysis, UML Diagrams', 'SE', 'paper2', 'normal', 40),
      q('TOPIC TEST: COA (30 MCQs) + SE (20 MCQs)', 'Practice', 'practice', 'boss', 45),
      q('Error notebook entry', 'Practice', 'practice', 'easy', 15),
    ],
  },
  {
    dayNumber: 40, weekNumber: 6, phase: 'completion', date: '2026-07-01',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('GA: Computer Awareness + Internet + Books & Authors', 'GA', 'paper1', 'easy', 40),
      q('Reasoning: Revision - Blood Relations + Directions', 'Reasoning', 'paper1', 'easy', 30),
      q('SE: Testing (Unit, Integration, System, Black/White Box)', 'SE', 'paper2', 'normal', 40),
      q('SE: Agile/Scrum, Project Management', 'SE', 'paper2', 'normal', 30),
      q('Web/IT: HTML, CSS, JS, Client-Server, APIs, REST', 'Web/IT', 'paper2', 'normal', 40),
      q('Web/IT: Cloud, Cybersecurity, Linux Commands', 'Web/IT', 'paper2', 'normal', 30),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
    ],
  },
  {
    dayNumber: 41, weekNumber: 6, phase: 'completion', date: '2026-07-02',
    isTestDay: true, isMockDay: false, isRevisionDay: false,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('Quant: Full revision + Reasoning: Full revision', 'Quant', 'paper1', 'normal', 60),
      q('GA: Facts revision', 'GA', 'paper1', 'easy', 30),
      q('Full Paper 2 Revision: All 8 subjects quick notes', 'Practice', 'paper2', 'normal', 60),
      q('SECTIONAL TEST: Full Paper 1 (100 MCQs)', 'Practice', 'practice', 'boss', 60),
      q('SECTIONAL TEST: Full Paper 2 (100 MCQs)', 'Practice', 'practice', 'boss', 60),
    ],
  },
  {
    dayNumber: 42, weekNumber: 6, phase: 'completion', date: '2026-07-03',
    isTestDay: false, isMockDay: true, isRevisionDay: true,
    weekFocus: 'COA + SE + Web/IT + GA Completion', scoreTarget: '75%',
    quests: [
      q('FULL MOCK TEST #2: Paper 1 (2 hrs)', 'Practice', 'practice', 'boss', 120),
      q('FULL MOCK TEST #2: Paper 2 (2 hrs)', 'Practice', 'practice', 'boss', 120),
      q('Detailed error analysis', 'Practice', 'practice', 'normal', 30),
      q('Score comparison with Mock #1', 'Practice', 'practice', 'easy', 15),
      q('Weak area identification', 'Practice', 'practice', 'normal', 20),
    ],
  },

  // ==================== WEEK 7 (4 Jul - 10 Jul) ====================
  // PHASE 4: MOCK TEST INTENSIVE | Focus: Weak Areas + Mock Tests | Target: 75%+
  {
    dayNumber: 43, weekNumber: 7, phase: 'mock', date: '2026-07-04',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('Quant: Weak area revision (from Mock #2)', 'Quant', 'paper1', 'normal', 40),
      q('Reasoning: Seating + Data Analysis (high weightage)', 'Reasoning', 'paper1', 'hard', 40),
      q('Revision: DBMS (SQL, Normalization, Transactions)', 'DBMS', 'paper2', 'normal', 50),
      q('Revision: OS (Scheduling, Deadlock)', 'OS', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Focus on weak topics only', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 44, weekNumber: 7, phase: 'mock', date: '2026-07-05',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('FULL MOCK TEST #3: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Strict time simulation', 'Practice', 'practice', 'normal', 10),
      q('Error analysis + Update error notebook', 'Practice', 'practice', 'normal', 30),
    ],
  },
  {
    dayNumber: 45, weekNumber: 7, phase: 'mock', date: '2026-07-06',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('English: RC speed practice', 'English', 'paper1', 'normal', 40),
      q('GA: Current Affairs update', 'GA', 'paper1', 'easy', 30),
      q('Revision: CN (Subnetting, Protocols)', 'CN', 'paper2', 'normal', 40),
      q('Revision: DSA (Trees, Graphs, Sorting)', 'DSA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Speed improvement drill', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 46, weekNumber: 7, phase: 'mock', date: '2026-07-07',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('FULL MOCK TEST #4: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Full exam simulation', 'Practice', 'practice', 'normal', 10),
      q('Compare with Mock #3', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 47, weekNumber: 7, phase: 'mock', date: '2026-07-08',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('Quant: Formula rapid revision', 'Quant', 'paper1', 'easy', 30),
      q('Reasoning: Shortcut techniques', 'Reasoning', 'paper1', 'normal', 40),
      q('Revision: Algo (DP, Graph Algo)', 'Algorithms', 'paper2', 'normal', 40),
      q('Revision: COA (Cache, Pipelining)', 'COA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Time management practice', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 48, weekNumber: 7, phase: 'mock', date: '2026-07-09',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('FULL MOCK TEST #5: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Focus on time management', 'Practice', 'practice', 'normal', 10),
      q('Sectional cutoff check', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 49, weekNumber: 7, phase: 'mock', date: '2026-07-10',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'Weak Areas + Mock Tests', scoreTarget: '75%+',
    quests: [
      q('COMPLETE REVIEW: Error notebook deep review', 'Practice', 'practice', 'normal', 60),
      q('All 5 mock analyses review', 'Practice', 'practice', 'normal', 40),
      q('Weak topic re-study', 'Practice', 'practice', 'hard', 60),
      q('Strategy adjustment for final week', 'Practice', 'practice', 'normal', 20),
      q('Rank all topics by accuracy', 'Practice', 'practice', 'easy', 20),
    ],
  },

  // ==================== WEEK 8 (11 Jul - 17 Jul) ====================
  // Focus: Intensive Mocks + Rapid Revision | Target: 80%+
  {
    dayNumber: 50, weekNumber: 8, phase: 'mock', date: '2026-07-11',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('Quant: All formulas one-page revision', 'Quant', 'paper1', 'easy', 30),
      q('Reasoning: High-weightage topics rapid drill', 'Reasoning', 'paper1', 'normal', 40),
      q('Rapid Revision: DBMS (ER, SQL, Normalization)', 'DBMS', 'paper2', 'normal', 40),
      q('Rapid Revision: OS (Scheduling, Paging, Virtual Memory)', 'OS', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Speed round: 1 min/MCQ', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 51, weekNumber: 8, phase: 'mock', date: '2026-07-12',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('FULL MOCK TEST #6: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Attempt accuracy focus', 'Practice', 'practice', 'normal', 10),
      q('Detailed section-wise analysis', 'Practice', 'practice', 'normal', 30),
      q('Target: 80% accuracy', 'Practice', 'practice', 'easy', 10),
    ],
  },
  {
    dayNumber: 52, weekNumber: 8, phase: 'mock', date: '2026-07-13',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('English: Weak areas only', 'English', 'paper1', 'normal', 30),
      q('GA: Coal sector special revision', 'GA', 'paper1', 'normal', 40),
      q('Rapid Revision: CN (Layers, Subnetting, Protocols)', 'CN', 'paper2', 'normal', 40),
      q('Rapid Revision: DSA (Complexity, Sorting, Trees)', 'DSA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Only wrong answers revision', 'Practice', 'practice', 'normal', 20),
    ],
  },
  {
    dayNumber: 53, weekNumber: 8, phase: 'mock', date: '2026-07-14',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('FULL MOCK TEST #7: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Simulate real exam day routine', 'Practice', 'practice', 'normal', 10),
      q('Full post-test analysis', 'Practice', 'practice', 'normal', 30),
    ],
  },
  {
    dayNumber: 54, weekNumber: 8, phase: 'mock', date: '2026-07-15',
    isTestDay: false, isMockDay: false, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('GA: Current Affairs final update + Flagship schemes', 'GA', 'paper1', 'normal', 45),
      q('Quant: Speed tricks revision', 'Quant', 'paper1', 'easy', 30),
      q('Rapid Revision: Algo (Greedy, DP, Graph)', 'Algorithms', 'paper2', 'normal', 40),
      q('Rapid Revision: COA (Cache, Pipeline) + SE + Web/IT', 'COA', 'paper2', 'normal', 40),
      q('30 Paper 1 + 40 Paper 2 MCQs', 'Practice', 'practice', 'normal', 45),
      q('Quick facts sheet', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 55, weekNumber: 8, phase: 'mock', date: '2026-07-16',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('FULL MOCK TEST #8: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Time management perfection', 'Practice', 'practice', 'normal', 10),
      q('Target: 80%+ consistent', 'Practice', 'practice', 'easy', 10),
    ],
  },
  {
    dayNumber: 56, weekNumber: 8, phase: 'mock', date: '2026-07-17',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'Intensive Mocks + Rapid Revision', scoreTarget: '80%+',
    quests: [
      q('FULL REVISION: One-page summary of every subject', 'Practice', 'practice', 'normal', 60),
      q('Formula sheets final pass', 'Quant', 'paper1', 'easy', 30),
      q('Error notebook final review', 'Practice', 'practice', 'normal', 30),
      q('Prepare final 4-day revision material', 'Practice', 'practice', 'normal', 30),
    ],
  },

  // ==================== FINAL 4 DAYS (18 Jul - 21 Jul) ====================
  // Focus: Final Revision + Last Mocks | Target: Peak Performance
  {
    dayNumber: 57, weekNumber: 9, phase: 'mock', date: '2026-07-18',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Final Revision + Last Mocks', scoreTarget: '80%+',
    quests: [
      q('Quant: Formula sheet final read', 'Quant', 'paper1', 'easy', 30),
      q('Reasoning: 20 rapid-fire questions', 'Reasoning', 'paper1', 'normal', 30),
      q('Paper 2 One-Pager: DBMS + OS + CN key points', 'Practice', 'paper2', 'normal', 45),
      q('MOCK #9: Last full mock', 'Practice', 'practice', 'boss', 240),
      q('Light analysis only', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 58, weekNumber: 9, phase: 'mock', date: '2026-07-19',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'Final Revision + Last Mocks', scoreTarget: '80%+',
    quests: [
      q('GA: Final facts revision + Coal Sector', 'GA', 'paper1', 'easy', 40),
      q('English: Vocabulary list + Grammar rules', 'English', 'paper1', 'easy', 30),
      q('Paper 2 One-Pager: DSA + Algo + COA + SE + Web/IT', 'Practice', 'paper2', 'normal', 45),
      q('Light practice: 20 P1 + 20 P2', 'Practice', 'practice', 'easy', 30),
      q('Error notebook last read', 'Practice', 'practice', 'easy', 20),
    ],
  },
  {
    dayNumber: 59, weekNumber: 9, phase: 'mock', date: '2026-07-20',
    isTestDay: false, isMockDay: true, isRevisionDay: false,
    weekFocus: 'Final Revision + Last Mocks', scoreTarget: '80%+',
    quests: [
      q('FINAL MOCK TEST #10: Paper 1 + Paper 2', 'Practice', 'practice', 'boss', 240),
      q('Quick analysis - note silly mistakes only', 'Practice', 'practice', 'normal', 20),
      q('No deep study after this', 'Practice', 'practice', 'easy', 5),
      q('Confidence check', 'Practice', 'practice', 'easy', 10),
    ],
  },
  {
    dayNumber: 60, weekNumber: 9, phase: 'mock', date: '2026-07-21',
    isTestDay: false, isMockDay: false, isRevisionDay: true,
    weekFocus: 'EXAM DAY', scoreTarget: '80%+',
    quests: [
      q('Light revision only - glance formula sheets', 'Practice', 'practice', 'easy', 30),
      q('Read one-pagers', 'Practice', 'practice', 'easy', 20),
      q('Coal India facts quick read', 'GA', 'paper1', 'easy', 15),
      q('Prepare exam kit', 'Practice', 'practice', 'easy', 10),
      q('Relax & sleep early', 'Practice', 'practice', 'easy', 5),
    ],
  },
];
