"use client";

import { CheckCircle2, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;

  onViewRecipients?: () => void;
}

export default function RecipientGenerationResult({
  total,
  onViewRecipients,
}: Props) {
  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 h-10 w-10 text-green-600" />

          <div>
            <h3 className="text-lg font-semibold">
              Recipients Generated Successfully
            </h3>

            <p className="text-sm text-muted-foreground">
              {total ? total.toLocaleString() : "0"} recipients have been
              created and are ready to receive campaign messages.
            </p>
          </div>
        </div>

        <Button onClick={onViewRecipients}>
          <Users className="mr-2 h-4 w-4" />
          View Recipients
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
