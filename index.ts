
const fs = require("fs");
const { promisify } = require("util");


interface Person {
  first_name: string;
  last_name: string;
  age: number;
  identity_card: string;
}

async function savePerson(person: Person): Promise<void> {
  // Open the JSON file in append mode
  await promisify(fs.appendFile)("persons.json", JSON.stringify(person) + "\n", "utf8");

  console.log("Person's details saved to persons.json!");
}

async function searchPerson(identityCard: string): Promise<Person | undefined> {
  // Open the JSON file in read mode
  const file = await promisify(fs.readFile)("persons.json", "utf8");

  // Split the file contents into an array of lines
  const lines = file.split("\n");

  // Search for the person in the array of lines
  for (const line of lines) {
    // Skip empty lines
    if (line === "") {
      continue;
    }

    // Load the line into a dictionary
    const person: Person = JSON.parse(line);

    // Check if the identity card matches the one in the file
    if (person.identity_card === identityCard) {
      return person;
    }
  }

  // Person not found
  return undefined;
}

async function main(): Promise<void> {
  // Accept input for the person's details
  const firstName = prompt("Enter the person's first name: ");
  const lastName = prompt("Enter the person's last name: ");
  const age = prompt("Enter the person's age: ");
  const identityCard = prompt("Enter the person's identity card: ");

  // Create a dictionary to store the person's details
  const person: Person = {
    first_name: firstName,
    last_name: lastName,
    age: age,
    identity_card: identityCard,
  };

  // Save the person's details to the JSON file
  await savePerson(person);

  // Prompt the user to search for a saved person
  let search = prompt("Enter Y to search for a saved person, or N to exit: ");

  while (search.toLowerCase() === "y") {
    // Accept input for the identity card to search for
    const identityCard = prompt("Enter the identity card to search for: ");

    // Search for the person
    const person = await searchPerson(identityCard);

    if (person) {
      console.log("Person found:");
      console.log(`Name: ${person.first_name} ${person.last_name}`);
      console.log(`Age: ${person.age}`);
      console.log(`Identity card: ${person.identity_card}`);
    } else {
      console.log("Person not found.");
    }

    // Prompt the user to search again or exit
    search = prompt("Enter Y to search again, or N to exit: ");
  }

  console.log("Exiting program.");
}
main();
