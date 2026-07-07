"use client";

import { Megaphone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  onCreate: () => void;
}

export default function CampaignEmpty({ onCreate }: Props) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-20">
        <Megaphone className="mb-6 h-14 w-14 text-muted-foreground" />

        <h3 className="text-xl font-semibold">No Campaigns Yet</h3>

        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Create your first WhatsApp marketing campaign and start sending
          approved templates.
        </p>

        <Button className="mt-6" onClick={onCreate}>
          Create Campaign
        </Button>
      </CardContent>
    </Card>
  );
}
