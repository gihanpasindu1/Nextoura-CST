import re

def refactor_frontend():
    with open("c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx", "r") as f:
        content = f.read()

    # 1. Add imports
    content = content.replace('import { useState, useMemo } from "react";', 'import { useState, useMemo, useEffect } from "react";')

    # 2. Update the initial state
    old_state = """  const [touristsList, setTouristsList] = useState(TOURISTS);
  const [notifications, setNotifications] = useState<{ id: string; touristId: string; type: string; title: string; body: string; time: string; resolved?: boolean }[]>(NOTIFICATIONS);"""

    new_state = """  const [touristsList, setTouristsList] = useState<Tourist[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; touristId: string; type: string; title: string; body: string; time: string; resolved?: boolean }[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const [touristsRes, agentsRes, driversRes, notifsRes] = await Promise.all([
        fetch("http://localhost:8000/api/tourists"),
        fetch("http://localhost:8000/api/agents"),
        fetch("http://localhost:8000/api/drivers"),
        fetch("http://localhost:8000/api/notifications")
      ]);
      const touristsData = await touristsRes.json();
      const agentsData = await agentsRes.json();
      const driversData = await driversRes.json();
      const notifsData = await notifsRes.json();

      setAgents(agentsData);
      setDrivers(driversData);

      const agentMap: Record<string, string> = {};
      agentsData.forEach((a: any) => agentMap[a.id] = a.agent_name || a.name);
      const driverMap: Record<string, string> = {};
      driversData.forEach((d: any) => driverMap[d.id] = d.name);

      const mappedTourists = touristsData.map((t: any) => ({
        id: t.id,
        name: t.name,
        country: t.country,
        countryCode: t.country_code,
        passport: t.passport_number,
        phone: t.phone || "",
        email: t.email,
        pax: t.pax_count,
        arrival: t.arrival_date,
        duration: t.duration,
        status: t.status,
        agent: agentMap[t.agent_id] || "All Agents",
        driver: driverMap[t.driver_id] || "All Drivers",
        group: t.group_members?.map((g: any) => ({ name: g.name, passport: g.passport_number, email: g.email })) || [],
        itinerary: t.itineraries?.map((i: any) => ({
          day: i.day_number,
          title: i.day_title,
          hotel: i.hotel_id,
          destinations: i.destinations?.map((d: any) => ({ location: d.location_name, activities: d.activities })) || []
        })) || [],
        isLead: t.is_lead
      }));
      setTouristsList(mappedTourists);
      
      const mappedNotifs = notifsData.map((n: any) => ({
        id: n.id,
        touristId: n.tourist_id,
        type: n.notification_type,
        title: n.alert_title,
        body: n.alert_message,
        time: n.created_at,
        resolved: n.is_resolved
      }));
      setNotifications(mappedNotifs);
    } catch (e) {
      console.error("Failed to load backend data", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);"""

    content = content.replace(old_state, new_state)

    # Replace AGENTS.find with agents.find
    content = content.replace("AGENTS.find(", "agents.find(")
    content = content.replace("AGENTS.map", "agents.map")
    content = content.replace("DRIVERS.map", "drivers.map")

    # Update handleAddTourist
    old_add = """  const handleAddTourist = (tourist: Tourist) => {
    if (tourist.id) {
      setTouristsList(touristsList.map(t => t.id === tourist.id ? tourist : t));
      toast.success("Client updated successfully!");
    } else {
      const newTourist = { ...tourist, id: `t${Date.now()}` };
      setTouristsList([newTourist, ...touristsList]);
      setSelectedId(newTourist.id);
      toast.success(addClientMode === "lead" ? "Lead created successfully!" : "Client created successfully!");
    }
  };"""

    new_add = """  const handleAddTourist = async (tourist: Tourist) => {
    try {
      const payload = {
        name: tourist.name,
        passport_number: tourist.passport,
        email: tourist.email,
        pax_count: tourist.pax,
        country: tourist.country,
        country_code: tourist.countryCode,
        arrival_date: tourist.arrival || new Date().toISOString().split('T')[0],
        duration: tourist.duration,
        status: tourist.status,
        is_lead: addClientMode === "lead",
        agent_id: agents.find(a => (a.agent_name || a.name) === tourist.agent)?.id || null,
        driver_id: drivers.find(d => d.name === tourist.driver)?.id || null,
        group_members: tourist.group?.map(g => ({ name: g.name, passport_number: g.passport, email: g.email || "" })) || [],
        itineraries: tourist.itinerary?.map(i => ({
          day_number: i.day || 1,
          day_title: i.title || "",
          stop_order: 1,
          location_name: "TBD",
          destinations: i.destinations?.map(d => ({ location_name: d.location, activities: d.activities || "" })) || []
        })) || []
      };

      await fetch("http://localhost:8000/api/tourists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      toast.success(addClientMode === "lead" ? "Lead created successfully!" : "Client created successfully!");
      loadData(); // Refresh list
    } catch (e) {
      console.error(e);
      toast.error("Failed to save to database");
    }
  };"""

    content = content.replace(old_add, new_add)

    # Delete
    old_del = """                              <Button variant="outline" size="sm" className="h-8 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10" onClick={() => {
                                setTouristsList(touristsList.filter(t => t.id !== selected.id));
                                setSelectedId(touristsList[0]?.id || "");
                                toast.success("Client deleted successfully!");
                              }}>"""

    new_del = """                              <Button variant="outline" size="sm" className="h-8 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10" onClick={async () => {
                                try {
                                  await fetch(`http://localhost:8000/api/tourists/${selected.id}`, { method: "DELETE" });
                                  toast.success("Client deleted successfully!");
                                  loadData();
                                } catch (e) {
                                  toast.error("Failed to delete from database");
                                }
                              }}>"""
    content = content.replace(old_del, new_del)

    # Add agents and drivers to AddTouristSheet
    content = content.replace(
        '<AddTouristSheet open={isAddClientOpen} onOpenChange={setIsAddClientOpen} onAdd={handleAddTourist} mode={addClientMode} />',
        '<AddTouristSheet open={isAddClientOpen} onOpenChange={setIsAddClientOpen} onAdd={handleAddTourist} mode={addClientMode} agents={agents} drivers={drivers} />'
    )
    content = content.replace(
        '<AddTouristSheet open={!!editingTourist} onOpenChange={(open) => !open && setEditingTourist(undefined)} onAdd={handleAddTourist} mode={addClientMode} initialData={editingTourist} />',
        '<AddTouristSheet open={!!editingTourist} onOpenChange={(open) => !open && setEditingTourist(undefined)} onAdd={handleAddTourist} mode={addClientMode} initialData={editingTourist} agents={agents} drivers={drivers} />'
    )

    with open("c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/frontend/src/routes/index.tsx", "w") as f:
        f.write(content)

if __name__ == "__main__":
    refactor_frontend()
