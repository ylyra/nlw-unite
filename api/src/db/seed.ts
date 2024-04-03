/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import { createId } from '@paralleldrive/cuid2'
import chalk from 'chalk'
import { db } from './connection'
import { attendees, events } from './schema'

/**
 * Reset database and seed with fake data
 */
await db.delete(events)
await db.delete(attendees)

console.log(chalk.yellow('✔️ Database reset!'))

const attendeesItems: (typeof attendees.$inferInsert)[] = []

const generateAttendee = (eventId: string) => {
  const name = faker.person.fullName()
  const email = faker.internet.email().toLocaleLowerCase()

  return {
    name,
    email,
    eventId,
  }
}

const geenrateAttendees = (eventId: string, attendeesNumber: number) => {
  return Array.from({
    length: attendeesNumber,
  }).map(() => generateAttendee(eventId))
}

const eventsItems: (typeof events.$inferInsert)[] = Array.from({
  length: 10,
}).map((_, i) => {
  const id = createId()
  const title = faker.company.name().concat(` Event ${i}`)
  const maximumAttendeesNumber = faker.number.int({
    max: 100,
    min: 1,
  })
  const maximumAttendees =
    maximumAttendeesNumber < 10 ? undefined : maximumAttendeesNumber

  if (!maximumAttendees) {
    const attendeesNumber = faker.number.int({
      max: 100,
      min: 1,
    })

    attendeesItems.push(...geenrateAttendees(id, attendeesNumber))
  } else {
    const attendeesNumber = faker.number.int({
      max: maximumAttendees,
      min: 1,
    })

    attendeesItems.push(...geenrateAttendees(id, attendeesNumber))
  }

  return {
    id,
    title,
    details: faker.lorem.paragraph(),
    slug: faker.helpers.slugify(title.toLocaleLowerCase()),
    maximumAttendees,
  }
})
await db.insert(events).values(eventsItems)
console.log(chalk.yellow('✔️ Events seeded!'))

await db.insert(attendees).values(attendeesItems)
console.log(chalk.yellow('✔️ Attendees seeded!'))

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()
