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

await prisma.permissions.createMany({
  data: [
    {
      id: 1,
      action: "developer:read",
      description: "Developer account is read only",
    },
    {
      id: 2,
      action: "developer: update",
      description: "Developer account can be passed to others",
    },
    { id: 3, action: "admin:create", description: "Admins are created" },
    { id: 4, action: "admin:update", description: "Admin can be changed" },
    { id: 5, action: "admin:read", description: "Admin account is readonly" },
    { id: 6, action: "admin:delete", description: "Admin removal" },
    { id: 7, action: "manager:all", description: "Manager has all access" },
    {
      id: 8,
      action: "employee:read",
      description: "Employee account is readonly",
    },
    { id: 9, action: "employee:edit", description: "Manager has " },
  ],
});
