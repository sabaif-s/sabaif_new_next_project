import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import path

export async function handler(req, res) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Clearing the session manually
    res.clearCookie("next-auth.session-token"); // Clear the JWT session cookie
    res.status(200).json({ message: "Session cleared" });
  } else {
    res.status(404).json({ message: "No session found" });
  }
}
