'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../../../utils/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/');
      } else {
        router.replace('/error');
      }
    };

    checkSession();
  }, [router, supabase]);

  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <Card className="p-6 w-full max-w-sm shadow-xl rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Logging you in, please wait...</p>
        </CardContent>
      </Card>
    </div>
  );
}
