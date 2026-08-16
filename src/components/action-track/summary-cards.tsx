import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, CalendarDays, CheckCircle2, ListTodo } from "lucide-react";

export type SummaryCardType = "open" | "overdue" | "dueThisWeek" | "completed";

interface SummaryCounts {
  open: number;
  overdue: number;
  dueThisWeek: number;
  completed: number;
}

interface SummaryCardsProps {
  counts: SummaryCounts;
  activeCard?: SummaryCardType | null;
  onCardClick?: (card: SummaryCardType) => void;
}

export function SummaryCards({
  counts,
  activeCard = null,
  onCardClick,
}: SummaryCardsProps) {
  const cards: {
    id: SummaryCardType;
    title: string;
    value: number;
    icon: typeof ListTodo;
    tone: string;
    activeRing: string;
  }[] = [
    {
      id: "open",
      title: "Open Actions",
      value: counts.open,
      icon: ListTodo,
      tone: "text-foreground",
      activeRing: "ring-foreground/30",
    },
    {
      id: "overdue",
      title: "Overdue",
      value: counts.overdue,
      icon: AlertCircle,
      tone: "text-destructive",
      activeRing: "ring-destructive",
    },
    {
      id: "dueThisWeek",
      title: "Due This Week",
      value: counts.dueThisWeek,
      icon: CalendarDays,
      tone: "text-primary",
      activeRing: "ring-primary/50",
    },
    {
      id: "completed",
      title: "Completed",
      value: counts.completed,
      icon: CheckCircle2,
      tone: "text-muted-foreground",
      activeRing: "ring-muted-foreground/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeCard === card.id;

        return (
          <Card
            key={card.id}
            className={cn(
              "cursor-pointer transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive && `bg-accent/30 ${card.activeRing} ring-1`
            )}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`${isActive ? "Hide" : "Show only"} ${card.title.toLowerCase()} actions`}
            onClick={() => onCardClick?.(card.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCardClick?.(card.id);
              }
            }}
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
      })}
    </div>
  );
}
