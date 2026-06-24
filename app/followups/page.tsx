"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import FollowupList from "@/components/followups/FollowupList";

import { Conversation } from "@/types/conversation";

import api from "@/lib/api";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function FollowupsPage() {
  const [today, setToday] = useState<Conversation[]>([]);
  const [upcoming, setUpcoming] = useState<Conversation[]>([]);
  const [overdue, setOverdue] = useState<Conversation[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [todayRes, upcomingRes, overdueRes] = await Promise.all([
        api.get("/followups/today"),
        api.get("/followups/upcoming"),
        api.get("/followups/overdue"),
      ]);

      setToday(todayRes.data);
      setUpcoming(upcomingRes.data);
      setOverdue(overdueRes.data);
    } catch (error) {
      console.error("Failed to load followups", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (conversationId: string) => {
    try {
      await api.patch(`/conversations/${conversationId}/followup/complete`);

      await loadData();
    } catch (error) {
      console.error("Failed to complete follow-up", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout>
      <div className="h-full p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Follow Ups</h1>

          <p className="text-muted-foreground">
            Manage scheduled customer follow-ups
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            Loading...
          </div>
        ) : (
          <>
            <Tabs defaultValue="today">
              <TabsList>
                <TabsTrigger value="today">Today ({today.length})</TabsTrigger>

                <TabsTrigger value="upcoming">
                  Upcoming ({upcoming.length})
                </TabsTrigger>

                <TabsTrigger value="overdue">
                  Overdue ({overdue.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-4">
                <FollowupList
                  conversations={today}
                  onComplete={handleComplete}
                />
              </TabsContent>

              <TabsContent value="upcoming" className="mt-4">
                <FollowupList
                  conversations={upcoming}
                  onComplete={handleComplete}
                />
              </TabsContent>

              <TabsContent value="overdue" className="mt-4">
                <FollowupList
                  conversations={overdue}
                  onComplete={handleComplete}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </MainLayout>
  );
}
