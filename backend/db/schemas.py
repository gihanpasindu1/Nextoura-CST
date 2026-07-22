import uuid
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

# ----------------- Companies -----------------
class CompanyBase(BaseModel):
    company_name: str
    email: Optional[str] = None
    auth_user_id: Optional[uuid.UUID] = None
    ceo_name: Optional[str] = None
    phone_numbers: Optional[List[str]] = []
    logo_url: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    company_name: Optional[str] = None
    email: Optional[str] = None
    ceo_name: Optional[str] = None
    phone_numbers: Optional[List[str]] = None
    logo_url: Optional[str] = None

class Company(CompanyBase):
    id: uuid.UUID
    created_at: datetime
    class Config:
        from_attributes = True

# ----------------- Agents -----------------
class AgentBase(BaseModel):
    agent_name: str
    email: Optional[str] = None
    region: Optional[str] = None
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
    email: Optional[str] = None
    password: Optional[str] = None
    company_id: Optional[uuid.UUID] = None

class DriverCreate(DriverBase):
    password: Optional[str] = None

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
    company_id: Optional[uuid.UUID] = None

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
    driver_status: Optional[str] = "Pending"

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
    driver_status: Optional[str] = "Pending"
    hotel_driver_status: Optional[str] = "Pending"
    hotel_id: Optional[uuid.UUID] = None
    booking_email_sent: bool = False
    confirmation_email_sent: bool = False

class ItineraryCreate(ItineraryBase):
    hotel_name: Optional[str] = None
    hotel_email: Optional[str] = None
    destinations: Optional[List[ItineraryDestinationCreate]] = []

class Itinerary(ItineraryBase):
    id: uuid.UUID
    tourist_id: uuid.UUID
    created_at: datetime
    hotel: Optional[Hotel] = None
    destinations: List[ItineraryDestination] = []
    class Config:
        from_attributes = True


# ----------------- Tourists -----------------
class TouristBase(BaseModel):
    name: str
    passport_number: str
    email: str
    phone: Optional[str] = None
    pax_count: int
    country: str
    country_code: str
    arrival_date: date
    departure_date: Optional[date] = None
    duration: str
    status: Optional[str] = "Active"
    is_lead: Optional[bool] = False
    agent_id: Optional[uuid.UUID] = None
    driver_id: Optional[uuid.UUID] = None
    company_id: Optional[uuid.UUID] = None

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
    company_id: Optional[uuid.UUID] = None

class NotificationCreate(NotificationBase):
    tourist_id: Optional[uuid.UUID] = None

class Notification(NotificationBase):
    id: uuid.UUID
    tourist_id: Optional[uuid.UUID] = None
    created_at: datetime
    class Config:
        from_attributes = True
