import { app } from "./app";
import { env } from "./env";

app.listen({
  port: env.PORT
}).then(() => {
   app.ready(() => {
    console.log('HTTP server running')
  } )
})