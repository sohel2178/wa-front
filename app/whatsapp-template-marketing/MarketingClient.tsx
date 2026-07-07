// // "use client";

// // import { useEffect, useState } from "react";

// // import ProtectedRoute from "@/components/auth/ProtectedRoute";
// // import MainLayout from "@/components/layout/MainLayout";

// // import MarketingHeader from "@/components/marketing/MarketingHeader";
// // import MarketingStats from "@/components/marketing/MarketingStats";

// // import { getTemplateStatistics } from "@/lib/marketing-api";

// // import { TemplateStatistics } from "@/types/meta-template";
// // import MarketingTabs, {
// //   MarketingTab,
// // } from "@/components/marketing/MarketingTabs";

// // const initialStatistics: TemplateStatistics = {
// //   total: 0,
// //   active: 0,
// //   approved: 0,
// //   rejected: 0,
// //   disabled: 0,
// //   paused: 0,
// //   pending: 0,
// // };

// // export default function MarketingClient() {
// //   const [statistics, setStatistics] = useState(initialStatistics);

// //   const [selectedTab, setSelectedTab] = useState<MarketingTab>("templates");

// //   const [loadingStatistics, setLoadingStatistics] = useState(true);

// //   const loadStatistics = async () => {
// //     try {
// //       setLoadingStatistics(true);

// //       const data = await getTemplateStatistics();

// //       setStatistics(data);
// //     } finally {
// //       setLoadingStatistics(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadStatistics();
// //   }, []);

// //   return (
// //     <ProtectedRoute>
// //       <MainLayout>
// //         <div className="mx-auto flex w-full flex-col gap-6 p-6">
// //           <MarketingHeader />

// //           <MarketingStats statistics={statistics} loading={loadingStatistics} />

// //           <MarketingTabs
// //             selectedTab={selectedTab}
// //             onTabChange={setSelectedTab}
// //           />
// //         </div>
// //       </MainLayout>
// //     </ProtectedRoute>
// //   );
// // }

// "use client";

// import { useCallback, useEffect, useState } from "react";

// import ProtectedRoute from "@/components/auth/ProtectedRoute";
// import MainLayout from "@/components/layout/MainLayout";

// import MarketingHeader from "@/components/marketing/MarketingHeader";
// import MarketingStats from "@/components/marketing/MarketingStats";
// import MarketingTabs, {
//   MarketingTab,
// } from "@/components/marketing/MarketingTabs";
// import TemplateTable from "@/components/marketing/TemplateTable";

// import { getTemplateStatistics, getTemplates } from "@/lib/marketing-api";

// import { MetaTemplate, TemplateStatistics } from "@/types/meta-template";

// const initialStatistics: TemplateStatistics = {
//   total: 0,
//   active: 0,
//   approved: 0,
//   rejected: 0,
//   disabled: 0,
//   paused: 0,
//   pending: 0,
// };

// export default function MarketingClient() {
//   /* -------------------------------------------------------------------------- */
//   /*                                   State                                    */
//   /* -------------------------------------------------------------------------- */

//   const [selectedTab, setSelectedTab] = useState<MarketingTab>("templates");

//   const [statistics, setStatistics] = useState(initialStatistics);

//   const [templates, setTemplates] = useState<MetaTemplate[]>([]);

//   const [loadingStatistics, setLoadingStatistics] = useState(true);

//   const [loadingTemplates, setLoadingTemplates] = useState(true);

//   const [search, setSearch] = useState("");

//   const [status, setStatus] = useState("all");

//   const [page, setPage] = useState(1);

//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1,
//   });

//   /* -------------------------------------------------------------------------- */
//   /*                                  Methods                                   */
//   /* -------------------------------------------------------------------------- */

//   const loadStatistics = useCallback(async () => {
//     try {
//       setLoadingStatistics(true);

//       const data = await getTemplateStatistics();

//       setStatistics(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingStatistics(false);
//     }
//   }, []);

