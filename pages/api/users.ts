// users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../model/user";
import createDbInstance from "../../styles/camperprodb";
import { isCouchDbError } from "../../util/isCouchDbError"; // Import the new utility function

async function getAllUsers(res: NextApiResponse<User[]>) {
  const db = createDbInstance();
  const response = await db.view("users_by_email", "user-view");
  const users = response.rows.map((row) => row.value as User);
  res.status(200).json(users);
}

async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const db = createDbInstance();
  const newUser: User = req.body;

  try {
    const response = await db.insert(newUser);
    if (isCouchDbError(response)) {
      console.error("CouchDB error:", response);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(201).json({ message: `User added with ID: ${response.id}` });
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string }>
) {
  try {
    if (req.method === "GET") {
      await getAllUsers(res);
    } else if (req.method === "POST") {
      await addUser(req, res);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
