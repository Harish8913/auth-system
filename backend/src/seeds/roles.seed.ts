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
    ], skipDuplicates: true
  })
  .then(() => console.log("Seeded Roles Successfully"))
  .catch((err) => console.log(`Role Seeding Failed: ${err}`));


console.log('Seeding Permissions')

await prisma.permissions.createMany({
  data: [
    { id: 1, action: "developer:read", description: "Developer account is read only" },
    { id: 2, action: "developer:update", description: "Developer account can be passed to others" },
    { id: 3, action: "admin:create", description: "Admins are created" },
    { id: 4, action: "admin:update", description: "Admin can be changed" },
    { id: 5, action: "admin:read", description: "Admin account is readonly" },
    { id: 6, action: "admin:delete", description: "Admin removal" },
    { id: 7, action: "manager:", description: "Manager has all access" },
    { id: 8, action: "employee:read", description: "Employee account is readonly" },
    { id: 9, action: "employee:edit", description: "Manager has edit access" },
    { id: 10, action: "employee:delete", description: "Manager can remove employee" }
  ],
  skipDuplicates: true,
}).then(() => console.log('Seeded Permissions Successfully'))
.catch(err => console.log(`Permission Seeding Failed: ${err}`))

const rolesPermissionMapping = [
  {roleId: 1, permissionIds: [1, 2]},
  {roleId: 2, permissionIds: [3,4,5,6]},
  {roleId: 3, permissionIds: [7,9]},
  {roleId: 4, permissionIds: [8]},
  {roleId: 5, permissionIds: []}
]

console.log('Seeding Roles & Permissions')
await prisma.$transaction(
  rolesPermissionMapping.map(({roleId, permissionIds}) => prisma.roles.update({
    where: {id: roleId},
    data: {
      rolesPermission: {
        set: permissionIds.map((id) => ({id}))
      }
    }
  }))
).then(() => console.log('Role & Permission Seeded Successffully'))
.catch(err => console.log(`Role&Permission Seeding Failed: ${err}`));
