import { Button } from "@/components";

export function DeleteFixItem() {
  const handleDeleteFix = async () => {
    console.log("Deleted");
  };

  return (
    <div>
      <Button onClick={handleDeleteFix}>Delete this fix</Button>
    </div>
  );
}
