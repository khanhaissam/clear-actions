import { z } from "zod";

export const actionFormSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, { message: "Action description is required." })
    .max(300, { message: "Keep the description under 300 characters." }),
  meeting: z.string().trim().min(1, { message: "Select a meeting." }),
  owner: z.string().trim().min(1, { message: "Select an owner." }),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Select a due date." }),
  priority: z.enum(["High", "Medium", "Low"], {
    errorMap: () => ({ message: "Select a priority." }),
  }),
  status: z.enum(["Open", "In Progress", "Completed"], {
    errorMap: () => ({ message: "Select a status." }),
  }),
});

export type ActionFormValues = z.infer<typeof actionFormSchema>;
export type ActionFormErrors = Partial<Record<keyof ActionFormValues, string>>;

export function validateActionForm(values: {
  description: string;
  meeting: string;
  owner: string;
  dueDate: string;
  priority: string;
  status: string;
}):
  | { success: true; data: ActionFormValues }
  | { success: false; errors: ActionFormErrors } {
  const result = actionFormSchema.safeParse(values);
  if (result.success) return { success: true, data: result.data };

  const errors: ActionFormErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ActionFormValues;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
