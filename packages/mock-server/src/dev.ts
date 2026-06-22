// `pnpm --filter @company-intelligence/mock-server dev` — start the mock API.

import { startMockServer } from "./server";

const port = Number(process.env.PORT ?? 4600);

startMockServer({ port })
  .then((server) => {
    process.stdout.write(`Company Intelligence mock server listening on ${server.url}\n`);
    process.stdout.write(
      "Routes: GET /v1/health, POST /v1/companies/resolve, /v1/companies/intel, /v1/domains/intel, /v1/context/application\n",
    );
  })
  .catch((error: unknown) => {
    process.stderr.write(`Failed to start mock server: ${String(error)}\n`);
    process.exitCode = 1;
  });
