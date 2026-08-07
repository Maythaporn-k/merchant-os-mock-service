import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface Endpoint {
  folder: string;
  name: string;
  method: string;
  url: string;
  response: unknown;
}

const endpoints: Endpoint[] = [
  {
    folder: "health",
    name: "ping",
    method: "GET",
    url: "/health",
    response: {
      success: true,
      service: "merchantos-mock-service",
      timestamp: new Date().toISOString(),
    },
  },
];

async function generate(endpoint: Endpoint) {
  const mappingDir = join("mappings", endpoint.folder);
  const fileDir = join("__files", endpoint.folder);

  await mkdir(mappingDir, { recursive: true });
  await mkdir(fileDir, { recursive: true });

  const bodyFile = `${endpoint.name}.json`;

  await writeFile(
    join(fileDir, bodyFile),
    JSON.stringify(endpoint.response, null, 2),
  );

  const mapping = {
    request: {
      method: endpoint.method,
      url: endpoint.url,
    },
    response: {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      bodyFileName: `${endpoint.folder}/${bodyFile}`,
    },
  };

  await writeFile(join(mappingDir, bodyFile), JSON.stringify(mapping, null, 2));

  console.log(`✔ Generated ${endpoint.method} ${endpoint.url}`);
}

await Promise.all(endpoints.map(generate));

console.log("Done!");