//   const loadTemplates = useCallback(async () => {
//     try {
//       setLoadingTemplates(true);

//       const response = await getTemplates({
//         page,
//         limit: 20,
//         search,
//         status: status === "all" ? undefined : status,
//       });

//       setTemplates(response.data);

//       setPagination(response.pagination);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingTemplates(false);
//     }
//   }, [page, search, status]);

//   const refreshDashboard = useCallback(async () => {
//     await Promise.all([loadStatistics(), loadTemplates()]);
//   }, [loadStatistics, loadTemplates]);

//   /* -------------------------------------------------------------------------- */
//   /*                                 Lifecycle                                  */
//   /* -------------------------------------------------------------------------- */

//   useEffect(() => {
//     loadTemplates();
//   }, [loadTemplates]);

//   useEffect(() => {
//     loadStatistics();
//   }, [loadStatistics]);

//   /* -------------------------------------------------------------------------- */
//   /*                                   Render                                   */
//   /* -------------------------------------------------------------------------- */

//   return (
//     <ProtectedRoute>
//       <MainLayout>
//         <div className="mx-auto flex w-full flex-col gap-6 p-6">
//           <MarketingHeader onTemplatesSynced={refreshDashboard} />

//           <MarketingStats statistics={statistics} loading={loadingStatistics} />

//           <MarketingTabs
//             selectedTab={selectedTab}
//             onTabChange={setSelectedTab}
//           />

//           {selectedTab === "templates" && (
//             <TemplateTable
//               templates={templates}
//               loading={loadingTemplates}
//               search={search}
//               status={status}
//               pagination={pagination}
//               onSearchChange={(value) => {
//                 setSearch(value);
//                 setPage(1);
//               }}
//               onStatusChange={(value) => {
//                 setStatus(value);
//                 setPage(1);
//               }}
//               onPageChange={setPage}
//               onRefresh={refreshDashboard}
//             />
//           )}

//           {selectedTab === "campaigns" && (
//             <div className="rounded-lg border border-dashed py-20 text-center text-muted-foreground">
//               Campaign management will be implemented next.
//             </div>
//           )}
//         </div>
//       </MainLayout>
//     </ProtectedRoute>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

import MarketingHeader from "@/components/marketing/common/MarketingHeader";
import MarketingStats from "@/components/marketing/common/MarketingStats";
import MarketingTabs, {
  MarketingTab,
} from "@/components/marketing/common/MarketingTabs";
import TemplateTable from "@/components/marketing/templates/TemplateTable";

import { getTemplateStatistics, getTemplates } from "@/lib/marketing-api";

import { MetaTemplate, TemplateStatistics } from "@/types/meta-template";
import TemplateDetailsDialog from "@/components/marketing/templates/TemplateDetailsDialog";

import useDebounce from "@/hooks/useDebounce";
import CreateCampaignDialog from "@/components/marketing/campaigns/CreateCampaignDialog";
import CampaignToolbar from "@/components/marketing/campaigns/CampaignToolbar";
import CampaignTable from "@/components/marketing/campaigns/CampaignTable";
import { TemplateCampaign } from "@/types/template-campaign";
import { getCampaigns, deleteCampaign } from "@/lib/marketing-api";
import DeleteCampaignDialog from "@/components/marketing/campaigns/DeleteCampaignDialog";

import { toast } from "sonner";

const initialStatistics: TemplateStatistics = {
  total: 0,
  active: 0,
  approved: 0,
  rejected: 0,
  disabled: 0,
  paused: 0,
  pending: 0,
};

