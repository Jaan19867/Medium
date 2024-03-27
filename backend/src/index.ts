import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>()



app.get("/", (c) => {
  return c.text("Hello Hono!")
})
app.post("/hello",async (c)=>{
  console.log("start")
  const body= await c.req.json();
  return c.text("this is body " + body)
})

app.post("/api/v1/signup", async (c) => {

console.log("Hi this is start")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  console.log("Hi this is end ")
const body = await c.req.json();
console.log(body)
try{
  console.log("this is inside the try ")
  const user = await prisma.user.create({
    data: {
    email:body.email,
      password: body.password,
      
    },
  })
  console.log(user)
  return c.json(user)
}catch(e){
 c.status(403)
 return c.body("An error occured " + e)
}
})




app.post("/api/v1/signin", (c) => {
  return c.text("Sign in route")
})

app.put("/api/v1/blog",(c)=>{
  return c.text("blog")
})

app.get("/api/v1/blog/:id",(c)=>{
  return c.text("Get the blog by id ")

})

app.get("/api/v1/blog/bulk",(c)=> {
  return c.text("Get the blog in bulk ")
})

export default app
