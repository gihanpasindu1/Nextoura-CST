import os

path = 'c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

old_auth = '''  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoadingAuth(false);
      if (!session) {
        router.navigate({ to: "/login" });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.navigate({ to: "/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);'''

new_auth = '''  useEffect(() => {
    const checkOnboarding = async (userSession: any) => {
      try {
        const res = await fetch(`http://localhost:8000/api/companies/me?user_id=${userSession.user.id}`);
        if (res.status === 404) {
          router.navigate({ to: "/onboarding" });
        } else if (!res.ok) {
          console.error("Failed to fetch company profile");
        }
      } catch (err) {
        console.error(err);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        setIsLoadingAuth(false);
        router.navigate({ to: "/login" });
      } else {
        checkOnboarding(session).finally(() => setIsLoadingAuth(false));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.navigate({ to: "/login" });
      } else {
        checkOnboarding(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);'''

text = text.replace(old_auth, new_auth)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print('Done injecting onboarding check')
