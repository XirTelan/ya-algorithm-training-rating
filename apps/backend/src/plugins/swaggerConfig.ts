import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

const swaggerConfig: SwaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "auth", description: "auth , login and JWT validation" },
      { name: "contests", description: "Contest related end-points" },
      { name: "logs", description: "Log system related end-points" },
      { name: "rating", description: "Rating related end-points. " },
      { name: "session", description: "Session  related end-points" },
      { name: "statistic", description: "Statistic related end-points" },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:
            "Enter your bearer token in the format **Bearer &lt;token&gt;**",
        },
      },
    },

    externalDocs: {
      url: "https://github.com/XirTelan/ya-algorithm-training-rating/",
      description: "Find more info here",
    },
  },
};
export default swaggerConfig;

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
};
