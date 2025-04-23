"use client";
import { createClient } from "../../utils/supabase/client";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user)
    };
    fetchUser();
  }, []);
  const hour = new Date().getHours();
    if (user !== null) {
      return (
        <p className="text-sm flex items-center px-2 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800/40 border border-gray-300 dark:border-neutral-800">
          Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"} &nbsp;
          <code className="font-mono font-bold">
             {user.user_metadata.full_name.split(" ")[0] ?? "user"}
          </code>
        </p>
      );
    }
  return (
    <p className="text-sm flex items-center px-2 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800/40 border border-gray-300 dark:border-neutral-800">
      &nbsp;
      <code className="font-mono font-bold">Good {hour<12 ? "morning" : hour<17 ? "afternoon" : "evening"}</code>
    </p>
  );
};

export default UserGreetText;