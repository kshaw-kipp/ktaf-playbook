"use client";

import { useState } from "react";

const C = {
  indigo: "#001e62",
  indigoMid: "#1a3a80",
  indigoLight: "#edf0f8",
  red: "#ee3c37",
  redLight: "#fdf0ef",
  orange: "#faa21b",
  orangeLight: "#fef8ec",
  blue: "#66ccee",
  blueLight: "#eaf8fd",
  green: "#c3d72e",
  greenLight: "#f5f9e0",
  gray50: "#f8f9fb",
  gray100: "#f1f3f6",
  gray200: "#e4e8ef",
  gray400: "#9aa5b4",
  gray600: "#5a6475",
  gray800: "#2d3748",
};

function KTAFLogo({ variant = "dark", width = 220 }: { variant?: "dark" | "light"; width?: number }) {
  const kippColor = variant === "dark" ? "#ffffff" : C.indigo;
  return (
    <svg viewBox="0 0 280 42" xmlns="http://www.w3.org/2000/svg" width={width} aria-label="KIPP Team and Family" style={{ display: "block" }}>
      <text x="2" y="35" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="34" fill={kippColor} letterSpacing="-1">KIPP</text>
      <circle cx="92" cy="27" r="4" fill={kippColor} />
      <circle cx="92" cy="13" r="4" fill={kippColor} />
      <text x="103" y="35" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="34" fill={C.red} letterSpacing="-1">TEAM</text>
      <text x="191" y="36" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontSize="35" fill={C.red}>&amp;</text>
      <text x="211" y="35" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="34" fill={C.red} letterSpacing="-1.5">FAMILY</text>
    </svg>
  );
}

