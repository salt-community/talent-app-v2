import { Button } from "@/components";
type Props = {
  onClick: () => void;
  isLoading?: boolean;
};

export function MigrationButton({ onClick, isLoading }: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Running Migration..." : "Run Migration"}
    </Button>
  );
}