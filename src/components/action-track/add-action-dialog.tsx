import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";

interface AddActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (action: Omit<ActionItem, "id">) => void;
}

export function AddActionDialog({
  open,
  onOpenChange,
  onAdd,
}: AddActionDialogProps) {
  const [description, setDescription] = useState("");
  const [meeting, setMeeting] = useState<string>(MEETINGS[0]);
  const [owner, setOwner] = useState<string>(OWNERS[0]);
  const [dueDate, setDueDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [priority, setPriority] = useState<ActionPriority>("Medium");
  const [status, setStatus] = useState<ActionStatus>("Open");

  const reset = () => {
    setDescription("");
    setMeeting(MEETINGS[0]);
    setOwner(OWNERS[0]);
    setDueDate(format(new Date(), "yyyy-MM-dd"));
    setPriority("Medium");
    setStatus("Open");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAdd({
      description: description.trim(),
      meeting,
      owner,
      dueDate,
      priority,
      status,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} id="add-action-form">
          <DialogHeader>
            <DialogTitle>Add Action</DialogTitle>
            <DialogDescription>
              Log a new meeting action with a clear owner and deadline.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="action-description">Action description</Label>
              <Input
                id="action-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What needs to be done?"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="action-meeting">Meeting</Label>
                <Select value={meeting} onValueChange={setMeeting}>
                  <SelectTrigger id="action-meeting">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MEETINGS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="action-owner">Owner</Label>
                <Select value={owner} onValueChange={setOwner}>
                  <SelectTrigger id="action-owner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OWNERS.map((o) => (
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
                <Label htmlFor="action-due-date">Due date</Label>
                <Input
                  id="action-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="action-priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as ActionPriority)}
                >
                  <SelectTrigger id="action-priority">
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
                <Label htmlFor="action-status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as ActionStatus)}
                >
                  <SelectTrigger id="action-status">
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Action</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
