import re

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Add PUT + DELETE for agents after the GET agents endpoint
put_delete_agents = """
@app.put("/api/agents/{agent_id}", response_model=schemas.Agent)
def update_agent(agent_id: uuid.UUID, agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_agent = db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.id == agent_id).first()
    if not db_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    db_agent.agent_name = agent.agent_name
    db_agent.email = agent.email
    db_agent.region = agent.region
    db_agent.company_id = agent.company_id
    db.commit()
    db.refresh(db_agent)
    return db_agent

@app.delete("/api/agents/{agent_id}")
def delete_agent(agent_id: uuid.UUID, db: Session = Depends(get_db)):
    db_agent = db.query(models.ForeignTourAgent).filter(models.ForeignTourAgent.id == agent_id).first()
    if not db_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    db.delete(db_agent)
    db.commit()
    return {"message": "Agent deleted successfully"}

"""

# Insert before the Hotels section
text = text.replace('# ==================== HOTELS ====================', put_delete_agents + '# ==================== HOTELS ====================')

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/main.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Added PUT/DELETE for agents to main.py')
