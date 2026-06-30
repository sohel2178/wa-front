"use client";

import { Input } from "@/components/ui/input";

export interface FollowUpFormData {
  date: string;
  time: string;
  note: string;

  district: string;
  address: string;

  devicePrice: string;
  monthlyCharge: string;
}

type Props = {
  value: FollowUpFormData;

  onChange: (value: FollowUpFormData) => void;
};

export default function FollowUpForm({ value, onChange }: Props) {
  const update = (key: keyof FollowUpFormData, val: string) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="space-y-6">
      {/* Follow-up */}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Follow-up
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Date</label>

            <Input
              type="date"
              value={value.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Time</label>

            <Input
              type="time"
              value={value.time}
              onChange={(e) => update("time", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sales */}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Sales Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">District</label>

            <Input
              value={value.district}
              onChange={(e) => update("district", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>

            <Input
              value={value.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Device Price</label>

            <Input
              type="number"
              value={value.devicePrice}
              onChange={(e) => update("devicePrice", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Monthly Charge</label>

            <Input
              type="number"
              value={value.monthlyCharge}
              onChange={(e) => update("monthlyCharge", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Note */}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Notes
        </h3>

        <textarea
          className="w-full min-h-32 rounded-md border p-3 text-sm resize-none"
          placeholder="Customer asked to call after salary..."
          value={value.note}
          onChange={(e) => update("note", e.target.value)}
        />
      </div>
    </div>
  );
}
