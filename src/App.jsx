import { useState, useRef, useEffect } from "react";
import RiskMeter from "./components/RiskMeter";
import HighlightedText from "./components/HighlightedText";
import ClauseCard from "./components/ClauseCard";
import { SYSTEM_PROMPT, SAMPLE_CONTRACT, riskConfig } from "./constants";

export default function App() {
  const [input, setInput] = useState(SAMPLE_CONTRACT);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState("input"); // input | result
  const cardRefs = useRef({});
  const rightPanelRef = useRef(null);

  useEffect(() => {
    if (activeId && cardRefs.current[activeId] && rightPanelRef.current) {
      cardRefs.current[activeId].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  async function analyse() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [{
            parts: [{ text: input }]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
      }
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setStep("result");
    } catch (e) {
      setError(`Analysis failed: ${e.message}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020817", color: "#f8fafc" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #0f172a", padding: "18px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="url(#lightningGradient)">
            <defs>
              <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: ".04em" }}>PLAIN<span style={{ color: "#94a3b8" }}>SPEAK</span></div>
          <div style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em" }}>LEGAL CONTRACT ANALYSER</div>
        </div>
        {step === "result" && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn ${lang === "ur" ? "active" : ""}`} onClick={() => setLang("ur")}>اردو</button>
            <button className="back-btn" style={{ marginLeft: 8 }} onClick={() => { setStep("input"); setResult(null); }}>← New contract</button>
          </div>
        )}
      </div>

      {/* Input step */}
      {step === "input" && (
        <div className="fade-up" style={{ maxWidth: 760, margin: "0 auto", padding: "60px 32px" }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginBottom: 12, color: "#f8fafc" }}>
              Understand any<br /><span style={{ fontStyle: "italic", color: "#94a3b8" }}>contract</span> in seconds.
            </h1>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7 }}>
              Paste your lease, employment agreement, or any legal document below.<br />
              We'll highlight risks and explain every clause in plain language.
            </p>
          </div>

          <div style={{ border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden", background: "#0a0f1a" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #0f172a", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em" }}>CONTRACT TEXT</span>
              <button
                onClick={() => setInput(SAMPLE_CONTRACT)}
                style={{ marginLeft: "auto", fontSize: 10, color: "#94a3b8", background: "transparent", border: "1px solid #1e293b", borderRadius: 4, padding: "3px 10px", cursor: "pointer", fontFamily: "inherit" }}
              >
                Load sample
              </button>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste your contract text here…"
              rows={16}
              style={{
                width: "100%", padding: "20px", background: "transparent", border: "none",
                color: "#cbd5e1", fontSize: 15, lineHeight: 1.8,
              }}
            />
          </div>

          {error && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 8, fontSize: 12, color: "#f87171" }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
            <button className="analyse-btn" onClick={analyse} disabled={loading || !input.trim()}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-flex", gap: 3 }}>
                    {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#020817", animation: "pulse-dot 1s ease infinite", animationDelay: `${i*0.2}s` }} />)}
                  </span>
                  Analysing…
                </span>
              ) : "Analyse contract →"}
            </button>
            <span style={{ fontSize: 11, color: "#64748b" }}>Powered by Gemini · Results in ~2s</span>
          </div>
        </div>
      )}

      {/* Result step */}
      {step === "result" && result && (
        <div className="fade-up">
          {/* Risk score bar */}
          <div style={{ padding: "20px 32px", borderBottom: "1px solid #0f172a", background: "#040c18" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em", marginBottom: 10 }}>OVERALL RISK SCORE</div>
              <RiskMeter score={result.risk_score} />
            </div>
          </div>

          {/* Side-by-side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100vh - 180px)", maxWidth: 1400, margin: "0 auto" }}>

            {/* Left: original */}
            <div style={{ borderRight: "1px solid #0f172a", overflow: "auto", padding: "28px 32px" }}>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em", marginBottom: 16 }}>ORIGINAL TEXT</div>
              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {Object.entries(riskConfig).map(([key, cfg]) => (
                  <span key={key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#94a3b8" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: cfg.bg, border: `1px solid ${cfg.border}`, display: "inline-block" }} />
                    {cfg.label}
                  </span>
                ))}
              </div>
              <HighlightedText
                text={input}
                clauses={result.clauses}
                activeId={activeId}
                onHover={setActiveId}
              />
            </div>

            {/* Right: explanations */}
            <div ref={rightPanelRef} style={{ overflow: "auto", padding: "28px 32px" }}>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em", marginBottom: 16, textAlign: lang === "ur" ? "right" : "left" }}>
                {lang === "ur" ? "آسان وضاحت" : "PLAIN LANGUAGE EXPLANATION"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.clauses.map(clause => (
                  <ClauseCard
                    key={clause.id}
                    clause={clause}
                    isActive={activeId === clause.id}
                    lang={lang}
                    onHover={setActiveId}
                    cardRef={el => cardRefs.current[clause.id] = el}
                  />
                ))}
              </div>

              {/* Lawyer questions */}
              {result.lawyer_questions?.length > 0 && (
                <div style={{ marginTop: 28 }}>
                  <div style={{ fontSize: 10, color: "#64748b", letterSpacing: ".06em", marginBottom: 14, textAlign: lang === "ur" ? "right" : "left" }}>
                    {lang === "ur" ? "وکیل سے پوچھیں" : "QUESTIONS TO ASK YOUR LAWYER"}
                  </div>
                  <div style={{ border: "1px solid #1e293b", borderRadius: 10, overflow: "hidden" }}>
                    {result.lawyer_questions.map((q, i) => (
                      <div key={i} style={{
                        padding: "12px 16px",
                        borderBottom: i < result.lawyer_questions.length - 1 ? "1px solid #0f172a" : "none",
                        display: "flex", gap: 12, alignItems: "flex-start", flexDirection: lang === "ur" ? "row-reverse" : "row"
                      }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#64748b", marginTop: 2, flexShrink: 0 }}>{String(i+1).padStart(2,"0")}</span>
                        <p style={{
                          margin: 0, fontSize: 15, color: "#cbd5e1", lineHeight: 1.6,
                          ...(lang === "ur" ? { fontFamily: "'Noto Nastaliq Urdu', serif", direction: "rtl", textAlign: "right", fontSize: 18, lineHeight: 2 } : {})
                        }}>{typeof q === "string" ? q : (lang === "ur" ? q.ur : q.en)}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: 12, fontSize: 10, color: "#64748b", lineHeight: 1.6, textAlign: lang === "ur" ? "right" : "left" }}>
                    ⚠ This tool provides plain-language explanations only and does not constitute legal advice.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
