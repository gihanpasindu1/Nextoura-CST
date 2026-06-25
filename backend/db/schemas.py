from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

# Group Members
class GroupMemberBase(BaseModel):
    name: str
    passport_number: str
    email: Optional[str] = None

class GroupMemberCreate(GroupMemberBase):
    pass

class GroupMember(GroupMemberBase):
    id: int
    main_tourist_id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Itineraries
class ItineraryBase(BaseModel):
    day_number: int
    day_title: str
    stop_order: int
    location_name: str
    is_hotel_stay: bool = False
    driver_status: Optional[str] = None
    hotel_id: Optional[int] = None

class ItineraryCreate(ItineraryBase):
    pass

class Itinerary(ItineraryBase):
    id: int
    tourist_id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Tourists
class TouristBase(BaseModel):
    name: str
    passport_number: str
    email: str
    pax_count: int
    country: str
    country_code: str
    arrival_date: date
    duration: str
    agent_id: Optional[int] = None
    driver_id: Optional[int] = None

class TouristCreate(TouristBase):
    group_members: Optional[List[GroupMemberCreate]] = []
    itineraries: Optional[List[ItineraryCreate]] = []

class Tourist(TouristBase):
    id: int
    created_at: datetime
    group_members: List[GroupMember] = []
    itineraries: List[Itinerary] = []
    class Config:
        from_attributes = True
