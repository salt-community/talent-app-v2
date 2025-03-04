"use client";
import React from "react";
import { Developer } from "../../types";
import OpenScoreFormButton from "./open-score-form-button";
import { AlertCircle, Check, CheckCheck } from "lucide-react";
import { AssignmentScore } from "@/features/assignments";
import { Label } from "@/components";
import { Switch } from "@/components/ui/switch";

type Props = {
  developer: Developer;
  scores: AssignmentScore[];
  scored?: boolean;
  published?: boolean;
};

export default function Developers({
  developer,
  scores,
  scored = false,
  published = false,
}: Props) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <div className="py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-white font-medium">
            {developer.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex flex-row gap-2 font-medium">
              {developer.name}

              {published ? (
                <div title="Score published">
                  <CheckCheck size={20} color="green" />
                </div>
              ) : scored ? (
                <div title="Assignment scored">
                  <Check size={20} color="green" />
                </div>
              ) : (
                <div title="Not scored">
                  <AlertCircle size={20} color="red" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch id="publish-mode" />
            <Label htmlFor="publish-mode">Publish</Label>
          </div>
          <OpenScoreFormButton scores={scores} />
        </div>
      </div>
    </div>
  );
}
