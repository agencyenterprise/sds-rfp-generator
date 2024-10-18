import { type RFPData } from "~/validators/rfp";

export interface RFP {
  id: string;
  userId: string | null;
  title: string;
  data: RFPData | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface RFPResponse {
  data: RFP[];
  pagination: Pagination;
}
