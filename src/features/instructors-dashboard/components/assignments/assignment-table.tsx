"use client";
import { useState } from "react";
import {
  DeveloperWithScores,
  FixLists,
  PrivateNote,
  TabType,
} from "../../types";
import { Developers } from "./developers";
import { FixList } from "./fix-list";
import { PrivateNotes } from "./private-notes";
import { Score } from "./score";
import { ScoringTab } from "./scoring-tab";

type Props = {
  assignmentTitle: string;
  developersWithScores: DeveloperWithScores[];
  fixLists: FixLists[];
  privateNotes: PrivateNote[];
};

export function AssignmentTable({
  developersWithScores,
  fixLists,
  privateNotes,
}: Props) {
  const [selectedDeveloperIndex, setSelectedDeveloperIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("scoring");

  const selectedDeveloper = developersWithScores[selectedDeveloperIndex];

  const selectedDeveloperFixListCount = fixLists.filter(
    (fix) => fix.developerId === selectedDeveloper.developer.id
  ).length;

  const selectedDeveloperPrivateNote = privateNotes.find(
    (note) =>
      note.assignmentScoreId ===
      (selectedDeveloper.scores.length > 0
        ? selectedDeveloper.scores[0].id
        : null)
  );

  return (
    <div className="flex flex-row gap-2">
      <div className="w-4/5 flex flex-col ">
        <div className="mb-2">
          <ScoringTab
            activeTab={activeTab}
            fixListCount={Number(selectedDeveloperFixListCount) || 0}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 flex-grow overflow-hidden">
          {selectedDeveloper && activeTab === "scoring" && (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Assignment Scoring</h3>
                <p className="text-gray-500 text-sm">
                  Score each category from 1-100 and provide specific feedback
                </p>
              </div>
              <Score
                key={selectedDeveloper.developer.id}
                scores={selectedDeveloper.scores}
                developer={selectedDeveloper.developer}
              />
            </div>
          )}

          {activeTab === "fixList" && (
            <div
              className="overflow-y-auto"
              style={{ height: "calc(100vh - 10px)" }}
            >
              <FixList
                fixes={fixLists.filter(
                  (fix) => fix.developerId === selectedDeveloper.developer.id
                )}
                assignmentScoreId={
                  selectedDeveloper.scores.length > 0
                    ? selectedDeveloper.scores[0].id
                    : undefined
                }
              />
            </div>
          )}
          {activeTab === "privateNotes" && (
            <PrivateNotes
              key={selectedDeveloper.developer.id}
              assignmentScoreId={
                selectedDeveloper.scores.length > 0
                  ? selectedDeveloper.scores[0].id
                  : null
              }
              initialContent={selectedDeveloperPrivateNote?.note || ""}
            />
          )}
        </div>
      </div>

      <div className="w-1/5 border border-gray-200 rounded-lg p-4 overflow-y-auto">
        {developersWithScores.map((item, index) => (
          <div
            key={item.developer.id}
            onClick={() => setSelectedDeveloperIndex(index)}
            className={`cursor-pointer hover:bg-gray-50 transition-colors ${
              index === selectedDeveloperIndex
                ? "bg-gray-100 border-l-4 border-gray-400 motion-preset-slide-left motion-duration-1000 "
                : ""
            }`}
          >
            <Developers
              developer={item.developer}
              scores={item.scores}
              scored={item.scored}
              published={item.published}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
