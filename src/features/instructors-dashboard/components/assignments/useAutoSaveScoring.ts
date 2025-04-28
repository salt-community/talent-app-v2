import { useEffect, useState, useRef } from "react";
import { updateScoreAction } from "../../action";
import { AssignmentScore } from "../../types";
import toast from 'react-hot-toast';

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
 const [scoreValues, setScoreValues] = useState<AssignmentScore[]>(initialScores);
 const [isSaving, setIsSaving] = useState(false);
 const [isManualSave, setIsManualSave] = useState(false);
 
 
 const lastSaveTimestampRef = useRef<number>(Date.now());
 
 const [lastSavedScores, setLastSavedScores] = useState(
  structuredClone(initialScores)
 );
 
 const debouncedScoreValues = useDebounce(scoreValues, 5000);

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
  setIsManualSave(true); 

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

  try {
    const result = await toast.promise(
      updateScoreAction(baseScoreData, feedbackDataArray),
      {
        loading: "Saving...",
        success: "Feedback saved successfully!",
        error: "Failed to save feedback."
      }
    );
    
    if (result.success) {
      setLastSavedScores(structuredClone(scoreValues));
      
      lastSaveTimestampRef.current = Date.now();
    }
  } catch (error) {
    console.error("Save error:", error);
  } finally {
    setIsSaving(false);
    setIsManualSave(false);
  }
};

 useEffect(() => {
  const autoSave = async () => {
   if (isSaving) return;
   
   const hasUnsavedChanges = JSON.stringify(debouncedScoreValues) !==
    JSON.stringify(lastSavedScores);

   if (!hasUnsavedChanges) return;
   
   
   
   const now = Date.now();
   const timeSinceLastSave = now - lastSaveTimestampRef.current;
   if (timeSinceLastSave < 6000) {
     return; 
   }

   try {
    setIsSaving(true);
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
     
     lastSaveTimestampRef.current = Date.now();
    } 
   } catch (error) {
    console.error("Auto-save error:", error);
   } finally {
    setIsSaving(false);
   }
  };

  autoSave();
 }, [debouncedScoreValues, lastSavedScores, isSaving]);

 const hasUnsavedChanges = JSON.stringify(scoreValues) !==
  JSON.stringify(lastSavedScores);

 return {
  scoreValues,
  handleScoreChange,
  handleCommentChange,
  saveScores,
  isSaving,
  hasUnsavedChanges,
  isManualSave  
 };
}