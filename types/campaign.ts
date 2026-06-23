export interface Campaign {
  _id: string;
  campaignName: string;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
}

export interface CampaignAssignment {
  _id: string;

  campaignId: string;
  campaignName: string;

  assignedTo: Employee;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}
