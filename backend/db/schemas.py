import uuid
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

# ----------------- Companies -----------------
class CompanyBase(BaseModel):
    company_name: str
    email: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Agents -----------------
class AgentBase(BaseModel):
    agent_name: str
    company_id: Optional[uuid.UUID] = None

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Drivers -----------------
class DriverBase(BaseModel):
    name: str
    phone: Optional[str] = None
    company_id: Optional[uuid.UUID] = None

class DriverCreate(DriverBase):
    pass

class Driver(DriverBase):
    id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Hotels -----------------
class HotelBase(BaseModel):
    hotel_name: str
    hotel_email: Optional[str] = None
    phone_number: Optional[str] = None

class HotelCreate(HotelBase):
    pass

class Hotel(HotelBase):
    id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Group Members -----------------
class GroupMemberBase(BaseModel):
    name: str
    passport_number: str
    email: Optional[str] = None

class GroupMemberCreate(GroupMemberBase):
    pass

class GroupMember(GroupMemberBase):
    id: uuid.UUID
    main_tourist_id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Itinerary Destinations -----------------
class ItineraryDestinationBase(BaseModel):
    location_name: str
    activities: Optional[str] = None

class ItineraryDestinationCreate(ItineraryDestinationBase):
    pass

class ItineraryDestination(ItineraryDestinationBase):
    id: uuid.UUID
    itinerary_id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Itineraries -----------------
class ItineraryBase(BaseModel):
    day_number: int
    day_title: str
    stop_order: int
    location_name: str
    is_hotel_stay: bool = False
    driver_status: Optional[str] = None
    hotel_id: Optional[uuid.UUID] = None
    booking_email_sent: bool = False
    confirmation_email_sent: bool = False

class ItineraryCreate(ItineraryBase):
    destinations: Optional[List[ItineraryDestinationCreate]] = []

class Itinerary(ItineraryBase):
    id: uuid.UUID
    tourist_id: uuid.UUID
    created_at: datetime
    destinations: List[ItineraryDestination] = []
    class Config:
        from_attributes = True

# ----------------- Tourists -----------------
class TouristBase(BaseModel):
    name: str
    passport_number: str
    email: str
    pax_count: int
    country: str
    country_code: str
    arrival_date: date
    duration: str
    status: Optional[str] = "Active"
    is_lead: Optional[bool] = False
    agent_id: Optional[uuid.UUID] = None
    driver_id: Optional[uuid.UUID] = None

class TouristCreate(TouristBase):
    group_members: Optional[List[GroupMemberCreate]] = []
    itineraries: Optional[List[ItineraryCreate]] = []

class Tourist(TouristBase):
    id: uuid.UUID
    created_at: datetime
    group_members: List[GroupMember] = []
    itineraries: List[Itinerary] = []
    class Config:
        from_attributes = True

# ----------------- Notifications -----------------
class NotificationBase(BaseModel):
    sender_name: str
    sender_passport: Optional[str] = None
    alert_title: str
    alert_message: str
    is_resolved: bool = False
    notification_type: str = "alert"

class NotificationCreate(NotificationBase):
    tourist_id: Optional[uuid.UUID] = None

class Notification(NotificationBase):
    id: uuid.UUID
    tourist_id: Optional[uuid.UUID] = None
    created_at: datetime
    class Config:
        from_attributes = True
