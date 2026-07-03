with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/db/models.py', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'class Driver(Base):\n    __tablename__ = "drivers"\n\n    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)\n    created_at = Column(DateTime(timezone=True), server_default=text("now()"))\n    name = Column(String)\n    phone = Column(String)\n    email = Column(String)\n    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))',
    'class Driver(Base):\n    __tablename__ = "drivers"\n\n    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)\n    created_at = Column(DateTime(timezone=True), server_default=text("now()"))\n    name = Column(String)\n    phone = Column(String)\n    email = Column(String)\n    password = Column(String, nullable=True)\n    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))'
)

with open('c:/Users/Gihan Pasindu/Desktop/CST-Tour-Management-System-/backend/db/models.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated Driver model.")
