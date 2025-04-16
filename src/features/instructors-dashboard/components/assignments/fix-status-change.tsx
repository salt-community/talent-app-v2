import { Button } from "@/components";

export function FixItemChangeStatus() {
  const handleChangeStatus = async () => {
    console.log("status changed");
  };

  return (
    <div>
      <Button onClick={handleChangeStatus}></Button>
    </div>
  );
}
