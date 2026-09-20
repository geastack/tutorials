type Person = {
  name: string
  messages: number
}

function greeting(person: Person): string {
  return `Hello, ${person.name}! You have ${person.messages} messages.`
}

const visitor: Person = {
  name: 'Ada',
  messages: 3,
}

console.log(greeting(visitor))
