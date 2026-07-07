export interface TemplateComponent {
  type: string;
  format?: string;
  text?: string;
  example?: unknown;
}

export interface TemplateButton {
  type: string;
  text: string;
  url?: string;
  phone_number?: string;
}

export interface MetaTemplate {
  _id: string;

  metaTemplateId: string;

  name: string;

  language: string;

  category: string;

  status: "APPROVED" | "PENDING" | "REJECTED" | "DISABLED" | "PAUSED";

  qualityScore?: string;

  rejectedReason?: string;

  header?: TemplateComponent | null;

  body?: TemplateComponent | null;

  footer?: TemplateComponent | null;

  buttons: TemplateButton[];

  lastSyncedAt?: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface TemplateStatistics {
  total: number;

  approved: number;
  active: number;

  pending: number;

  rejected: number;

  disabled: number;

  paused: number;
}
