import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  hiddenTitle: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CvDialog({ hiddenTitle, placeholder, isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle hidden>{hiddenTitle}</DialogTitle>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
