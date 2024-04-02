/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import chalk from 'chalk'
import { db } from './connection'
import { events } from './schema'

/**
 * Reset database and seed with fake data
 */
await db.delete(events)

console.log(chalk.yellow('✔️ Database reset!'))

const eventsItems: (typeof events.$inferInsert)[] = Array.from({
  length: 300,
}).map((_, i) => {
  const title = faker.company.name().concat(` Event ${i}`)
  return {
    id: createId(),
    title,
    details: faker.lorem.paragraph(),
    slug: faker.helpers.slugify(title.toLocaleLowerCase()),
    maximumAttendees: faker.number.int({
      max: 100,
      min: 1,
    }),
  }
})
await db.insert(events).values(eventsItems)

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
