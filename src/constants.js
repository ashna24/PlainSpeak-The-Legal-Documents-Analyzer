export const SYSTEM_PROMPT = `You are a legal document analyst. The user will paste contract text.

Return ONLY valid JSON, no preamble, no markdown fences. Use this exact shape:

{
  "risk_score": <integer 0-100>,
  "clauses": [
    {
      "id": <integer>,
      "original": "<exact substring from the contract — must match character-for-character>",
      "risk": "<low|medium|high>",
      "plain_en": "<plain English explanation, 1-2 sentences max>",
      "plain_ur": "<same explanation in Urdu, Arabic script>",
      "flag": "<short label for the risk, or null if low risk>"
    }
  ],
  "lawyer_questions": [
    {
      "en": "<specific question tailored to clauses in this contract in English>",
      "ur": "<same question translated to proper Urdu, Arabic script>"
    }
  ]
}

Rules:
- Split the contract into 4-8 logical clauses (sentences or meaningful paragraphs)
- When returning the "original" field in the JSON, you MUST copy and paste the clause from the user's input EXACTLY character-for-character. Do not remove newlines, do not fix grammar, and do not summarize. If the string does not perfectly match the input, the frontend UI will break.
- risk_score: 0 = fully standard, 100 = extremely dangerous/unusual
- Generate exactly 3-5 lawyer_questions specific to what you found
- plain_ur must be proper Urdu in Arabic script, right-to-left
- Never give legal advice — only plain-language explanation of what the clause means`;

export const SAMPLE_CONTRACT = `This Tenancy Agreement is entered into on the 1st day of March 2025 between the Landlord and the Tenant.

The Tenant shall pay rent of PKR 45,000 per month, due on the 1st of each month. A late payment fee of 15% per day shall apply to any overdue amounts without prior notice.

The Landlord reserves the right to terminate this agreement at any time with 24 hours notice for any reason deemed appropriate by the Landlord, without liability or compensation to the Tenant.

The Tenant waives all rights to legal recourse against the Landlord for any damages, losses, or injuries occurring on the premises, whether caused by negligence or otherwise.

The Tenant shall not sublet, assign, or transfer any interest in the property without written consent. Any improvements made to the property shall become the permanent property of the Landlord without compensation.

Either party may terminate this agreement with 30 days written notice. Upon termination, the security deposit of PKR 90,000 shall be refunded within 90 days subject to deductions for any damages as solely assessed by the Landlord.`;

export const riskConfig = {
  low:    { bg: "#d1fae5", text: "#065f46", border: "#34d399", label: "Low risk",    dot: "#10b981" },
  medium: { bg: "#fef3c7", text: "#78350f", border: "#fbbf24", label: "Medium risk", dot: "#f59e0b" },
  high:   { bg: "#fee2e2", text: "#7f1d1d", border: "#f87171", label: "High risk",   dot: "#ef4444" },
};