export default function MarketingClient() {
  /* -------------------------------------------------------------------------- */
  /* State                                                                      */
  /* -------------------------------------------------------------------------- */

  const [selectedTab, setSelectedTab] = useState<MarketingTab>("templates");

  const [statistics, setStatistics] = useState(initialStatistics);

  const [templates, setTemplates] = useState<MetaTemplate[]>([]);

  const [loadingStatistics, setLoadingStatistics] = useState(false);

  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  const [selectedTemplate, setSelectedTemplate] = useState<MetaTemplate | null>(
    null,
  );

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

  const [campaigns, setCampaigns] = useState<TemplateCampaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const [selectedCampaign, setSelectedCampaign] =
    useState<TemplateCampaign | null>(null);

  const [campaignDetailsOpen, setCampaignDetailsOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  /* -------------------------------------------------------------------------- */
  /* API                                                                        */
  /* -------------------------------------------------------------------------- */

  const handleDeleteCampaign = async () => {
    if (!selectedCampaign) return;

    try {
      setDeleting(true);

      await deleteCampaign(selectedCampaign._id);

      toast.success("Campaign deleted successfully.");

      setDeleteOpen(false);

      setSelectedCampaign(null);

      await refreshCampaigns();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to delete campaign.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const loadStatistics = useCallback(async () => {
    setLoadingStatistics(true);

    try {
      const result = await getTemplateStatistics();

      setStatistics(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatistics(false);
    }
  }, []);

  const loadCampaigns = useCallback(async () => {
    try {
      setLoadingCampaigns(true);

      const result = await getCampaigns({
        page,
        limit: 20,
        search: debouncedSearch,
      });

      setCampaigns(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCampaigns(false);
    }
  }, [page, debouncedSearch]);

  const loadTemplates = useCallback(async () => {
    setLoadingTemplates(true);

    try {
      const result = await getTemplates({
        page,
        limit: pagination.limit,
        search: debouncedSearch,
        status: status === "all" ? undefined : status,
      });

      setTemplates(result.data);

      setPagination(result.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTemplates(false);
    }
  }, [page, pagination.limit, debouncedSearch, status]);

  const refreshDashboard = useCallback(async () => {
    await Promise.all([loadStatistics(), loadTemplates()]);
  }, [loadStatistics, loadTemplates]);

  /* -------------------------------------------------------------------------- */
  /* Effects                                                                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  useEffect(() => {
    if (selectedTab === "campaigns") {
      loadCampaigns();
    }
  }, [selectedTab, loadCampaigns]);

  /* -------------------------------------------------------------------------- */
  /* Render                                                                     */
  /* -------------------------------------------------------------------------- */

  const refreshCampaigns = useCallback(async () => {
    await loadCampaigns();
  }, [loadCampaigns]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="mx-auto flex w-full flex-col gap-6 p-6">
          <MarketingHeader onTemplatesSynced={refreshDashboard} />

          <MarketingStats statistics={statistics} loading={loadingStatistics} />

          <MarketingTabs
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          {selectedTab === "templates" && (
            <TemplateTable
              templates={templates}
              loading={loadingTemplates}
              search={search}
              status={status}
              pagination={pagination}
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
              onPageChange={setPage}
              onRefresh={refreshDashboard}
              onView={(template) => {
                setSelectedTemplate(template);
                setDetailsOpen(true);
              }}
            />
          )}

          {selectedTab === "campaigns" && (
            <CampaignTable
              campaigns={campaigns}
              loading={loadingCampaigns}
              search={search}
              onSearchChange={handleSearchChange}
              onCreate={() => setCreateCampaignOpen(true)}
              onView={(campaign) => {
                setSelectedCampaign(campaign);
                setCampaignDetailsOpen(true);
              }}
              onDelete={(campaign) => {
                setSelectedCampaign(campaign);
                setDeleteOpen(true);
              }}
            />
          )}
        </div>

        <TemplateDetailsDialog
          open={detailsOpen}
          template={selectedTemplate}
          onOpenChange={setDetailsOpen}
        />

        <CreateCampaignDialog
          open={createCampaignOpen}
          onOpenChange={setCreateCampaignOpen}
          templates={templates}
          onSuccess={refreshCampaigns}
        />

        <DeleteCampaignDialog
          open={deleteOpen}
          campaign={selectedCampaign}
          loading={deleting}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDeleteCampaign}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
