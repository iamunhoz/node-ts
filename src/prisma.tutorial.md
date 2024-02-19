# instalar

- express
- prisma
- @prisma/client

# copiar

- src
  - api
  - consts
  - database
  - requests

# configurar

- absolute paths (TODO)

# prisma connection

**run** 'npx prisma init --datasource-provider postgresql'

**change** url of postgresql db to railway host variable for local development access

**install** prisma extension

**create** first model - EX: user (at 7:30)
id Int @id @default(autoincrement())
name String

**run** npx prisma migrate dev --name init

**run** npx prisma generate

**create** script file

**create** async function in script file to connect to db (at 11:00)

_tutorial link_
https://www.youtube.com/watch?v=RebA5J-rlwg
