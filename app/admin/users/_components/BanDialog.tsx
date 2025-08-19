"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export interface BanFormData {
  reason: string;
  banExpires: Date | null;
}

interface BanUserFormProps {
  onConfirm: (data: BanFormData) => Promise<void> | void;
}

export function BanUserForm({ onConfirm }: BanUserFormProps) {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleBan() {
    setLoading(true);
    await onConfirm({ reason, banExpires: date });
    setLoading(false);
    setReason("");
    setDate(null);
  }

  return (
    <div className="border p-4 rounded-xl flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="reason">Reason</Label>
        <Input
          id="reason"
          placeholder="Enter ban reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div>
        <Label>Ban Expires</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date ?? undefined}
              onSelect={(day) => setDate(day ?? null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button variant="destructive" onClick={handleBan} disabled={loading}>
        {loading ? "Banning..." : "Confirm Ban"}
      </Button>
    </div>
  );
}
