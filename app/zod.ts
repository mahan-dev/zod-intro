import * as z from "zod";

const player = z.object({
  userName: z.string(),
  xp: z.number(),
});
type PlayerProps = z.infer<typeof player>;

const result = player.parse({
  userName: "ali",
  xp: 100,
});

const safeResult = player.safeParse({
  userName: "ali",
  xp: 1212,
});
if (safeResult.success) {
  console.log("is succeeded");
} else {
  console.log("is failed");
}

console.log(result.userName);
