"use client";

import React, { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (color: string) => void;
}

export default function ColorPicker({
  label,
  value: propValue,
  onChange,
  ...props
}: ColorPickerProps) {
  const [color, setColor] = useState((propValue as string) || "#000000");

  const handleChange = useCallback(
    (newColor: string) => {
      setColor(newColor);
      if (onChange) {
        onChange(newColor);
      }
    },
    [onChange]
  );

  return (
    <div className="flex flex-col space-y-2">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="flex items-center space-x-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="w-10 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: color }}
              aria-label="Pick a color
"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <HexColorPicker color={color} onChange={handleChange} />
          </PopoverContent>
        </Popover>
        <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-600">
          {color.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
