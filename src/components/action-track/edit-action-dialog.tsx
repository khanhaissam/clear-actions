import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MEETINGS,
  OWNERS,
  type ActionItem,
  type ActionPriority,
  type ActionStatus,
} from "@/lib/data";
import { Trash2 } from "lucide-react";

interface EditActionDialogProps {
  action: ActionItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (action: ActionItem) => void;
  onDelete: (id: string) => void;
}

export function EditActionDialog({
  action,
  onOpenChange,
  onSave,
  onDelete,
}: EditActionDialogProps) {
  const [description, setDescription] = useState("");
  const [meeting, setMeeting] = useState<string>(MEETINGS[0]);
  const [owner, setOwner] = useState<string>(OWNERS[0]);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<ActionPriority>("Medium");
  const [status, setStatus] = useState<ActionStatus>("Open");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!action) return;
    setDescription(action.description);
    setMeeting(action.meeting);
    setOwner(action.owner);
    setDueDate(action.dueDate);
    setPriority(action.priority);
    setStatus(action.status);
    setConfirmOpen(false);
  }, [action]);

  const meetingOptions = Array.from(
    new Set([...MEETINGS, ...(action ? [action.meeting] : [])])
  );
  const ownerOptions = Array.from(
    new Set([...OWNERS, ...(action ? [action.owner] : [])])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!action || !description.trim()) return;
    onSave({
      ...action,
      description: description.trim(),
      meeting,
      owner,
      dueDate,
      priority,
      status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={!!action} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Action</DialogTitle>
            <DialogDescription>
              Update the details, change the status, or delete this action.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Action description</Label>
              <Input
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-meeting">Meeting</Label>
                <Select value={meeting} onValueChange={setMeeting}>
                  <SelectTrigger id="edit-meeting">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {meetingOptions.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-owner">Owner</Label>
                <Select value={owner} onValueChange={setOwner}>
                  <SelectTrigger id="edit-owner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ownerOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="edit-due-date">Due date</Label>
                <Input
                  id="edit-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as ActionPriority)}
                >
                  <SelectTrigger id="edit-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as ActionStatus)}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this action?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will be permanently removed from your tracker.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (action) onDelete(action.id);
                  setConfirmOpen(false);
                  onOpenChange(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
