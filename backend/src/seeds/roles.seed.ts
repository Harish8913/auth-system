import { prisma } from "../lib/prisma.js";

console.log("Seeding Roles");

await prisma.roles
  .createMany({
    data: [
      { id: 1, description: "DEVELOPER" },
      { id: 2, description: "ADMIN" },
      { id: 3, description: "MANAGER" },
      { id: 4, description: "EMPLOYEE" },
      { id: 5, description: "GUEST" },
    ],
  })
  .then(() => console.log("Seeded Roles Successfully"))
  .catch((err) => console.log(`Seeding Failed: ${err}`));
