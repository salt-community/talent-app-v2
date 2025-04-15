import React, { useState } from "react";
import { Button, Textarea } from "@/components";
import { addPrivateNoteToAssignmentScoreAction } from "../../action";

type PrivateNotesProps = {
  assignmentScoreId?: string | null;
  initialContent: string;
};

export function PrivateNotes({
  assignmentScoreId,
  initialContent,
}: PrivateNotesProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSave = async () => {
    if (!assignmentScoreId) return;

    setIsSaving(true);
    setSaveStatus(null);

    await addPrivateNoteToAssignmentScoreAction({
      assignmentScoreId,
      note: content,
    });

    setSaveStatus({
      success: true,
      message: "Private note saved successfully!",
    });

    setIsSaving(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Private Notes</h1>
        <p className="text-gray-500">Your private notes for this assignment</p>
      </div>

      {saveStatus && (
        <div
          className={`mb-4 p-2 rounded text-xs ${
            saveStatus.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      <div className="mb-6">
        <Textarea
          className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg"
          placeholder="Write your private notes here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={handleSave}
          disabled={isSaving || !assignmentScoreId}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
