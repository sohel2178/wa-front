"use client";

import { Users } from "lucide-react";

interface Props {
  search?: boolean;
}

export default function RecipientEmpty({ search = false }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 rounded-full bg-muted p-5">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        {search ? "No recipients found" : "No recipients yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {search
          ? "Try another search or filter."
          : "Generate recipients from your CSV file to continue."}
      </p>
    </div>
  );
}
