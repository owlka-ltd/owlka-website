// Incident log for the Owlka status page.
//
// Append a new entry whenever a real incident is opened. See the
// README at src/app/status/README.md for the workflow.

export type IncidentStatus =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved";

export type Incident = {
  id: string;
  title: string;
  status: IncidentStatus;
  started_at: string;
  resolved_at: string | null;
  components: string[];
  updates: { ts: string; body: string }[];
};

export const INCIDENTS: Incident[] = [];
