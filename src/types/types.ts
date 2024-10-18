interface RFPData {
  category?: string;
  company?: string;
  description?: string;
  tags?: string[];
  deadline?: Date;
  budget?: string;
}

export interface RFP {
  id: string;
  data: Record<string, unknown> | RFPData | null;
  userId: string | null;
  createdAt: Date;
  title: string;
  publishedAt: Date | null;
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
