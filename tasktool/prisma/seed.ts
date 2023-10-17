import { Category, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const testTask = await prisma.task.create({
    data: {
      category: Category.Unwichtig,
      createtAt: new Date(),
      description: "First Task",
      finished: false,
      finishedAt: new Date(),
    }
  });
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
