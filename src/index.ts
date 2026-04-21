import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import { Effect } from "effect";
import { RouterBuilder } from "effect-http";
import { NodeServer, NodeSwaggerFiles } from "effect-http-node";
import { api } from "./api";

const app = RouterBuilder.make(api).pipe(
  RouterBuilder.handle("hello", () =>
    Effect.succeed({ message: "Hello, World!" }),
  ),
  RouterBuilder.build,
);

const port = Number(process.env.PORT ?? 3000);

app.pipe(
  NodeServer.listen({ port }),
  Effect.provide(NodeSwaggerFiles.SwaggerFilesLive),
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
);
