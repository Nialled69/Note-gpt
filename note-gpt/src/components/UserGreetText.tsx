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
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Good {hour<12 ? "morning" : hour<17 ? "afternoon" : "evening"} &nbsp;
          <code className="font-mono font-bold">{user.user_metadata.full_name.split(" ")[0] ?? "user"}</code>
        </p>
      );
    }
  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      &nbsp;
      <code className="font-mono font-bold">Good {hour<12 ? "morning" : hour<17 ? "afternoon" : "evening"}</code>
    </p>
  );
};

export default UserGreetText;