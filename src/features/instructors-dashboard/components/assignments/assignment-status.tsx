import { AlertCircle, Check, CheckCheck } from "lucide-react";

type Props = {
  published: boolean;
  scored: boolean;
};

export default function AssignmentStatus({ published, scored }: Props) {
  return (
    <>
      {published ? (
        <div title="Score published">
          <CheckCheck size={20} color="green" />
        </div>
      ) : scored ? (
        <div title="Assignment scored">
          <Check size={20} color="green" />
        </div>
      ) : (
        <div title="Not scored">
          <AlertCircle size={20} color="red" />
        </div>
      )}
    </>
  );
}
