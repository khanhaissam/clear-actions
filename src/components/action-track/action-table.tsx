import { Badge } from "@/components/ui/badge";
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

interface ActionTableProps {
  actions: ActionItem[];
  today: Date;
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

export function ActionTable({ actions, today }: ActionTableProps) {
  if (actions.length === 0) {
    return (
      <div className="rounded-md border py-12 text-center text-sm text-muted-foreground">
        No actions match your filters.
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => {
            const overdue = isOverdue(action, today);
            const completed = action.status === "Completed";

            return (
              <TableRow
                key={action.id}
                className={cn(
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
