import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import {decode ,sign, verify} from 'hono/jwt'
import { userRouter } from './routes/user'


const app = new Hono<{
  Bindings: {
  DATABASE_URL: string
  JWT_TOKEN: string
  }

}>()


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


app.post('/api/v1/blog', async(c) => {
  const header = c.req.header("authorization") || " ";
  // Bearer token = ["Bearer", token]
  const token = header.split(" ")[1];
   const response =  await verify(token, env(c).JWT_TOKEN);

   if(!response){
    c.status(401);
    return c.json({ error: 'Invalid token' })
   }
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog:id', (c) => {
  return c.json({ message: 'Hello Hono!' })
})


export default app
