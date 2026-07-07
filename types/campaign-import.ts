export interface CampaignImportSummary {
  totalRows: number;
  validRows: number;
  duplicateRows: number;
  invalidRows: number;
}

export interface CampaignImportPreview {
  headers: string[];

  summary: CampaignImportSummary;

  preview: Record<string, string>[];
}
