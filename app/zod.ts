import * as z from "zod";

const player = z.object({
  userName: z.string(),
  xp: z.number(),
});

const result = player.parse({
  userName: "ali",
  xp: 100,
});

console.log(result.userName);
