import { RFP } from "~/types/types";

const mockRFPs: RFP[] = [
  {
    id: "1",
    data: { description: "RFP for web development services" },
    userId: null,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    title: "Web Development RFP",
    publishedAt: new Date("2023-01-02T10:00:00Z"),
    updatedAt: new Date("2023-01-03T10:00:00Z"),
  },
  {
    id: "2",
    data: { description: "RFP for mobile app development" },
    userId: null,
    createdAt: new Date("2023-02-01T10:00:00Z"),
    title: "Mobile App Development RFP",
    publishedAt: new Date("2023-02-02T10:00:00Z"),
    updatedAt: new Date("2023-02-03T10:00:00Z"),
  },
  {
    id: "3",
    data: { description: "RFP for cloud infrastructure services" },
    userId: null,
    createdAt: new Date("2023-03-01T10:00:00Z"),
    title: "Cloud Infrastructure RFP",
    publishedAt: new Date("2023-03-02T10:00:00Z"),
    updatedAt: new Date("2023-03-03T10:00:00Z"),
  },
  {
    id: "4",
    data: { description: "RFP for cybersecurity services" },
    userId: null,
    createdAt: new Date("2023-04-01T10:00:00Z"),
    title: "Cybersecurity RFP",
    publishedAt: new Date("2023-04-02T10:00:00Z"),
    updatedAt: new Date("2023-04-03T10:00:00Z"),
  },
  {
    id: "5",
    data: { description: "RFP for data analytics services" },
    userId: null,
    createdAt: new Date("2023-05-01T10:00:00Z"),
    title: "Data Analytics RFP",
    publishedAt: new Date("2023-05-02T10:00:00Z"),
    updatedAt: new Date("2023-05-03T10:00:00Z"),
  },
];

export default mockRFPs;
