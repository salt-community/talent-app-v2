"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code } from "lucide-react";

type Feedback = {
  category: string;
  comment: string;
};

interface CategoryFeedbackProps {
  feedbacks: Feedback[];
}

export default function CategoryFeedback({ feedbacks }: CategoryFeedbackProps) {
  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-2">Instructor Feedback</h4>

      {feedbacks.length > 0 ? (
        <ScrollArea className="h-64">
          <div className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <Card key={index} className="p-4 relative group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className=" text-blue-600 mr-2">
                      <Code size={18} />
                    </span>
                    <h5 className="font-medium text-gray-900">
                      {feedback.category}
                    </h5>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {feedback.comment}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border border-gray-200 rounded-md p-4 bg-gray-50">
          <i className="fas fa-comment-slash text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-500">No feedback available yet</p>
        </div>
      )}
    </div>
  );
}
