with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Imports
text = text.replace('import { createFileRoute } from "@tanstack/react-router";', 'import { createFileRoute, useRouter } from "@tanstack/react-router";\nimport { supabase } from "@/lib/supabase";')

# 2. State & Effect
old_state = '  const [agents, setAgents] = useState<any[]>([]);\n  const [drivers, setDrivers] = useState<any[]>([]);'
new_state = '''  const [agents, setAgents] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
text = text.replace(old_state, new_state)

# 3. Loading check
old_return = '  }, [touristsList]);\n\n  return ('
new_return = '''  }, [touristsList]);

  if (isLoadingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return ('''
text = text.replace(old_return, new_return)

# 4. Sign Out button
old_sidebar = '        <div className="mt-auto p-4">\n          <div className="flex items-center justify-between text-xs text-muted-foreground">'
new_sidebar = '''        <div className="mt-auto p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start text-sm font-medium h-9" onClick={async () => {
            await supabase.auth.signOut();
            toast.success("Signed out successfully");
          }}>
            <Building2 className="mr-2 h-4 w-4" />
            Sign out
          </Button>
          <div className="flex items-center justify-between text-xs text-muted-foreground">'''
text = text.replace(old_sidebar, new_sidebar)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done injecting auth logic')
