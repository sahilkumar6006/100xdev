import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';
import app from '..';


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_TOKEN: string
    }
}>();



userRouter.post('/api/v1/signup',  async  (c) => { 
  const body = await c.req.json();
  const prima = new PrismaClient({
    datasourceUrl: env(c).DATABASE_URL,
  }).$extends(withAccelerate());


 const user =  await prima.user.create({
    data: {
      name: body.name,
      email: body.email,
      password:body.password,
    },
  })

  const jwt = sign({ userId: user.id }, env(c).JWT_TOKEN)
  return c.json({ jwt })
})


  

userRouter.post('/api/v1/sigin', async(c) => {
 const prisma = new PrismaClient({
    datasourceUrl: env(c).DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password, 
    },
  })
  if (!user) {
  c.status(403);
  return c.json({ error: 'Invalid email or password' })
  }
  if (user.password !== body.password) {
    return c.json({ error: 'Invalid email or password' })
  }
})
