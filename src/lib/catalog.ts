// Connector catalogue served at /api/catalog.
//
// The shape is the contract between this website and the Owlka iOS app's
// Connectors page. Bump `version` whenever the catalogue changes so the
// iOS client knows to re-fetch and re-render.
//
// Real catalogue entries live in `catalog-data.json` so the same source
// of truth feeds both the route handler and the shape test in
// `__tests__/catalog.test.mjs`.

import catalogData from "./catalog-data.json";

export type ConnectorStatus = "live" | "coming-soon";

export type ConnectorPair =
  | { type: "deeplink"; payload: { url: string } }
  | { type: "oauth"; payload: { provider: string } }
  | { type: "sheet"; payload: { message: string } }
  | { type: "builtin"; payload: Record<string, never> };

export type Connector = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  status: ConnectorStatus;
  pair: ConnectorPair;
};

export type CatalogResponse = {
  version: string;
  connectors: Connector[];
};

const VALID_STATUSES = new Set<ConnectorStatus>(["live", "coming-soon"]);
const VALID_PAIR_TYPES = new Set(["deeplink", "oauth", "sheet", "builtin"]);

function assertExactKeys(p: Record<string, unknown>, allowed: string[], ctx: string): void {
  const keys = Object.keys(p);
  if (keys.length !== allowed.length || keys.some((k) => !allowed.includes(k))) {
    throw new Error(
      `${ctx}: payload keys ${JSON.stringify(keys)} must be exactly ${JSON.stringify(allowed)}`,
    );
  }
}

function assertPayload(
  payload: unknown,
  pairType: string,
  ctx: string,
): void {
  if (!payload || typeof payload !== "object") {
    throw new Error(`${ctx}: pair.payload must be object`);
  }
  const p = payload as Record<string, unknown>;
  switch (pairType) {
    case "deeplink":
      if (typeof p.url !== "string" || p.url.length === 0) {
        throw new Error(`${ctx}: deeplink payload requires non-empty 'url' string`);
      }
      assertExactKeys(p, ["url"], ctx);
      return;
    case "oauth":
      if (typeof p.provider !== "string" || p.provider.length === 0) {
        throw new Error(`${ctx}: oauth payload requires non-empty 'provider' string`);
      }
      assertExactKeys(p, ["provider"], ctx);
      return;
    case "sheet":
      if (typeof p.message !== "string" || p.message.length === 0) {
        throw new Error(`${ctx}: sheet payload requires non-empty 'message' string`);
      }
      assertExactKeys(p, ["message"], ctx);
      return;
    case "builtin":
      assertExactKeys(p, [], ctx);
      return;
    default:
      throw new Error(`${ctx}: unknown pair.type ${pairType}`);
  }
}

function assertStatusPairCoupling(
  status: ConnectorStatus,
  pairType: string,
  ctx: string,
): void {
  if (status === "coming-soon" && pairType !== "sheet") {
    throw new Error(`${ctx}: coming-soon connector must use sheet pair, got ${pairType}`);
  }
  if (status === "live" && pairType === "sheet") {
    throw new Error(`${ctx}: live connector must not use sheet pair (sheet is the coming-soon UI)`);
  }
}

function assertConnector(raw: unknown, idx: number): Connector {
  if (!raw || typeof raw !== "object") {
    throw new Error(`catalog: connector[${idx}] is not an object`);
  }
  const c = raw as Record<string, unknown>;
  for (const field of ["slug", "name", "description", "icon"] as const) {
    if (typeof c[field] !== "string" || (c[field] as string).length === 0) {
      throw new Error(`catalog: connector[${idx}].${field} must be non-empty string`);
    }
  }
  if (!VALID_STATUSES.has(c.status as ConnectorStatus)) {
    throw new Error(`catalog: connector[${idx}].status invalid: ${String(c.status)}`);
  }
  const pair = c.pair as Record<string, unknown> | undefined;
  if (!pair || typeof pair !== "object") {
    throw new Error(`catalog: connector[${idx}].pair must be object`);
  }
  if (!VALID_PAIR_TYPES.has(pair.type as string)) {
    throw new Error(`catalog: connector[${idx}].pair.type invalid: ${String(pair.type)}`);
  }
  const ctx = `catalog: connector[${idx}].${c.slug}`;
  assertPayload(pair.payload, pair.type as string, ctx);
  assertStatusPairCoupling(c.status as ConnectorStatus, pair.type as string, ctx);
  return raw as Connector;
}

export function getCatalog(): CatalogResponse {
  // The JSON file is the source of truth. We validate at module-boundary
  // so a malformed catalog-data.json fails loudly at server startup
  // instead of shipping a broken payload to the iOS Connectors page.
  const raw = catalogData as unknown;
  if (!raw || typeof raw !== "object") {
    throw new Error("catalog: root must be object");
  }
  const root = raw as Record<string, unknown>;
  if (typeof root.version !== "string" || root.version.length === 0) {
    throw new Error("catalog: version must be non-empty string");
  }
  if (!Array.isArray(root.connectors) || root.connectors.length === 0) {
    throw new Error("catalog: connectors must be non-empty array");
  }
  const connectors = root.connectors.map((c, i) => assertConnector(c, i));
  return { version: root.version, connectors };
}
