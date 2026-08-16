import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, CalendarDays, CheckCircle2, ListTodo } from "lucide-react";

interface SummaryCounts {
  open: number;
  overdue: number;
  dueThisWeek: number;
  completed: number;
}

interface SummaryCardsProps {
  counts: SummaryCounts;
  overdueActive?: boolean;
  onOverdueClick?: () => void;
}

export function SummaryCards({
  counts,
  overdueActive = false,
  onOverdueClick,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Open Actions",
      value: counts.open,
      icon: ListTodo,
      tone: "text-foreground",
      clickable: false,
    },
    {
      title: "Overdue",
      value: counts.overdue,
      icon: AlertCircle,
      tone: "text-destructive",
      clickable: true,
    },
    {
      title: "Due This Week",
      value: counts.dueThisWeek,
      icon: CalendarDays,
      tone: "text-primary",
      clickable: false,
    },
    {
      title: "Completed",
      value: counts.completed,
      icon: CheckCircle2,
      tone: "text-muted-foreground",
      clickable: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isOverdueCard = card.clickable;

        const cardBody = (
          <Card
            className={cn(
              "transition-colors",
              isOverdueCard &&
                "cursor-pointer hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isOverdueCard &&
                overdueActive &&
                "border-destructive bg-destructive/[0.05] ring-1 ring-destructive"
            )}
            tabIndex={isOverdueCard ? 0 : undefined}
            role={isOverdueCard ? "button" : undefined}
            aria-pressed={isOverdueCard ? overdueActive : undefined}
            aria-label={
              isOverdueCard
                ? overdueActive
                  ? "Show all actions"
                  : "Show only overdue actions"
                : undefined
            }
            onClick={isOverdueCard ? onOverdueClick : undefined}
            onKeyDown={
              isOverdueCard
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOverdueClick?.();
                    }
                  }
                : undefined
            }
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${card.tone}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
            </CardContent>
          </Card>
        );

        return <div key={card.title}>{cardBody}</div>;
      })}
    </div>
  );
}