function Collapsible({ title, badge, badgeColor = C.indigo, children, defaultOpen = false }: {
  title: string; badge: string; badgeColor?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "white", borderRadius: 10, border: `1px solid ${C.gray200}`, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,30,98,0.07)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "15px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
        <span style={{ background: badgeColor, color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, flexShrink: 0 }}>{badge}</span>
        <span style={{ fontSize: 15, fontWeight: 700, flex: 1, color: C.gray800 }}>{title}</span>
        <span style={{ fontSize: 10, color: C.gray400, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
      </button>
      {open && <div style={{ borderTop: `1px solid ${C.gray100}`, padding: "4px 20px 18px" }}>{children}</div>}
    </div>
  );
}

function PromptCard({ title, children }: { title: string; children: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: "white", borderRadius: 10, border: `1px solid ${C.gray200}`, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,30,98,0.07)", marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.gray800 }}>{title}</span>
        <span style={{ fontSize: 10, color: C.gray400, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${C.gray100}` }}>
          <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 12.5, lineHeight: 1.75, background: "#f7f8fa", padding: "18px 20px", color: "#2d3748", whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>{children}</pre>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 18px 12px", background: "#f7f8fa", borderTop: `1px solid ${C.gray200}` }}>
            <button onClick={() => { navigator.clipboard.writeText(children).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
              style={{ background: copied ? "#4a7c00" : C.indigo, color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, padding: "7px 16px", cursor: "pointer", fontFamily: "inherit" }}>
              {copied ? "✓ Copied!" : "Copy prompt"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const weekContent = {
  mon: { day: "Monday", icon: "🎯", title: "The Challenge", body: "A specific thing to try with Claude before Friday. Low bar to entry — meant for everyone, not just the tech-savvy. Should take 10–15 minutes and produce something they'd actually use.", note: "Opens the week with a clear, bounded task anyone can attempt regardless of Claude experience level." },
  wed: { day: "Wednesday", icon: "💡", title: "The Spotlight", body: "A real prompt + output + reflection from someone in the community (or curated by Kevin). Shows what good looks like without being prescriptive.", note: "Kevin can write these based on things people share, or invite contributors directly." },
  fri: { day: "Friday", icon: "🪞", title: "Reflection + Weekly Digest", body: null, note: null },
};

function WeekTabs() {
  const [active, setActive] = useState<"mon" | "wed" | "fri">("mon");
  const w = weekContent[active];
  return (
    <div>
      <div style={{ display: "flex", borderRadius: "10px 10px 0 0", overflow: "hidden", border: `1px solid ${C.gray200}`, borderBottom: "none" }}>
        {(["mon","wed","fri"] as const).map(k => (
          <button key={k} onClick={() => setActive(k)} style={{ flex: 1, padding: "13px 10px", textAlign: "center", fontSize: 13, fontWeight: 700, background: active === k ? C.indigo : C.gray100, color: active === k ? "white" : C.gray600, border: "none", borderRight: k !== "fri" ? `1px solid ${C.gray200}` : "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {weekContent[k].day}
          </button>
        ))}
      </div>
      <div style={{ border: `1px solid ${C.gray200}`, borderRadius: "0 0 10px 10px", background: "white", padding: "26px 28px" }}>
        <div style={{ display: "inline-block", background: C.orange, color: "white", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, marginBottom: 12 }}>{w.day}</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: C.indigo, margin: "0 0 12px" }}>{w.icon} {w.title}</h3>
        {active !== "fri" ? (
          <>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, margin: "0 0 10px" }}>{w.body}</p>
            <p style={{ fontSize: 13, color: C.gray600, margin: 0 }}>{w.note}</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, margin: "0 0 12px" }}><strong>The Reflection:</strong> One open question. Short. No right answer. The point is to get people to put something into words before the week closes.</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, margin: 0 }}><strong>The Digest:</strong> Kevin reviews a Claude-drafted digest and posts it. Target: 10 minutes of Kevin's time. The digest surfaces what's worth keeping from the week.</p>
          </>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ num, title, accent = false }: { num: string; title: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22, paddingBottom: 16, borderBottom: `2px solid ${C.gray200}` }}>
      <div style={{ background: accent ? C.red : C.indigo, color: "white", fontSize: 11, fontWeight: 700, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>{num}</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.indigo, lineHeight: 1.25, margin: 0 }}>{title}</h2>
    </div>
  );
}

function Callout({ color, title, children }: { color: "green"|"orange"|"blue"; title: string; children: React.ReactNode }) {
  const map = { green: { bg: "#f0faf3", border: "#a3d9b1", tc: "#2d7a45" }, orange: { bg: C.orangeLight, border: "#f5c06a", tc: "#9a5f00" }, blue: { bg: C.blueLight, border: "#99ddf2", tc: "#0080a0" } };
  const s = map[color];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderLeft: `4px solid ${s.border}`, borderRadius: "0 8px 8px 0", padding: "18px 22px", marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: s.tc, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

const stripe = `linear-gradient(90deg, #001e62, #ee3c37, #faa21b, #c3d72e, #66ccee)`;

export default function PlaybookPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Calibri, Verdana, 'Segoe UI', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ width: 272, background: C.indigo, color: "white", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", zIndex: 100, scrollbarWidth: "none" }}>
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <KTAFLogo variant="dark" width={190} />
        </div>
        <div style={{ padding: "12px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>Playbook</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Claude Adoption Community</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", marginTop: 2 }}>Community Manager Guide · 2025–26</div>
        </div>
        <ul style={{ listStyle: "none", padding: "10px 0", flex: 1, margin: 0 }}>
          {[
            { href: "#overview", label: "Overview" },
            { href: "#section1", label: "What This Community Is For", num: "1" },
            { href: "#section2", label: "Learning Philosophy", num: "2" },
            { href: "#section3", label: "Agentic System", num: "3" },
            { href: "#section4", label: "Weekly Rhythm", num: "4" },
            { href: "#section5", label: "Formats & Templates", num: "5" },
            { href: "#section6", label: "Six-Week Arc", num: "6" },
            { href: "#section7", label: "Kevin vs. Claude", num: "7" },
            { href: "#section8", label: "Connecting to 2030", num: "8" },
            { href: "#appendix", label: "Prompt Templates", num: "↓" },
          ].map(({ href, label, num }) => (
            <li key={href}>
              <a href={href} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px 9px 17px", color: "rgba(255,255,255,0.72)", textDecoration: "none", fontSize: 13, lineHeight: 1.4, borderLeft: "3px solid transparent" }}>
                {num && <span style={{ fontSize: 10, opacity: 0.4, minWidth: 18, flexShrink: 0 }}>{num}.</span>}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.10)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>KTAF · Claude Adoption · 2025–26</div>
      </nav>

      {/* MAIN */}
      <main style={{ marginLeft: 272, flex: 1, maxWidth: 900, padding: "44px 52px 80px" }}>

        {/* HERO */}
        <div id="overview" style={{ background: C.indigo, borderRadius: 14, padding: "40px 44px 0", marginBottom: 44, overflow: "hidden" }}>
          <div style={{ marginBottom: 20 }}><KTAFLogo variant="dark" width={260} /></div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 6px" }}>
            Claude Adoption Community<br /><span style={{ color: C.orange }}>Manager Playbook</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", margin: "0 0 28px" }}>How this channel learns, grows, and keeps moving</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[{ label: "Audience", text: "Early adopters, school leaders, APs, central office, and teaching & learning leaders across Newark, Camden, Miami, and Paterson." }, { label: "Mission", text: "Build real Claude capability across KTAF — not just awareness. Every member tries, fails, learns, and shares." }].map(({ label, text }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "16px 18px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.orange, marginBottom: 6 }}>{label}</div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.85)", margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ height: 5, background: stripe, marginTop: 28 }} />
        </div>

        {/* S1 */}
        <section id="section1" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="1" title="What This Community Is For" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 14 }}>The Claude Adoption Slack community is the primary space where KTAF staff build real, working knowledge of Claude. Not familiarity — capability. The difference matters.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 14 }}>Familiarity is watching a demo. Capability is knowing which prompt to write when you have 20 minutes before a parent meeting and need to draft a difficult email.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 20 }}>This channel creates conditions for the second kind of learning: regular practice with real stakes, peer accountability, visible examples from actual KTAF work, and enough safety to share what didn't work.</p>
          <Callout color="green" title="✓ What success looks like at 90 days">
            <ul style={{ margin: "0 0 0 18px" }}>
              {["Members are using Claude in their regular workflow — not just experimenting", "The channel has at least 2–3 reliable contributors who post unprompted", "People share failures and revisions, not just polished wins", "Use cases are tied to real KTAF work: lesson planning, observations, ops, family comms", "Leaders at multiple levels are comfortable asking \"what would you prompt Claude to do here?\""].map((item, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 1.65, color: C.gray800, marginBottom: 5 }}>{item}</li>
              ))}
            </ul>
          </Callout>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S2 */}
        <section id="section2" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="2" title="Learning Philosophy: Joyful Struggle" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 14 }}>Adult learners don't build skill by watching — they build it by doing, getting stuck, noticing why, and trying again. That cycle of productive failure is what we mean by <strong>joyful struggle</strong>.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 22 }}>The community is designed to make that cycle visible and socially rewarded. A post that says "here\u2019s what I tried and why it flopped" is as valuable as a polished use case — arguably more, because it shows others what to watch for.</p>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.gray800, margin: "0 0 14px" }}>Operating principles</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["🧪", "Show the mess.", "The revised prompt is useful. The failed first draft is a lesson."],
              ["🎯", "Role-specific is more useful than abstract.", "A teacher needs a prompt for differentiated exit tickets, not a generic \u201cClaude can help with writing\u201d claim."],
              ["🔄", "Low stakes, high frequency.", "Short challenges weekly beat monthly deep dives."],
              ["🤝", "Community > expert.", "The goal is distributed capability, not dependency on a few power users."],
              ["📌", "Connect to the work.", "Every theme ties back to something KTAF staff actually do every day."],
            ].map(([icon, bold, rest], i) => (
              <div key={i} style={{ display: "flex", gap: 14, background: "white", border: `1px solid ${C.gray200}`, borderRadius: 8, padding: "14px 18px", alignItems: "flex-start", boxShadow: "0 1px 4px rgba(0,30,98,0.06)" }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 14, lineHeight: 1.65 }}><strong style={{ color: C.indigo }}>{bold}</strong> {rest}</span>
              </div>
            ))}
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S3 */}
        <section id="section3" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="3" title="How the Agentic System Works" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 20 }}>This community runs on four interconnected layers. Together they handle the routine work of a full-time community manager — freeing Kevin to focus on relationships, judgment calls, and community health.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Collapsible badge="Layer 1" title="Content Engine" defaultOpen>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray800, marginTop: 12 }}>Proactive posts — challenges, spotlights, and reflection prompts — run on a fixed weekly schedule. Drafted by Claude, reviewed briefly by Kevin, posted automatically once Slack is connected.</p>
            </Collapsible>
            <Collapsible badge="Layer 2" badgeColor={C.red} title="Response Layer">
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray800, marginTop: 12 }}>Monitors the channel for unanswered questions, struggles, and potential spotlight candidates. Surfaces relevant resources or examples, flags anything needing Kevin's direct response.</p>
              <div style={{ display: "inline-flex", gap: 5, background: C.redLight, color: C.red, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginTop: 10 }}>⚡ Requires Slack connector</div>
            </Collapsible>
            <Collapsible badge="Layer 3" title="Curation Engine">
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray800, marginTop: 12 }}>Every Friday, synthesizes the week's best posts into a digest: 3 highlights, 1 lesson learned, 1 preview of next week. Kevin reviews the draft (10 min), then it posts.</p>
            </Collapsible>
            <Collapsible badge="Layer 4" badgeColor={C.red} title="Engagement Tracker">
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray800, marginTop: 12 }}>Weekly report to Kevin: post count, unique contributors, thread depth, trending content, who hasn't posted in 3+ weeks (potential nudge candidates). Monthly trend rollup.</p>
              <div style={{ display: "inline-flex", gap: 5, background: C.redLight, color: C.red, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginTop: 10 }}>⚡ Requires Slack connector</div>
            </Collapsible>
          </div>
          <div style={{ marginTop: 20 }}>
            <Callout color="orange" title="🔓 Unlocking the full system: Slack connector">
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.gray800, margin: 0 }}>Layers 2 and 4 require connecting your Slack workspace in Claude's settings. Once connected, Claude can read channel messages, identify unanswered questions, surface resources in-thread, and pull engagement data for the weekly report. Without it, Kevin runs Layers 1 and 3 (content + digest) with scheduled tasks.</p>
            </Callout>
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S4 */}
        <section id="section4" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="4" title="Weekly Rhythm" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 22 }}>The channel follows a predictable three-beat week. Predictability is intentional — members know what to expect and when to show up.</p>
          <WeekTabs />
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S5 */}
        <section id="section5" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="5" title="Recurring Formats & Templates" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 20 }}>Each format has a consistent structure so members know what to expect and contributors know what to submit.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { badge: "Monday", title: "Template: The Challenge", content: `Header: This week's challenge: [one-line description]\nContext: [Why this matters / how it connects to real work]\nThe ask: [Specific task + suggested prompt structure to try]\nShare back: Reply here with: your prompt | the output | one thing you'd change\nBonus: [Optional stretch — for those who want to go deeper]` },
              { badge: "Wednesday", title: "Template: The Spotlight", content: `Who: [Role — no name required unless they want credit]\nThe problem: [What they were trying to do, in their own words]\nThe prompt they used: [Exact text, in a code block or clearly set off]\nWhat came out: [Key excerpt or summary of the output]\nWhat they'd do differently: [One honest reflection — this is the learning]` },
              { badge: "Friday", title: "Template: The Reflection", content: `End-of-week check-in: [One sentence question]\n\nExamples:\n• What's one thing you tried with Claude this week that surprised you?\n• What's a prompt you're still trying to get right?\n• What use case are you most skeptical Claude could actually help with?` },
              { badge: "Friday", title: "Template: Weekly Digest", content: `Week [X] in the books.\n\nThree things worth holding onto:\n• [Highlight 1 — link to original post or quote]\n• [Highlight 2]\n• [Highlight 3]\n\nLesson of the week: [One insight from the week's activity]\n\nNext week: [Preview of Monday's challenge]` },
            ].map(({ badge, title, content }) => (
              <Collapsible key={title} badge={badge} title={title}>
                <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 12.5, lineHeight: 1.75, background: "#f7f8fa", padding: "16px 18px", borderRadius: 6, color: C.gray800, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: "12px 0 0" }}>{content}</pre>
              </Collapsible>
            ))}
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S6 */}
        <section id="section6" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="6" title="Six-Week Content Arc" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 22 }}>The first six weeks follow a progression designed to move members from awareness to active practice. Each week builds on the last.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Week 1", "Inventory", "Surface what people are already doing. Lower the activation energy for sharing. Establish the norms: show the prompt, share the output, be honest about what didn't work."],
              ["Week 2", "Show the Prompt", "Get real prompts from real work into the channel. Build a library of KTAF-specific examples that others can adapt."],
              ["Week 3", "When It Goes Wrong", "Normalize failure. Dig into bad outputs — what caused them? What makes a prompt weak? Community troubleshoots together."],
              ["Week 4", "Role Spotlights", "Dedicated content for teachers, school leaders, and central office. Make it concrete: the exact tasks each role can use Claude for."],
              ["Week 5", "Going Deeper", "Multi-step prompting, prompt chains, workflow integration. For members who are ready to go beyond single-turn interactions."],
              ["Week 6", "Community Wisdom", "Synthesize what the group has learned. Invite members to teach each other. Gather input on Month 2 themes."],
            ].map(([week, theme, goal]) => (
              <div key={week} style={{ display: "flex", gap: 16, background: "white", borderRadius: 8, border: `1px solid ${C.gray200}`, boxShadow: "0 1px 6px rgba(0,30,98,0.07)", padding: "16px 20px", alignItems: "flex-start" }}>
                <div style={{ background: C.indigo, color: "white", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>{week}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.indigo, marginBottom: 4 }}>{theme}</div>
                  <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6 }}>{goal}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S7 */}
        <section id="section7" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="7" title="What Kevin Does vs. What Claude Handles" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 22 }}>The goal is to make Kevin's community management load sustainable — roughly <strong>30 minutes per day</strong> once the system is running. That time should go toward things that require human judgment, relationships, and network context.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,30,98,0.12)", border: `1px solid ${C.gray200}` }}>
            <div>
              <div style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, background: C.gray100, color: C.gray800, borderRight: `1px solid ${C.gray200}` }}>👤 Kevin's Role</div>
              {["Sets monthly themes and content arcs", "Reviews and posts the weekly digest (10 min)", "Responds to high-stakes or sensitive questions", "Makes judgment calls on community health", "Builds relationships with key contributors", "Invites members to contribute spotlights", "Adjusts themes based on what's resonating"].map((item, i, arr) => (
                <div key={i} style={{ padding: "10px 20px", fontSize: 13, lineHeight: 1.55, borderBottom: i < arr.length - 1 ? `1px solid ${C.gray100}` : "none", borderRight: `1px solid ${C.gray200}`, color: C.gray800 }}>{item}</div>
              ))}
            </div>
            <div style={{ background: C.indigoLight }}>
              <div style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, background: C.indigo, color: "white" }}>🤖 Claude Handles</div>
              {["Drafts all scheduled posts (Challenge, Spotlight, Reflection)", "Generates the weekly digest draft", "Monitors for unanswered questions and surfaces resources", "Flags posts that need Kevin's direct response", "Identifies potential spotlight candidates from channel activity", "Tracks engagement metrics and generates weekly report", "Surfaces who hasn't engaged in 3+ weeks (nudge candidates)"].map((item, i, arr) => (
                <div key={i} style={{ padding: "10px 20px", fontSize: 13, lineHeight: 1.55, borderBottom: i < arr.length - 1 ? `1px solid rgba(0,30,98,0.08)` : "none", color: C.gray800 }}>{item}</div>
              ))}
            </div>
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* S8 */}
        <section id="section8" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="8" title="Connecting to KTAF's 2030 Work" />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 22 }}>
            This community isn't a side project. It connects directly to three of KTAF's four 2030 strategic priorities — and it supports our Anthropic partnership obligations alongside.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { color: C.indigo, tag: "2030 Priority", title: "Simplify how we work", body: "Staff who can use Claude effectively eliminate low-value work — drafting, formatting, synthesizing. Time recovered goes back to students and relationships." },
              { color: C.red, tag: "2030 Priority", title: "Advance teaching & learning in the age of AI", body: "Teacher use cases developed here feed the K–12 tech skills framework and classroom AI pilots. This community is the R&D layer for KTAF's instructional AI strategy." },
              { color: C.orange, tag: "2030 Priority", title: "Build a culture of excellence with staff", body: "A community where people share real work, learn from each other, and celebrate the struggle is a cultural asset — not just a tool adoption program." },
              { color: C.blue, tag: "External", title: "Anthropic MOU obligations", body: "Active community engagement and usage data support the external research partnerships evaluating Claude's impact on teacher productivity and well-being." },
            ].map(({ color, tag, title, body }) => (
              <div key={title} style={{ background: "white", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,30,98,0.07)", border: `1px solid ${C.gray200}`, padding: 20, borderTop: `3px solid ${color}` }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.gray400, marginBottom: 8 }}>{tag}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px", color: C.indigo }}>{title}</h3>
                <p style={{ fontSize: 13, margin: 0, color: C.gray600, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>
        <hr style={{ border: "none", borderTop: `1px solid ${C.gray200}`, margin: "0 0 44px" }} />

        {/* APPENDIX */}
        <section id="appendix" style={{ marginBottom: 52, scrollMarginTop: 28 }}>
          <SectionHeader num="↓" title="Appendix: Starter Prompt Templates by Role" accent />
          <p style={{ fontSize: 15, lineHeight: 1.75, color: C.gray800, marginBottom: 28 }}>These are starting points — meant to be adapted, broken, and improved by the community. Each one is a seed for a Week 1 or Week 2 challenge.</p>

          {/* Teachers */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.indigo, color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: 20, marginBottom: 14 }}>🏫 For Teachers</div>
            <div style={{ background: "white", borderRadius: 10, border: `1px solid ${C.gray200}`, padding: "20px 22px", boxShadow: "0 1px 6px rgba(0,30,98,0.07)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ background: C.orangeLight, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#9a5f00", flexShrink: 0, marginTop: 2 }}>TBD</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.gray800, margin: 0 }}>Prompt templates for teachers are in development. The initial focus will be supporting the <strong>co-teaching model between teachers and learning specialists</strong> — prompts that help both roles collaborate more effectively with Claude on shared student work.</p>
              </div>
            </div>
          </div>

          {/* School Leaders */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.indigo, color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: 20, marginBottom: 14 }}>🏢 For School Leaders</div>
            <PromptCard title="Observation write-up">{`I observed a [subject/grade] classroom. Here are my notes: [paste raw notes]. Draft a professional observation summary for the teacher. Lead with a specific strength, then one area of focus with a concrete suggestion. Tone: coaching, not evaluative. Length: 200–250 words.`}</PromptCard>
            <PromptCard title="Meeting prep">{`I have a [type of meeting] with [person/team] on [topic]. My goal for the meeting is: [goal]. Background: [context]. Draft three opening questions that would help me understand their perspective before sharing mine. Then suggest one thing I should listen for.`}</PromptCard>
          </div>

          {/* Central Office */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.indigo, color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: 20, marginBottom: 14 }}>🏛️ For Central Office</div>
            <PromptCard title="Synthesize a document">{`Here is a [report / research summary / draft memo]: [paste text]. Summarize the three most important points for a school leader who has 5 minutes to read this. Then flag one thing they might push back on and suggest how to address it.`}</PromptCard>
            <PromptCard title="Draft a stakeholder update">{`Draft a brief update on [project/initiative] for [audience: board / Cabinet / school leaders]. Status: [on track / at risk / complete]. Key accomplishment this period: [X]. Decision needed (if any): [Y]. Tone: direct and confident. Length: 3 short paragraphs.`}</PromptCard>
          </div>
        </section>

        <div style={{ height: 4, background: stripe, borderRadius: 2, marginBottom: 28 }} />
        <footer style={{ background: C.indigo, color: "rgba(255,255,255,0.6)", padding: "20px 28px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
          <span>KIPP Team &amp; Family Schools · Claude Adoption Community · 2025–26</span>
          <span>Questions? <a href="mailto:kshaw@apps.teamschools.org" style={{ color: C.orange, textDecoration: "none" }}>Kevin Shaw</a></span>
        </footer>
      </main>
    </div>
  );
}
