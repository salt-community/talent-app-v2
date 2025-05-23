"use client";
import React, { useState } from "react";
import { Fix_Item } from "../types";
import { Card } from "@/components";
import { ChevronDown, ChevronUp } from "lucide-react";

type Items = {
  items: Fix_Item[];
};

export function FixItems({ items }: Items) {
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const createShortTitle = (description: string) => {
    const firstSentence = description.split(/[.!?]/, 1)[0];
    if (firstSentence.length <= 60) return firstSentence;
    return firstSentence.substring(0, 57) + "...";
  };

  return (
    <div className="h-full max-w-5xl mx-auto">
      <Card className="border-none h-full flex flex-col">
        <div className="overflow-y-auto flex-1 pr-1 -mr-1">
          <div className="grid grid-cols-1 gap-3 cursor-pointer">
            {items.map((item) => {
              const isExpanded = !!expandedItems[item.id];
              const shortTitle = createShortTitle(item.description);

              return (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => toggleItem(item.id)}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isCompleted ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></span>
                        <h3 className="font-medium text-sm text-gray-900 flex items-center gap-1">
                          {shortTitle}
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-3 w-3 text-gray-500" />
                          )}
                        </h3>
                      </div>

                      {isExpanded && (
                        <div className="mt-2 pl-4 text-sm text-gray-700">
                          {item.description}
                        </div>
                      )}

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="font-medium text-gray-700">
                            {item.dueDate
                              ? new Date(item.dueDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                              item.isCompleted
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.isCompleted ? "Completed" : "Pending"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Created</p>
                          <p className="font-medium text-gray-700">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Updated</p>
                          <p className="font-medium text-gray-700">
                            {item.updatedAt
                              ? new Date(item.updatedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
