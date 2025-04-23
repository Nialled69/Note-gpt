import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "../components/UserGreetText";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import Footer from "./additional_UI/footer";

export default async function Home() {

  const supabase = createClient();
  const {data: { user },} = await supabase.auth.getUser();

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-start p-4 pt-28 lg:pt-8 gap-6">
      <div className="fixed left-0 top-0 z-10 w-full border-b border-gray-300 bg-white/70 dark:bg-zinc-800/60 backdrop-blur-md px-4 py-3 shadow-sm
                      lg:static lg:border-0 lg:bg-transparent lg:dark:bg-transparent lg:shadow-none lg:px-0 lg:py-0">
        <div className="flex w-full max-w-3xl mx-auto justify-between items-center">
          <div className="flex items-center gap-3">
            {/* <img
              src="/avatar.png"
              alt="Profile Image"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            /> */}
            <UserGreetText />
          </div>
          <LoginButton />
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-4 mt-2 pt-2">
        {user ? (
          <>
            <NoteForm userId={user.id} />
            <h2 className="text-2xl font-semibold pt-4 mt-4 mb-2">📝 Your Notes</h2>
            <NoteList userId={user.id} />
          </>
        ) : (
          <p className="text-center text-gray-500">
            Please log in to add and view your notes.
          </p>
        )}
      </div>
    </main>
    <Footer/>
    </>
  );
}