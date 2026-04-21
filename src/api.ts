import { Schema } from "effect";
import { Api } from "effect-http";

export const api = Api.make({ title: "Antithesis API", version: "0.0.1" }).pipe(
  Api.addEndpoint(
    Api.get("hello", "/hello").pipe(
      Api.setResponseBody(Schema.Struct({ message: Schema.String })),
    ),
  ),
);
