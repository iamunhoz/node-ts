**add** prisma as dev-dep
**run** 'npx prisma init --datasource-provider postgresql'
**change** url of postgresql db to railway host variable
**install** prisma extension
**create** first model - user (at 7:30)
id Int @id @default(autoincrement())
name String
**run** npx prisma migrate dev --name init
**install** @prisma/client
**run** npx prisma generate
**create** script file

**create** async function in script file to connect to db (at 11:00)

_tutorial link_
https://www.youtube.com/watch?v=RebA5J-rlwg
