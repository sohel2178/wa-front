// components/users/UserStatusSwitch.tsx

"use client";

import { Switch } from "@/components/ui/switch";

interface UserStatusSwitchProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function UserStatusSwitch({
  checked,
  disabled,
  onCheckedChange,
}: UserStatusSwitchProps) {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    />
  );
}
