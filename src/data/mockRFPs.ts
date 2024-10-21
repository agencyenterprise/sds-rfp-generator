import { type RFP } from "~/types/types";

function generateRandomDate() {
  return new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
}

const mockRFPs: RFP[] = [
  {
    id: "67113e90d5d021d29631594a",
    title:
      "Consultant for Technical Support in Developing Catch-Up Education Program with SEL Components in Ukraine",
    data: {
      description:
        "Finn Church Aid seeks a consultant to create a catch-up education program tailored to Ukraine, integrating Social-Emotional Learning (SEL) components. Responsibilities include designing the curriculum, developi...",
      tags: [
        "Catch-up education",
        "social-emotional learning",
        "Ukraine",
        "curriculum development",
        "FCA",
      ],
      budget: "$100,000 - $250,000",
      category: "Education and Curriculums",
      company: "Finn Church Aid",
      contactEmail: "test@test.com",
      location: "Kyiv, Ukraine",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-11-11"),
    publishedAt: new Date("2024-11-11"),
    updatedAt: new Date("2024-11-11"),
  },
  {
    id: "67113e4fd5d021d29631593f",
    title: "Financing Training",
    data: {
      description:
        "Water.org seeks an experienced consultant or firm to provide Water Supply and Sanitation (WSS) financing training for financial institutions in Kyrgyzstan. The training will equip FI staff to support water and ...",
      tags: [
        "Water financing",
        "sanitation training",
        "microfinance",
        "financial institutions",
        "WSS innovation",
      ],
      budget: "$100,000 - $250,000",
      category: "Coaching",
      company: "Water.org",
      contactEmail: "test@test.com",
      location: "Bishkek, Kyrgyzstan",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-12-02"),
    publishedAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-02"),
  },
  {
    id: "67113d75d5d021d29631591e",
    title:
      "Training of Trainers for Gender Mainstreaming with Intersectional Approaches in Counter-Terrorism and Countering/Preventing Violent Extremism",
    data: {
      description:
        "The UNOCT, in collaboration with IGAD/ICEPCVE, seeks experienced gender experts from specific African nations to participate in a ToT workshop aimed at integrating gender and intersectional approaches into CT/P...",
      tags: [
        "Gender mainstreaming",
        "intersectionality",
        "counter-terrorism",
        "violent extremism",
        "training of trainers",
      ],
      budget: "$100,000 - $250,000",
      category: "Coaching",
      company: "United Nations Office of Counter-Terrorism",
      contactEmail: "test@test.com",
      location: "Addis Ababa, Ethiopia",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-12-10"),
    publishedAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "67113d45d5d021d296315913",
    title: "Consultant for Gender Analysis Guidance Manual",
    data: {
      description:
        "ABAAD seeks a consultant to develop a Gender Analysis Guidance Manual to enhance gender-responsive program design specific to Lebanon’s socio-political context. The manual should offer step-by-step guidance o...",
      tags: [
        "Gender analysis",
        "Lebanon",
        "manual development",
        "intersectional approach",
        "community-based programming",
      ],
      budget: "$25,000 - $50,000",
      category: "Diversity, Equity & Inclusion",
      company: "ABAAD",
      contactEmail: "test@test.com",
      location: "Beirut, Lebanon",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-12-02"),
    publishedAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-02"),
  },
  {
    id: "67113ccbd5d021d296315908",
    title: "Digital Privacy Curriculum Consultant – Zambia",
    data: {
      description:
        "The American Bar Association seeks a consultant to develop a training module on digital privacy for Zambia, aimed at enhancing the capacity of lawyers and law students. The module should cover privacy laws, dat...",
      tags: [
        "Digital privacy",
        "Zambia",
        "legal training",
        "data protection",
        "online privacy",
      ],
      budget: "$100,000 - $250,000",
      category: "Education and Curriculums",
      company: "American Bar Association",
      contactEmail: "test@test.com",
      location: "Lusaka, Zambia",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-11-01"),
    publishedAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "67113ca8d5d021d296315900",
    title:
      "External Consultant for Strategy Support to CCCM Cluster and YDR Consortium Yemen",
    data: {
      description:
        "The Danish Refugee Council is seeking an external consultant to assist in developing the 2025-2027 CCCM Cluster Strategy and a Capacity Building Strategy for Yemen. This includes conducting consultations, refin...",
      tags: [
        "Strategy development",
        "CCCM",
        "capacity building",
        "Yemen",
        "durable solutions",
      ],
      budget: "$25,000 - $50,000",
      category: "Strategic Planning",

      company: "Danish Refugee Council",
      contactEmail: "test@test.com",
      location: "Sana'a, Yemen",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-11-01"),
    publishedAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "67113bffd5d021d2963158f8",
    title:
      "Consultant to Review and Contextualize BRAC International Procurement Guidelines",
    data: {
      description:
        "BRAC seeks a consultant, preferably a lawyer with expertise in Philippine procurement laws, to review and contextualize its International Procurement Guidelines for compliance with local regulations. The assign...",
      tags: [
        "Procurement policy",
        "Philippines",
        "compliance",
        "contextualization",
        "BRAC International",
      ],
      budget: "$25,000 - $50,000",
      category: "Legal",
      company: "BRAC",
      contactEmail: "test@test.com",
      location: "Manila, Philippines",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-11-01"),
    publishedAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "67113b1fd5d021d2963158e8",
    title:
      "Consultant to Conduct Knowledge, Attitude, and Practice (KAP) Survey in Kakuma Refugee Camp",
    data: {
      description:
        "Peace Winds Japan seeks a consultant to conduct a Knowledge, Attitude, and Practice (KAP) survey for its WASH program in Kakuma and Kalobeyei. The project aims to evaluate current WASH practices, gaps, and outc...",
      tags: ["KAP survey", "WASH", "Kakuma", "refugee camp", "data collection"],
      budget: "$100,000 - $250,000",
      category: "Research & Analysis",
      company: "Peace Winds Japan",
      contactEmail: "test@test.com",
      location: "Kakuma, Kenya",
      fileUrl:
        "https://utfs.io/f/6ey8bQmCyH3sGI77sdiRenc6q7bPlo4QrSvGZdgwFTHAVt2M",
    },
    userId: null,
    deadline: generateRandomDate(),
    createdAt: new Date("2024-11-01"),
    publishedAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-01"),
  },
];

export default mockRFPs;
