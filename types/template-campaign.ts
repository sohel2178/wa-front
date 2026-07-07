import { MetaTemplate } from "./meta-template";
import { User } from "./user";

export type CampaignStatus =
  | "draft"
  | "queued"
  | "running"
  | "paused"
  | "completed"
  | "cancelled"
  | "failed";

export interface CampaignStats {
  total: number;

  pending: number;

  sending: number;

  sent: number;

  delivered: number;

  read: number;

  replied: number;

  failed: number;
}

export interface ImportSummary {
  totalRows: number;

  validRows: number;

  duplicateRows: number;

  invalidRows: number;
}

export interface CampaignImportFile {
  exists: boolean;

  originalName?: string;

  filename?: string;

  path?: string;

  mimeType?: string;

  size?: number;

  uploadedAt?: string;

  parsed?: boolean;

  imported?: boolean;
}

export interface TemplateSnapshot {
  name: string;

  language: string;

  category: string;

  status: string;

  header?: unknown;

  body?: unknown;

  bodyText?: string;

  footer?: unknown;

  buttons: unknown[];
}

export interface TemplateCampaign {
  _id: string;

  name: string;

  description: string;

  metaTemplate: MetaTemplate;

  templateSnapshot: TemplateSnapshot;

  assignedEmployee: User;

  createdBy: User;

  completedBy?: User;

  status: CampaignStatus;

  csvFile: CampaignCsvFile;

  importSummary: ImportSummary;

  createdRecipients: boolean;

  stats: CampaignStats;

  progress: number;

  sendingSpeed: number;

  scheduledAt?: string;

  startedAt?: string;

  completedAt?: string;

  lastRunAt?: string;

  failureReason?: string;

  isArchived: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CampaignCsvFile {
  exists: boolean;

  originalName?: string;

  filename?: string;

  path?: string;

  mimeType?: string;

  size?: number;

  uploadedBy?: string;

  uploadedAt?: string;

  parsed: boolean;

  imported: boolean;
}
