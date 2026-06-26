import re

def refactor_models():
    path = "db/models.py"
    with open(path, "r") as f:
        content = f.read()

    # Add imports
    content = content.replace(
        "from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, DateTime, text",
        "import uuid\nfrom sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, DateTime, text\nfrom sqlalchemy.dialects.postgresql import UUID"
    )

    # Primary keys
    content = content.replace(
        "id = Column(Integer, primary_key=True, index=True)",
        "id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)"
    )

    # Foreign keys
    content = re.sub(
        r'Column\(Integer,\s*ForeignKey\((.*?)\)\)',
        r'Column(UUID(as_uuid=True), ForeignKey(\1))',
        content
    )

    # Update TourItinerary with new columns
    if "booking_email_sent" not in content:
        content = content.replace(
            'tourist = relationship("ForeignTourist", back_populates="itineraries")',
            'booking_email_sent = Column(Boolean, default=False)\n    confirmation_email_sent = Column(Boolean, default=False)\n    \n    tourist = relationship("ForeignTourist", back_populates="itineraries")\n    destinations = relationship("ItineraryDestination", back_populates="itinerary")'
        )

    # Update ForeignTourist with new columns
    if "status = Column(String)" not in content:
        content = content.replace(
            'duration = Column(String)',
            'duration = Column(String)\n    status = Column(String)\n    is_lead = Column(Boolean, default=False)'
        )

    # Add ItineraryDestination table
    if "class ItineraryDestination" not in content:
        dest_class = """

class ItineraryDestination(Base):
    __tablename__ = "itinerary_destinations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    itinerary_id = Column(UUID(as_uuid=True), ForeignKey("tour_itineraries.id", ondelete="CASCADE"))
    location_name = Column(String)
    activities = Column(String)
    
    itinerary = relationship("TourItinerary", back_populates="destinations")
"""
        content = content.replace(
            'class UrgentAlert(Base):',
            dest_class.strip() + '\n\nclass UrgentAlert(Base):'
        )

    # Update UrgentAlert with notification_type
    if "notification_type" not in content:
        content = content.replace(
            'is_resolved = Column(Boolean, default=False)',
            'is_resolved = Column(Boolean, default=False)\n    notification_type = Column(String, default="alert")'
        )

    with open(path, "w") as f:
        f.write(content)

if __name__ == "__main__":
    refactor_models()
