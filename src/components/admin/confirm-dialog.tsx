import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button-link";

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  danger = true,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(next) => !next && onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[80] bg-canvas/80" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 z-[90] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 border border-hairline bg-panel p-6 text-ink shadow-none md:p-8">
          <AlertDialog.Title className="font-display text-2xl font-semibold tracking-[-0.03em]">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-sm leading-relaxed text-quiet">
            {body}
          </AlertDialog.Description>
          <div className="mt-8 flex flex-wrap gap-3">
            <AlertDialog.Action asChild>
              <Button
                variant={danger ? "primary" : "ghost"}
                className={danger ? "border-danger bg-danger text-ink hover:bg-danger/90 hover:text-ink" : undefined}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
