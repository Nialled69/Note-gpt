import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "../components/UserGreetText";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

export default async function Home() {

  const supabase = createClient();
  const {data: { user },} = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-6">
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <UserGreetText />
          <LoginButton />
        </div>

        {user ? (
          <>
            <NoteForm userId={user.id} />
            <h2 className="text-2xl font-semibold pt-4 mt-2 mb-2">📝 Your Notes</h2>
            <NoteList userId={user.id} />
          </>
        ) : (
          <p className="text-center text-gray-500">
            Please log in to add and view your notes.
          </p>
        )}
      </div>
    </main>
  );
}