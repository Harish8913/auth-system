import { prisma } from "../lib/prisma.js";

console.log("Seeding Roles");

await prisma.roles
  .createMany({
    data: [
      { description: "ADMIN" },
      { description: "MANAGER" },
      { description: "EMPLOYEE" },
      { description: "GUEST" },
    ],
  })
  .then(() => console.log("Seeded Roles Successfully"))
  .catch((err) => console.log(`Seeding Failed: ${err}`));
