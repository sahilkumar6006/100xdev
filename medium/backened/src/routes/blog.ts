import { Hono } from "hono";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";
import app from "..";


export const blogRouter = new Hono();

blogRouter.post('/api/v1/blog', async(c) => {
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