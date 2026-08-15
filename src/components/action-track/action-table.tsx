import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDueDate, isOverdue, type ActionItem, type ActionPriority, type ActionStatus } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Pencil, RotateCcw, X } from "lucide-react";

interface ActionTableProps {
  actions: ActionItem[];
  today: Date;
  onEdit: (action: ActionItem) => void;
  onToggleComplete: (action: ActionItem) => void;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

function statusVariant(status: ActionStatus) {
  switch (status) {
    case "Completed":
      return "secondary";
    case "In Progress":
      return "outline";
    default:
      return "default";
  }
}

function priorityVariant(priority: ActionPriority) {
  switch (priority) {
    case "High":
      return "destructive";
    case "Low":
      return "secondary";
    default:
      return "default";
  }
}

export function ActionTable({
  actions,
  today,
  onEdit,
  onToggleComplete,
  hasFilters = false,
  onClearFilters,
}: ActionTableProps) {
  if (actions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border px-6 py-12 text-center">
        <p className="text-sm font-medium text-foreground">
          {hasFilters
            ? "No actions match your current filters."
            : "No actions yet."}
        </p>
        <p className="text-sm text-muted-foreground">
          {hasFilters
            ? "Try changing or clearing your filters."
            : "Add your first action to get started."}
        </p>
        {hasFilters && onClearFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={onClearFilters}
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[240px]">Action</TableHead>
            <TableHead>Meeting</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => {
            const overdue = isOverdue(action, today);
            const completed = action.status === "Completed";

            return (
              <TableRow
                key={action.id}
                onClick={() => onEdit(action)}
                className={cn(
                  "cursor-pointer",
                  overdue && "border-l-4 border-l-destructive bg-destructive/[0.03]",
                  completed && "text-muted-foreground"
                )}
              >
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{action.description}</span>
                    {overdue && (
                      <Badge variant="destructive" className="w-fit">
                        Overdue
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{action.meeting}</TableCell>
                <TableCell>{action.owner}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDueDate(action.dueDate)}
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(action.priority)}>
                    {action.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(action.status)}>
                    {action.status}
                  </Badge>
                </TableCell>
                <TableCell
                  className="text-right whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={completed ? "Reopen action" : "Mark as completed"}
                    title={completed ? "Reopen action" : "Mark as completed"}
                    onClick={() => onToggleComplete(action)}
                  >
                    {completed ? (
                      <RotateCcw className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit action"
                    title="Edit action"
                    onClick={() => onEdit(action)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
