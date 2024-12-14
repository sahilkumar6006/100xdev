import { Hono } from "hono";
import { env } from "hono/adapter";
import { verify } from "hono/jwt";
import app from "..";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma, PrismaClient } from "@prisma/client/edge";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_TOKEN: string
    }
}>();


blogRouter.use("/*", (c,next) => {
    next();
})

blogRouter.post('/blog', async(c) => {
    const body = await c.req.json();
    const header = c.req.header("authorization") || " ";

     const prima = new PrismaClient({
        datasourceUrl: env(c).DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await Prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: 1,
        }
      })

      return c.json({
        id: blog.id,
      })
  })
  
  app.put('/api/v1/blog', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: env(c).DATABASE_URL,
      }).$extends(withAccelerate());
    
      
      const blog = await prisma.blog.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      })
    return c.text('Hello Hono!')
  })
  
  app.get('/api/v1/blog:id', (c) => {
    return c.json({ message: 'Hello Hono!' })
  })