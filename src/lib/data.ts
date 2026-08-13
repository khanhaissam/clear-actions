import { addDays, format, isBefore, isWithinInterval, startOfDay } from "date-fns";

export type ActionStatus = "Open" | "In Progress" | "Completed";
export type ActionPriority = "High" | "Medium" | "Low";

export interface ActionItem {
  id: string;
  description: string;
  meeting: string;
  owner: string;
  dueDate: string; // YYYY-MM-DD
  priority: ActionPriority;
  status: ActionStatus;
}

export const MEETINGS = [
  "Project Kickoff",
  "Weekly Project Review",
  "Supplier Coordination",
  "Risk Review",
  "Steering Committee",
] as const;

export const OWNERS = [
  "Alex Morgan",
  "Jamie Chen",
  "Taylor Reed",
  "Jordan Patel",
  "Casey Brooks",
  "Morgan Lee",
] as const;

/**
 * Calendar day of the given instant in UTC, as a local-midnight Date.
 * Keeps server-rendered and client-rendered dates identical across timezones.
 */
export function utcToday(referenceDate = new Date()) {
  return new Date(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate()
  );
}

export function generateSampleActions(referenceDate = new Date()): ActionItem[] {
  const today = utcToday(referenceDate);
  const d = (offset: number) => format(addDays(today, offset), "yyyy-MM-dd");

  return [
    {
      id: "1",
      description: "Confirm project scope and deliverables with steering committee",
      meeting: "Steering Committee",
      owner: "Alex Morgan",
      dueDate: d(-2),
      priority: "High",
      status: "Open",
    },
    {
      id: "2",
      description: "Review and update risk register entries",
      meeting: "Risk Review",
      owner: "Jamie Chen",
      dueDate: d(-4),
      priority: "High",
      status: "In Progress",
    },
    {
      id: "3",
      description: "Update project timeline based on latest estimates",
      meeting: "Weekly Project Review",
      owner: "Taylor Reed",
      dueDate: d(-1),
      priority: "Medium",
      status: "Open",
    },
    {
      id: "4",
      description: "Prepare supplier contract draft for review",
      meeting: "Supplier Coordination",
      owner: "Jordan Patel",
      dueDate: d(0),
      priority: "High",
      status: "Open",
    },
    {
      id: "5",
      description: "Send meeting minutes and action log to attendees",
      meeting: "Project Kickoff",
      owner: "Casey Brooks",
      dueDate: d(1),
      priority: "Medium",
      status: "Open",
    },
    {
      id: "6",
      description: "Follow up on budget approval from finance",
      meeting: "Steering Committee",
      owner: "Morgan Lee",
      dueDate: d(2),
      priority: "High",
      status: "In Progress",
    },
    {
      id: "7",
      description: "Schedule site visit with key suppliers",
      meeting: "Supplier Coordination",
      owner: "Alex Morgan",
      dueDate: d(3),
      priority: "Medium",
      status: "Open",
    },
    {
      id: "8",
      description: "Compile weekly status report for stakeholders",
      meeting: "Weekly Project Review",
      owner: "Jamie Chen",
      dueDate: d(5),
      priority: "Low",
      status: "Open",
    },
    {
      id: "9",
      description: "Review quality metrics from last sprint",
      meeting: "Risk Review",
      owner: "Taylor Reed",
      dueDate: d(8),
      priority: "Medium",
      status: "Open",
    },
    {
      id: "10",
      description: "Finalize communication plan and stakeholder map",
      meeting: "Project Kickoff",
      owner: "Jordan Patel",
      dueDate: d(12),
      priority: "Low",
      status: "In Progress",
    },
    {
      id: "11",
      description: "Close procurement ticket and archive documents",
      meeting: "Supplier Coordination",
      owner: "Casey Brooks",
      dueDate: d(-7),
      priority: "Medium",
      status: "Completed",
    },
    {
      id: "12",
      description: "Publish approved project charter to shared drive",
      meeting: "Project Kickoff",
      owner: "Morgan Lee",
      dueDate: d(-5),
      priority: "Low",
      status: "Completed",
    },
  ];
}

export function formatDueDate(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  return format(date, "d MMM yyyy");
}

export function isOverdue(action: ActionItem, referenceDate = new Date()) {
  if (action.status === "Completed") return false;
  const due = startOfDay(new Date(action.dueDate + "T00:00:00"));
  return isBefore(due, startOfDay(referenceDate));
}

export function isDueThisWeek(action: ActionItem, referenceDate = new Date()) {
  if (action.status === "Completed" || isOverdue(action, referenceDate)) return false;
  const due = startOfDay(new Date(action.dueDate + "T00:00:00"));
  const today = startOfDay(referenceDate);
  return isWithinInterval(due, { start: today, end: addDays(today, 6) });
}

export function computeSummary(actions: ActionItem[], referenceDate = new Date()) {
  const completed = actions.filter((a) => a.status === "Completed").length;
  const overdue = actions.filter((a) => isOverdue(a, referenceDate)).length;
  const dueThisWeek = actions.filter((a) => isDueThisWeek(a, referenceDate)).length;
  return {
    open: actions.length - completed,
    overdue,
    dueThisWeek,
    completed,
  };
}
