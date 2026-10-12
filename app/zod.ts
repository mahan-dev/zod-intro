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

const store = z.object({
  milk: z.string(),
  drinks: z.array(z.string()),
  food: z.array(z.string()),
});

type StoreTypes = z.infer<typeof store>;

const buyItem: StoreTypes = {
  milk: "coconut-mil",
  drinks: ["vodka", "whisky"],
  food: ["fast-food", "italian-food"],
};

//* Coercion zod

const coerceTest = z.coerce.string();

const res = coerceTest.parse(23232);
console.log("coerce res", res);

// email validation

const validateEmail = z.email().parse("example@gmail.com");
console.log("🎃 ~ zod.ts:85 ~ validateEmail:", validateEmail);

//! user object

const userObj = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .transform((val) => val.toLowerCase()),
  lastName: z.string().trim().min(3),
  age: z.coerce.number().min(18).max(100),
});

type UserType = z.infer<typeof userObj>;

const userResult = userObj.safeParse({
  name: "ASHLEY",
  lastName: "rose",
  age: "18",
});
if (userResult.success) {
  console.log("validated successfully");
} else if (userResult.error) {
  console.log("something wen't wrong", userResult.error);
}
console.log("🤖 ~ zod.ts:99 ~ userResult:", userResult);

const creditCard = z.string().trim().pipe(z.creditCard());

const validateCard = creditCard.safeParse(" 4111 1111 1111 1111 ");
if (validateCard.error) {
  console.log("error", validateCard.error);
}
console.log("🚡 ~ zod.ts:120 ~ validateCard:", validateCard);

const fishEnum = z.enum(["salmon", "tuna", "trout"]);

const salmonAndTuna = fishEnum.exclude(["salmon", "tuna"]);

console.log(salmonAndTuna.safeParse("trout").success);

// extract
const trout = fishEnum.extract(["trout"]);

console.log(trout.safeParse("trout").success);

const currencyCode = z.currencyCode();

console.log("🎮 ~ zod.ts:133 ~ currencyCode:", currencyCode.parse("GBP"));

//! z enum

const cars = { porsche: 2, bmw: 6, benz: 1 } as const;

const carsEnum = z.enum(cars);

console.log("🍰 ~ zod.ts:141 ~ carsEnum:", carsEnum.parse(cars.bmw));

// ! z.strbools

// const strBools = z.stringbool();

// console.log("🎺 ~ zod.ts:147 ~ strBools:", strBools.parse("1"));
// console.log("🎺 ~ zod.ts:147 ~ strBools:", strBools.parse("disabled"));
// console.log("🎺 ~ zod.ts:147 ~ strBools:", strBools.safeParse("disabled2"));
//

const strbools = z.stringbool({
  truthy: ["yes", "admin", "allowed"],
  falsy: ["no", "user", "not-allowed"],
  // case:
});

console.log("🛶 ~ zod.ts:154 ~ stringbool:", strbools.parse("user"));

//! z.optional()

const lists = z.object({
  name: z.string(),
  lastName: z.string(),
  address: z.string().optional(),
  // tax: z.number().nullish(),
  tax: z.number().nullable(),
});

console.log(
  "🍕 ~ zod.ts:164 ~ lists:",
  lists.parse({ name: "ashley", lastName: "rose", tax: 10 }),
  lists.parse({ name: "ashley", lastName: "rose", tax: null }),
);

const strictItems = z.strictObject({
  cargo: z.string(),
});
console.log(
  "🍺 ~ zod.ts:178 ~ strictItems:",
  strictItems.parse({
    cargo: "items",
    // something: "sdasd"
  }),
);

const looseItems = z.looseObject({
  cargo: z.string(),
});

console.log(
  "🏕️ ~ zod.ts:187 ~ looseItems:",
  looseItems.parse({ cargo: "items", something: "sdasd" }),
);

const catchAllLists = z
  .object({
    name: z.string(),
    age: z.number().optional(),
  })
  .catchall(z.string());

// catchAllLists.parse({ name: "ashley", age: "dswsd" }); // will be passed
// catchAllLists.parse({ name: "ashley", age: 32424 }); // won't be passed

const dataOmission = z.object({
  user: z.string(),
  id: z.number(),
  userId: z.number(),
});

const omission = dataOmission.omit({
  userId: true,
});

console.log(
  "🌟 ~ zod.ts:214 ~ omission:",
  omission.parse({ user: "s", id: 1212 }),
);

const items = z.object({
  product: z.string(),
  serial: z.string(),
  expireDate: z.date(),
});

const keyOfItems = items.keyof();

console.log("🚊 ~ zod.ts:229 ~ keyOfItems:", keyOfItems.parse("product"));

const stringArray = z.array(z.string().nullish());
const unwrapSchema = stringArray.unwrap();

console.log("🌈 ~ zod.ts:235 ~ stringArray:", stringArray.parse([null]));

console.log("unwrap schema: ", unwrapSchema.parse("test-schema"));
//!  test None empty

const noneEmpty = z.array(z.string()).nonempty();

console.log("🛩️ ~ zod.ts:241 ~ noneEmpty:", noneEmpty.parse(["something"]));

type MyResult =
  | { status: "success"; data: string }
  | {
      status: " failed";
      error: string;
    };

const resultFunction = (result: MyResult) => {
  if (result.status === "success") {
    console.log("data result :", result.status);
    return result.data;
  } else if (result.status === " failed") {
    console.log(result.error);
    return result.error;
  }
};

resultFunction({ status: "success", data: "has been fetched" });

// ? zod intersection

const scenario_1 = z.union([z.string(), z.number()]);
const scenario_2 = z.union([z.boolean(), z.number()]);

const scenarioResult = z.intersection(scenario_1, scenario_2);

console.log("🚇 ~ zod.ts:269 ~ scenarioResult:", scenarioResult.parse(1));

//! z.record

const idCache = z.record(z.string(), z.union([z.number(), z.string()]));

type IdCache = z.infer<typeof idCache>;

const IdCache = idCache.parse({
  address: "st 342 pt2",
  phone: 223232,
});
console.log("🙃 ~ zod.ts:279 ~ idRes:", IdCache);
