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

const fetchDataSchema = async (val: string) => {
  return new Promise(() => {
    setTimeout(() => {
      return val;
    }, 1000);
  });
};

const schema = z.string().refine(
  async (val) => {
    const isValid = await fetchDataSchema(val);
    return isValid;
  },
  {
    error: "This data has been failed while checking ...",
  },
);

const validateData = async () => {
  const result = await schema.safeParseAsync("validate_data");
  if (result.success) {
    console.log("succeed", result.data);
  } else {
    console.log("something wen't wrong");
  }
};
validateData();

const teamPlayer = z.object({
  name: z.string(),
  sourName: z.string(),
  number: z.number(),
});

type TeamType = z.infer<typeof teamPlayer>;

teamPlayer.validate({ name: "ali", sourName: "hasehmi", number: 23 }); //true
