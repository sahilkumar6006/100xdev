import z from "zod";


const creaateTaskInput = z.object({
    options: z.array(z.objectt({
        imageUrl: z.string().optional()
    }))
});
