import { v4 as uuidv4 } from "uuid";
import { User } from "./model/user";
import createDbInstance from "./util/camperprodb";

const db = createDbInstance();

// Generate 10 test users
for (let i = 0; i < 10; i++) {
  const user: User = {
    _id: `user:${uuidv4()}`,
    type: "user",
    first_name: `User${i}`,
    last_name: `Test${i}`,
    email: `user${i}@example.com`,
    password: "hashed_password",
    phone_number: "123-456-7890",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _rev: "",
    username: "",
  };

  // Save the user to the database
  db.insert(user).then((response) =>
    console.log(`Created user: ${response.id}`)
  );
}
