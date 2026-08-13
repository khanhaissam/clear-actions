import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { AddActionDialog } from "@/components/action-track/add-action-dialog";
import { ActionFilters } from "@/components/action-track/action-filters";
import { ActionTable } from "@/components/action-track/action-table";
import { SummaryCards } from "@/components/action-track/summary-cards";
import { Button } from "@/components/ui/button";
import {
  computeSummary,
  generateSampleActions,
  type ActionItem,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ActionTrack | Meeting Action Tracker" },
      {
        name: "description",
        content:
          "Track meeting actions, owners, deadlines, and status in one clean dashboard.",
      },
      {
        property: "og:title",
        content: "ActionTrack | Meeting Action Tracker",
      },
      {
        property: "og:description",
        content:
          "Track meeting actions, owners, deadlines, and status in one clean dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

interface Filters {
  search: string;
  status: string;
  priority: string;
  owner: string;
}

function Index() {
  const [actions, setActions] = useState<ActionItem[]>(() =>
    generateSampleActions()
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    priority: "",
    owner: "",
  });

  const today = useMemo(() => new Date(), []);
  const summary = useMemo(
    () => computeSummary(actions, today),
    [actions, today]
  );

  const owners = useMemo(
    () => Array.from(new Set(actions.map((a) => a.owner))).sort(),
    [actions]
  );

  const filteredActions = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return actions
      .filter((action) => {
        if (filters.status && action.status !== filters.status) return false;
        if (filters.priority && action.priority !== filters.priority)
          return false;
        if (filters.owner && action.owner !== filters.owner) return false;
        if (!term) return true;
        return (
          action.description.toLowerCase().includes(term) ||
          action.meeting.toLowerCase().includes(term) ||
          action.owner.toLowerCase().includes(term)
        );
      })
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  }, [actions, filters]);

  const handleAdd = (action: Omit<ActionItem, "id">) => {
    const newAction: ActionItem = { ...action, id: String(Date.now()) };
    setActions((prev) => [newAction, ...prev]);
  };

  const handleClearFilters = () => {
    setFilters({ search: "", status: "", priority: "", owner: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              ActionTrack
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Meeting actions. Clear owners. Clear deadlines.
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Action
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <SummaryCards counts={summary} />

        <section className="space-y-4">
          <ActionFilters
            filters={filters}
            setFilters={setFilters}
            owners={owners}
            onClear={handleClearFilters}
          />
          <ActionTable actions={filteredActions} today={today} />
        </section>
      </main>

      <AddActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAdd}
      />
    </div>
  );
}
