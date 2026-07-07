import api from "./api";

import { MetaTemplate, TemplateStatistics } from "@/types/meta-template";

import { CampaignImportPreview } from "@/types/campaign-import";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* -------------------------------------------------------------------------- */
/*                                Templates                                   */
/* -------------------------------------------------------------------------- */

export interface GetTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;

  status?: string;
  language?: string;
  category?: string;
  isActive?: boolean;
}

export const syncTemplates = async () => {
  const { data } = await api.post("/template-marketing/templates/sync");

  return data;
};

export const getTemplateStatistics = async (): Promise<TemplateStatistics> => {
  const { data } = await api.get("/template-marketing/templates/statistics");

  return data.data;
};

export const getTemplates = async ({
  page = 1,
  limit = 20,
  search = "",
  status,
  language,
  category,
  isActive,
}: GetTemplatesParams) => {
  const { data } = await api.get("/template-marketing/templates", {
    params: {
      page,
      limit,
      search,
      status,
      language,
      category,
      isActive,
    },
  });

  return data as {
    success: boolean;
    data: MetaTemplate[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export interface CreateCampaignRequest {
  name: string;
  description?: string;
  metaTemplate: string;
  assignedEmployee: string;
  scheduledAt?: string;
}

export const createCampaign = async (payload: CreateCampaignRequest) => {
  const { data } = await api.post("/template-marketing/campaigns", payload);

  return data.data;
};

import { TemplateCampaign } from "@/types/template-campaign";

export interface GetCampaignsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const getCampaigns = async ({
  page = 1,
  limit = 20,
  search = "",
  status,
}: GetCampaignsParams) => {
  const { data } = await api.get("/template-marketing/campaigns", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return data as {
    success: boolean;
    data: TemplateCampaign[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export const getCampaign = async (id: string): Promise<TemplateCampaign> => {
  const { data } = await api.get(`/template-marketing/campaigns/${id}`);

  return data.data;
};

/* -------------------------------------------------------------------------- */
/*                                CSV Import                                  */
/* -------------------------------------------------------------------------- */

export const uploadCampaignCsv = async (campaignId: string, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    `/template-marketing/campaigns/${campaignId}/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.data;
};

export const getCampaignImport = async (campaignId: string) => {
  const { data } = await api.get(
    `/template-marketing/campaigns/${campaignId}/import`,
  );

  return data.data;
};

export const deleteCampaignImport = async (campaignId: string) => {
  const { data } = await api.delete(
    `/template-marketing/campaigns/${campaignId}/import`,
  );

  return data.data;
};

export const replaceCampaignCsv = async (campaignId: string, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.put(
    `/template-marketing/campaigns/${campaignId}/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.data;
};

// export const getImportPreview = async (campaignId: string) => {
//   const { data } = await api.get(
//     `/template-marketing/campaigns/${campaignId}/import/preview`,
//   );

//   return data.data;
// };

export const getImportPreview = async (
  campaignId: string,
): Promise<CampaignImportPreview> => {
  const { data } = await api.get(
    `/template-marketing/campaigns/${campaignId}/import/preview`,
  );

  return {
    headers: data.headers,
    summary: data.summary,
    preview: data.preview,
  };
};

// Receipients API

export const generateRecipients = async (campaignId: string) => {
  const { data } = await api.post(
    `/template-marketing/campaigns/${campaignId}/recipients`,
  );

  return data.data;
};

export const getCampaignRecipients = async (
  campaignId: string,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  },
) => {
  const { data } = await api.get(
    `/template-marketing/campaigns/${campaignId}/recipients`,
    {
      params,
    },
  );

  return data;
};

export const getCampaignStatistics = async (campaignId: string) => {
  const { data } = await api.get(
    `/template-marketing/campaigns/${campaignId}/statistics`,
  );

  return data.data;
};

export const queueCampaign = async (campaignId: string) => {
  const { data } = await api.post(
    `/template-marketing/campaigns/${campaignId}/queue`,
  );

  return data.data;
};

export async function pauseCampaign(campaignId: string) {
  const response = await api.post(`/campaigns/${campaignId}/pause`);

  return response.data;
}

export async function resumeCampaign(campaignId: string) {
  const response = await api.post(`/campaigns/${campaignId}/resume`);

  return response.data;
}

export async function cancelCampaign(campaignId: string) {
  const response = await api.post(`/campaigns/${campaignId}/cancel`);

  return response.data;
}

export async function deleteCampaign(campaignId: string) {
  const { data } = await api.delete(
    `/template-marketing/campaigns/${campaignId}`,
  );

  return data;
}
