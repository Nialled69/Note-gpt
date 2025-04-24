// User Greeting at the top-leftmost side of the page.
// still have'nt decided if to put image there or not
// supabase public.profiles table already has one avatar url attribute if needed in future

"use client";
import { createClient } from "../../utils/supabase/client";
import React, { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

const UserGreetText = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      // console.log(user)
    };
    fetchUser();
  }, [supabase.auth]);
  const hour = new Date().getHours();
    if (user !== null) {
      return (    // Sending the user greeting like good morning/good evening based on current time. (Doesn't work well in my pc because my node.js time isn't correct)
        <p className="text-sm flex items-center px-2 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800/40 border border-gray-300 dark:border-neutral-800">
          Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"} &nbsp;
          <code className="font-mono font-bold">
             {user.user_metadata.full_name.split(" ")[0] ?? "user"}
          </code>
        </p>
      );
    }
  return (  //same message but without user name if not logged in
    <p className="text-sm flex items-center px-2 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800/40 border border-gray-300 dark:border-neutral-800">
      &nbsp;
      <code className="font-mono font-bold">Good {hour<12 ? "morning" : hour<17 ? "afternoon" : "evening"}</code>
    </p>
  );
};

export default UserGreetText;