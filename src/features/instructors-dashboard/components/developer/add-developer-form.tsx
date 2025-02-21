import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { addIdentitiesToCohortAction } from "../../action";

type Developer = {
  name: string;
  id: string;
  identityId: string;
  slug: string | null;
  email: string;
  status: string;
};

type Props = {
  cohortId: string;
  developer: Developer[];
  onSuccess: () => void;
};

export const AddDeveloperForm = ({ cohortId, developer, onSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDevs, setSelectedDevs] = useState<Developer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectDev = (dev: Developer) => {
    if (!selectedDevs.find((d) => d.identityId === dev.identityId)) {
      setSelectedDevs([...selectedDevs, dev]);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleRemoveDev = (devIdentityId: string) => {
    setSelectedDevs(
      selectedDevs.filter((dev) => dev.identityId !== devIdentityId)
    );
  };

  const filteredDevelopers = developer.filter(
    (dev) =>
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedDevs.find((d) => d.identityId === dev.identityId)
  );

  async function handleSubmit() {
    try {
      setLoading(true);
      await addIdentitiesToCohortAction(
        cohortId,
        selectedDevs.map((dev) => dev.identityId)
      );
      onSuccess();
    } catch (error) {
      console.error("Failed to add developers to cohort:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="relative">
        <div
          className="border rounded-md p-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            placeholder="Select developers..."
            className="outline-none w-full cursor-pointer"
            value={searchTerm}
            onChange={(e) => {
              e.stopPropagation();
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredDevelopers.length > 0 ? (
              filteredDevelopers.map((dev) => (
                <div
                  key={dev.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectDev(dev)}
                >
                  {dev.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No developers found</div>
            )}
          </div>
        )}
      </div>

      {selectedDevs.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Selected Developers:</div>
          <div className="space-y-2">
            {selectedDevs.map((dev) => (
              <div
                key={dev.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span>{dev.name}</span>
                <button
                  onClick={() => handleRemoveDev(dev.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={selectedDevs.length === 0 && loading}
        >
          {loading ? "Adding Developers..." : "Add Developers"}
        </Button>
      </div>
    </div>
  );
};
