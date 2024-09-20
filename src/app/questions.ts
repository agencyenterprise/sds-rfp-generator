export interface Question {
  id: string;
  label: string;
  type: "textarea" | "select" | "radio";
  options?: Array<{ value: string; label: string }>;
}

export const questions: Question[] = [
  {
    id: "projectOverview",
    label: "What is your project overview?",
    type: "textarea",
  },
  {
    id: "companyBackground",
    label: "Tell us about your company background",
    type: "textarea",
  },
  {
    id: "projectScope",
    label: "What is the project scope?",
    type: "select",
    options: [
      { value: "shortTerm", label: "Short-term (1-3 months)" },
      { value: "mediumTerm", label: "Medium-term (3-6 months)" },
      { value: "longTerm", label: "Long-term (6+ months)" },
      { value: "custom", label: "Custom timeline" },
    ],
  },
  {
    id: "budget",
    label: "What is your estimated budget?",
    type: "select",
    options: [
      { value: "below50k", label: "Below $50,000" },
      { value: "50k-100k", label: "$50,000 - $100,000" },
      { value: "100k-500k", label: "$100,000 - $500,000" },
      { value: "above500k", label: "Above $500,000" },
    ],
  },
  {
    id: "techRequirements",
    label: "What are your technical requirements?",
    type: "select",
    options: [
      { value: "webDevelopment", label: "Web Development" },
      { value: "mobileAppDevelopment", label: "Mobile App Development" },
      { value: "cloudServices", label: "Cloud Services" },
      { value: "dataAnalysis", label: "Data Analysis" },
      { value: "securityCompliance", label: "Security & Compliance" },
      { value: "aiMl", label: "AI/ML" },
    ],
  },
  {
    id: "functionalRequirements",
    label: "What are your functional requirements?",
    type: "textarea",
  },
  {
    id: "timeline",
    label: "What is your project timeline?",
    type: "select",
    options: [
      { value: "urgent", label: "Urgent (within 1 month)" },
      { value: "1-3months", label: "1-3 months" },
      { value: "3-6months", label: "3-6 months" },
      { value: "6plusmonths", label: "6+ months" },
    ],
  },
  {
    id: "experience",
    label: "What level of experience is required from the vendor?",
    type: "select",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "expert", label: "Expert" },
      { value: "industrySpecific", label: "Industry-specific expertise" },
    ],
  },
  {
    id: "portfolio",
    label: "Is a portfolio required from the vendor?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "references",
    label: "How many references are required?",
    type: "select",
    options: [
      { value: "none", label: "None" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "more", label: "More than 3" },
    ],
  },
  {
    id: "selectionCriteria",
    label: "What selection criteria should be considered?",
    type: "select",
    options: [
      { value: "cost", label: "Cost" },
      { value: "technicalCapability", label: "Technical Capability" },
      { value: "experience", label: "Experience" },
      { value: "timeline", label: "Timeline" },
      { value: "innovation", label: "Innovation" },
    ],
  },
  {
    id: "riskManagement",
    label: "What potential risks are you concerned about?",
    type: "textarea",
  },
  {
    id: "compliance",
    label: "What compliance requirements are there?",
    type: "select",
    options: [
      { value: "none", label: "None" },
      { value: "industrySpecific", label: "Industry-specific regulations" },
      { value: "security", label: "Security standards (e.g., ISO 27001)" },
      { value: "gdpr", label: "GDPR" },
    ],
  },
  {
    id: "supportMaintenance",
    label: "What level of ongoing support and maintenance is required?",
    type: "select",
    options: [
      { value: "none", label: "None" },
      { value: "basicSupport", label: "Basic Support" },
      { value: "advancedSupport", label: "Advanced Support" },
      { value: "customSupport", label: "Custom Support Package" },
    ],
  },
];
