import { Button, AlertDialogDemo } from "@/components";

type Props = {
  onConfirm: () => void;
};

export function DeleteDialog({ onConfirm }: Props) {
  return (
    <AlertDialogDemo
      title="Are you sure?"
      description="This action can't be undone, are you sure?"
      onConfirm={onConfirm}
    >
      <Button size="sm" className="w-full">
        Delete
      </Button>
    </AlertDialogDemo>
  );
}
