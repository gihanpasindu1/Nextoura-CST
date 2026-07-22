import uuid
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, DateTime, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .database import Base

class Company(Base):
    __tablename__ = "companies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    auth_user_id = Column(UUID(as_uuid=True), unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    company_name = Column(String)
    email = Column(String)
    ceo_name = Column(String)
    phone_numbers = Column(String)
    logo_url = Column(String, nullable=True)

class ForeignTourAgent(Base):
    __tablename__ = "foreign_tour_agents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    agent_name = Column(String)
    email = Column(String)
    region = Column(String)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    name = Column(String)
    phone = Column(String)
    email = Column(String, nullable=True)
    password = Column(String, nullable=True)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    hotel_name = Column(String)
    hotel_email = Column(String)
    phone_number = Column(String)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))

class ForeignTourist(Base):
    __tablename__ = "foreign_tourists"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    name = Column(String)
    passport_number = Column(String)
    phone = Column(String)
    email = Column(String)
    pax_count = Column(Integer)
    agent_id = Column(UUID(as_uuid=True), ForeignKey("foreign_tour_agents.id"))
    driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"))
    country = Column(String)
    country_code = Column(String)
    arrival_date = Column(Date)
    departure_date = Column(Date, nullable=True)
    duration = Column(String)
    status = Column(String)
    is_lead = Column(Boolean, default=False)
    booking_email_sent = Column(Boolean, default=False)
    confirmation_email_sent = Column(Boolean, default=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))
    
    group_members = relationship("TouristGroupMember", back_populates="main_tourist")
    itineraries = relationship("TourItinerary", back_populates="tourist")

class TouristGroupMember(Base):
    __tablename__ = "tourist_group_members"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    name = Column(String)
    passport_number = Column(String)
    email = Column(String)
    main_tourist_id = Column(UUID(as_uuid=True), ForeignKey("foreign_tourists.id"))
    
    main_tourist = relationship("ForeignTourist", back_populates="group_members")

class TourItinerary(Base):
    __tablename__ = "tour_itineraries"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    day_number = Column(Integer)
    day_title = Column(String)
    stop_order = Column(Integer)
    location_name = Column(String)
    is_hotel_stay = Column(Boolean)
    driver_status = Column(String, default="Pending")
    hotel_driver_status = Column(String, default="Pending")
    tourist_id = Column(UUID(as_uuid=True), ForeignKey("foreign_tourists.id"))
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id"))
    
    booking_email_sent = Column(Boolean, default=False)
    confirmation_email_sent = Column(Boolean, default=False)
    
    tourist = relationship("ForeignTourist", back_populates="itineraries")
    destinations = relationship("ItineraryDestination", back_populates="itinerary")
    hotel = relationship("Hotel")

class ItineraryDestination(Base):
    __tablename__ = "itinerary_destinations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    itinerary_id = Column(UUID(as_uuid=True), ForeignKey("tour_itineraries.id", ondelete="CASCADE"))
    location_name = Column(String)
    activities = Column(String)
    driver_status = Column(String, default="Pending")
    
    itinerary = relationship("TourItinerary", back_populates="destinations")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    type = Column(String)
    title = Column(String)
    body = Column(String)
    tourist_id = Column(UUID(as_uuid=True), ForeignKey("foreign_tourists.id"), nullable=True)
    resolved = Column(Boolean, default=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))

class UrgentAlert(Base):
    __tablename__ = "urgent_alerts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    tourist_id = Column(UUID(as_uuid=True), ForeignKey("foreign_tourists.id"), nullable=True)
    sender_name = Column(String)
    sender_passport = Column(String)
    alert_title = Column(String)
    alert_message = Column(String)
    is_resolved = Column(Boolean, default=False)
    notification_type = Column(String, default="alert")
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"))
