import { Router } from "express";

 const router = Router();


 router.post("/signin", (req,res)=> {
    console.log(req.body);
    res.send("ok");
})

export default router;