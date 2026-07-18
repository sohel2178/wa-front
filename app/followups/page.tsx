"use client";

import { useEffect, useMemo, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

import FollowupHeader from "@/components/followups/FollowupHeader";
import FollowupStats from "@/components/followups/FollowupStats";
import FollowupFilters from "@/components/followups/FollowupFilters";
import FollowupTable from "@/components/followups/table/FollowupTable";
import UpdateFollowUpDialog from "@/components/followups/UpdateFollowUpDialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";

import {
  getTodaysFollowUps,
  getUpcomingFollowUps,
  getOverdueFollowUps,
  updateFollowUp,
  getCompletedFollowUps,
  getCancelledFollowUps,
} from "@/lib/followup-api";

import api from "@/lib/api";

import { FollowUp } from "@/types/followup";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { isSameDay } from "date-fns";

export default function FollowupsPage() {
  const [loading, setLoading] = useState(true);

  const [today, setToday] = useState<FollowUp[]>([]);
  const [upcoming, setUpcoming] = useState<FollowUp[]>([]);
  const [overdue, setOverdue] = useState<FollowUp[]>([]);
  const [completed, setCompleted] = useState<FollowUp[]>([]);
  const [cancelled, setCancelled] = useState<FollowUp[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);

  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();

  const { user } = useAuthStore();

  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(
    null,
  );

  const [updateOpen, setUpdateOpen] = useState(false);

  // Filters

  const [search, setSearch] = useState("");

  const [employee, setEmployee] = useState("all");

  const [district, setDistrict] = useState("all");

  const [status, setStatus] = useState("all");

  const load = async () => {
    try {
      setLoading(true);

      const [
        todayData,
        upcomingData,
        overdueData,
        completedData,
        cancelledData,
      ] = await Promise.all([
        getTodaysFollowUps(),
        getUpcomingFollowUps(),
        getOverdueFollowUps(),
        getCompletedFollowUps(),
        getCancelledFollowUps(),
      ]);

      setToday(todayData);

      setUpcoming(upcomingData);

      setOverdue(overdueData);

      setCompleted(completedData);
      setCancelled(cancelledData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/users");

      console.log("Employees:", res.data);

      setEmployees(res.data.filter((user: User) => user.role === "employee"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role !== "admin") return;

    loadEmployees();
  }, [user]);

  const handleEdit = (followUp: FollowUp) => {
    setSelectedFollowUp(followUp);
    setUpdateOpen(true);
  };

  const handleComplete = async (followUp: FollowUp) => {
    try {
      await updateFollowUp(followUp._id, {
        status: "completed",
      });

      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (followUp: FollowUp) => {
    try {
      await updateFollowUp(followUp._id, {
        status: "cancelled",
      });

      load();
    } catch (err) {
      console.error(err);
    }
  };

  const filterFollowUps = (items: FollowUp[]) => {
    return items.filter((followUp) => {
      const conversation = followUp.conversationId;

      const contact = conversation.contactId;

      const matchesDate =
        !scheduledDate ||
        isSameDay(new Date(followUp.current.scheduledAt), scheduledDate);

      const matchesSearch =
        !search ||
        contact?.name?.toLowerCase().includes(search.toLowerCase()) ||
        contact?.phone?.includes(search);

      const matchesEmployee =
        employee === "all" || conversation.assignedTo?._id === employee;

      const matchesDistrict =
        district === "all" || followUp.salesSnapshot.district === district;

      const matchesStatus =
        status === "all" || followUp.current.status === status;

      return (
        matchesSearch &&
        matchesEmployee &&
        matchesDistrict &&
        matchesStatus &&
        matchesDate
      );
    });
  };

  const todayData = useMemo(
    () => filterFollowUps(today),
    [today, search, employee, district, status, scheduledDate],
  );

  const upcomingData = useMemo(
    () => filterFollowUps(upcoming),
    [upcoming, search, employee, district, status, scheduledDate],
  );

  const overdueData = useMemo(
    () => filterFollowUps(overdue),
    [overdue, search, employee, district, status, scheduledDate],
  );

  const completedData = useMemo(
    () => filterFollowUps(completed),
    [completed, search, employee, district, status, scheduledDate],
  );

  const cancelledData = useMemo(
    () => filterFollowUps(cancelled),
    [cancelled, search, employee, district, status, scheduledDate],
  );

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex h-screen flex-1 flex-col">
          {/* <FollowupHeader loading={loading} onRefresh={load} /> */}

          <FollowupHeader loading={loading} onRefresh={load}>
            <FollowupFilters
              search={search}
              onSearchChange={setSearch}
              employee={employee}
              onEmployeeChange={setEmployee}
              district={district}
              onDistrictChange={setDistrict}
              status={status}
              onStatusChange={setStatus}
              employees={employees}
              loading={loading}
              isAdmin={user?.role === "admin"}
              onClear={() => {
                setSearch("");
                setEmployee("all");
                setDistrict("all");
                setStatus("all");
                setScheduledDate(undefined);
              }}
              scheduledDate={scheduledDate}
              onScheduledDateChange={setScheduledDate}
            />
          </FollowupHeader>

          <FollowupStats
            today={today.length}
            upcoming={upcoming.length}
            overdue={overdue.length}
            completed={completed.length}
            cancelled={cancelled.length}
          />

          <Tabs defaultValue="today" className="flex min-h-0 flex-1 flex-col">
            <div className="border-b bg-background px-6 py-3">
              <TabsList className="h-11 rounded-lg bg-muted p-1">
                <TabsTrigger
                  value="today"
                  className="rounded-md px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Today
                  <Badge variant="secondary" className="ml-2">
                    {todayData.length}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="upcoming"
                  className="rounded-md px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Upcoming
                  <Badge variant="secondary" className="ml-2">
                    {upcomingData.length}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="overdue"
                  className="rounded-md px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Overdue
                  <Badge variant="destructive" className="ml-2">
                    {overdueData.length}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="completed"
                  className="rounded-md px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Completed
                  <Badge className="ml-2 bg-green-600 hover:bg-green-600">
                    {completedData.length}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="cancelled"
                  className="rounded-md px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Cancelled
                  <Badge variant="outline" className="ml-2">
                    {cancelledData.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="today" className="min-h-0 flex-1 overflow-auto">
              <FollowupTable
                loading={loading}
                followUps={todayData}
                onRefresh={load}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </TabsContent>

            <TabsContent
              value="upcoming"
              className="min-h-0 flex-1 overflow-auto"
            >
              <FollowupTable
                loading={loading}
                followUps={upcomingData}
                onRefresh={load}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </TabsContent>

            <TabsContent
              value="overdue"
              className="min-h-0 flex-1 overflow-auto"
            >
              <FollowupTable
                loading={loading}
                followUps={overdueData}
                onRefresh={load}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </TabsContent>

            <TabsContent
              value="completed"
              className="min-h-0 flex-1 overflow-auto"
            >
              <FollowupTable
                loading={loading}
                followUps={completedData}
                onRefresh={load}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </TabsContent>

            <TabsContent
              value="cancelled"
              className="min-h-0 flex-1 overflow-auto"
            >
              <FollowupTable
                loading={loading}
                followUps={cancelledData}
                onRefresh={load}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </TabsContent>
          </Tabs>
        </div>

        {selectedFollowUp && (
          <UpdateFollowUpDialog
            open={updateOpen}
            onOpenChange={setUpdateOpen}
            followUp={selectedFollowUp}
            onSuccess={() => {
              setUpdateOpen(false);
              load();
            }}
          />
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}
