"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function login(_: unknown, formData: FormData) {  // login logic with email ( General email providers like Gmail, rediffmail, etc)
  const supabase = createClient();  

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data); //sign-in with password without storing password in public tables (stored in auth table i think)

  if (error) {
    console.log(error)
    if (error.message.toLowerCase().includes("email not confirmed")) { //email confirmation check
      return { error: "Please confirm your email" };
    }
    return redirect("/error");
  }

  revalidatePath("/", "layout");
  return redirect("/");
}

export async function signup(_:unknown, formData: FormData) {  //sign-up logic (with general email providers eg. Gmail, Yahoo, etc)
  const supabase = createClient();

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName + " " + lastName}`,
        email: formData.get("email") as string,
      },
    },
  };
  if (data.password.length < 6)
    return {error : "Password length must be atleast 6 characters long"}
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {  //sign-out logic
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/logout");
}

export async function signInWithGoogle() {  // Google sign-up logic
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}