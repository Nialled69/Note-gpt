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
    <main className="flex min-h-screen flex-col items-center justify-start p-4 pt-28 lg:pt-8 gap-6">
      <div className="fixed left-0 top-0 z-10 flex w-full max-w-3xl justify-between items-center border-b border-gray-300 bg-white/70 dark:bg-zinc-800/60 backdrop-blur-md px-4 py-3 shadow-sm lg:static lg:rounded-xl lg:border lg:bg-gray-100 lg:dark:bg-zinc-800/40 lg:px-6 lg:py-4">
        <UserGreetText />
        <LoginButton />
      </div>
      <div className="w-full max-w-3xl space-y-4">
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