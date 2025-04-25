import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { updateScoreAction } from "../../action";
import { AssignmentScore } from "../../types";


function useDebounce<T>(value: T, delay: number): T {
 const [debouncedValue, setDebouncedValue] = useState<T>(value);

 useEffect(() => {
  const timer = setTimeout(() => {
   setDebouncedValue(value);
  }, delay);

  return () => {
   clearTimeout(timer);
  };
 }, [value, delay]);

 return debouncedValue;
}

export default function useAutoSaveScores(initialScores: AssignmentScore[]) {
 const { toast } = useToast();
 const [scoreValues, setScoreValues] = useState<AssignmentScore[]>(initialScores);
 const [isSaving, setIsSaving] = useState(false);
 const [saveStatus, setSaveStatus] = useState<{
  success: boolean;
  message: string;
 } | null>(null);
 const [isManualSave, setIsManualSave] = useState(false);


 
 const [lastSavedScores, setLastSavedScores] = useState(
  structuredClone(initialScores)
 );

 
 const debouncedScoreValues = useDebounce(scoreValues, 10000);

 const handleScoreChange = (categoryId: string, value: string) => {
  setScoreValues((prev) =>
   prev.map((s) =>
    s.categoryId === categoryId ? { ...s, score: parseInt(value) || 0 } : s
   )
  );
 };

 const handleCommentChange = (categoryId: string, value: string) => {
  setScoreValues((prev) =>
   prev.map((s) =>
    s.categoryId === categoryId ? { ...s, comment: value } : s
   )
  );
 };

 
 const saveScores = async () => {
  if (isSaving) return;

  setIsSaving(true);
  setSaveStatus(null);
  setIsManualSave(true); 

  try {
   const updatedScores = [...scoreValues];

   const baseScoreData = {
    assignmentId: updatedScores[0].assignmentId,
    identityId: updatedScores[0].identityId,
    score: updatedScores[0].score,
    id: updatedScores[0].id || "",
   };

   const feedbackDataArray = updatedScores.map((score) => ({
    comment: score.comment || "",
    score: score.score,
    categoryId: score.categoryId,
   }));

   const result = await updateScoreAction(baseScoreData, feedbackDataArray);

   if (result.success) {
    setLastSavedScores(structuredClone(scoreValues));
    setSaveStatus({
     success: true,
     message: "All feedback saved successfully!",
    });
    toast({
     title: "Success",
     description: "Feedback saved successfully",
    });
   } else {
    setSaveStatus({
     success: false,
     message: "Failed to save feedback.",
    });
    toast({
     variant: "destructive",
     title: "Save failed",
     description: "Couldn't save changes",
    });
   }
  } catch (error) {
   setSaveStatus({
    success: false,
    message: `An error occurred while saving feedback. ${error}`,
   });
   toast({
    variant: "destructive",
    title: "Error",
    description: `An error occurred: ${error}`,
   });
  } finally {
   setIsSaving(false);
  }
 };

 
 useEffect(() => {
  const autoSave = async () => {
   if (isSaving) return;

   
   const hasUnsavedChanges = JSON.stringify(debouncedScoreValues) !==
    JSON.stringify(lastSavedScores);

   if (!hasUnsavedChanges) return;

   try {
    setIsSaving(true);
    setSaveStatus(null);
    setIsManualSave(false); 

    const updatedScores = [...debouncedScoreValues];

    const baseScoreData = {
     assignmentId: updatedScores[0].assignmentId,
     identityId: updatedScores[0].identityId,
     score: updatedScores[0].score,
     id: updatedScores[0].id || "",
    };

    const feedbackDataArray = updatedScores.map((score) => ({
     comment: score.comment || "",
     score: score.score,
     categoryId: score.categoryId,
    }));

    const result = await updateScoreAction(baseScoreData, feedbackDataArray);

    if (result.success) {
     setLastSavedScores(structuredClone(debouncedScoreValues));
     setSaveStatus({
      success: true,
      message: "All feedback saved automatically",
     });

     
     
   } else {
     setSaveStatus({
      success: false,
      message: "Failed to save feedback automatically",
     });
     toast({
      variant: "destructive",
      title: "Save failed",
      description: "Couldn't save changes automatically. Try manual save.",
     });
    }
   } catch (error) {
    setSaveStatus({
     success: false,
     message: `Auto-save failed. ${error}`,
    });
    toast({
     variant: "destructive", 
     title: "Error",
     description: "Auto-save failed. Try saving manually.",
    });
   } finally {
    setIsSaving(false);
   }
  };

  autoSave();
 }, [debouncedScoreValues, lastSavedScores, isSaving, toast]);

 
 const hasUnsavedChanges = JSON.stringify(scoreValues) !==
  JSON.stringify(lastSavedScores);

 return {
  scoreValues,
  handleScoreChange,
  handleCommentChange,
  saveScores,
  isSaving,
  saveStatus,
  hasUnsavedChanges,
  isManualSave  
 };
}