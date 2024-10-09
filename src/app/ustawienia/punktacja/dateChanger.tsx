"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const months = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];

export default function DateChanger({ value, onChange }: MonthPickerProps) {
  const [internalDate, setInternalDate] = useState<Date>(new Date());

  useEffect(() => {
    if (value) {
      const [month, year] = value.split(".");
      setInternalDate(new Date(parseInt(year), parseInt(month) - 1));
    }
  }, [value]);

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(internalDate.getFullYear(), monthIndex);
    setInternalDate(newDate);
    if (onChange) {
      onChange(formatDate(newDate));
    }
  };

  const changeYear = (delta: number) => {
    const newDate = new Date(
      internalDate.getFullYear() + delta,
      internalDate.getMonth()
    );
    setInternalDate(newDate);
    if (onChange) {
      onChange(formatDate(newDate));
    }
  };

  const formatDate = (date: Date) => {
    return `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col justify-between items-center space-x-2 mx-5 gap-4">
      <div id="yearChange">
        <Button
          variant="outline"
          size="icon"
          onClick={() => changeYear(-1)}
          aria-label="Previous year"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="mx-4 text-sm font-medium text-center">
          {internalDate.getFullYear()}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => changeYear(1)}
          aria-label="Next year"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-x-3 gap-y-2">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={internalDate.getMonth() === index ? "default" : "outline"}
            size="sm"
            className="w-12 px-0"
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
}
