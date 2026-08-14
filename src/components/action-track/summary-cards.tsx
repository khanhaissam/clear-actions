import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CalendarDays, CheckCircle2, ListTodo } from "lucide-react";

interface SummaryCounts {
  open: number;
  overdue: number;
  dueThisWeek: number;
  completed: number;
}

interface SummaryCardsProps {
  counts: SummaryCounts;
}

export function SummaryCards({ counts }: SummaryCardsProps) {
  const cards = [
    {
      title: "Open Actions",
      value: counts.open,
      icon: ListTodo,
      tone: "text-foreground",
    },
    {
      title: "Overdue",
      value: counts.overdue,
      icon: AlertCircle,
      tone: "text-destructive",
    },
    {
      title: "Due This Week",
      value: counts.dueThisWeek,
      icon: CalendarDays,
      tone: "text-primary",
    },
    {
      title: "Completed",
      value: counts.completed,
      icon: CheckCircle2,
      tone: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
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
