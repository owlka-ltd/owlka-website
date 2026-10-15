import availability from "@/content/printerpilot/availability.json";
import type { Availability } from "./printerpilot";

// Kept apart from printerpilot.ts so that file stays importable by the Node test runner, which cannot resolve "@/".
export const PP_AVAILABILITY = availability as Availability;
