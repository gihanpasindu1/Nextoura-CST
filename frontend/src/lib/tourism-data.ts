export type TourStatus = "Active" | "Upcoming" | "Completed" | "On Tour" | "Cancelled";

export interface GroupMember {
  name: string;
  passport: string;
  phone?: string;
  email?: string;
}

export interface ItineraryDestination {
  location: string;
  activities: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities?: string[];
  hotel: string;
  hotelEmail: string;
  location?: string;
  destinations?: ItineraryDestination[];
}

export interface Tourist {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO for flag emoji
  pax: number;
  currentLocation: string;
  duration: string;
  status: TourStatus;
  passport: string;
  phone: string;
  email: string;
  driver: string;
  agent: string;
  arrival: string;
  departure?: string;
  group: GroupMember[];
  itinerary: ItineraryDay[];
  isLead?: boolean;
}

export const AGENTS = [
  { id: "all", name: "All Agents", email: "", region: "" },
  { id: "a1", name: "Priya Fernando", email: "priya@horizon.travel", region: "South Asia", clients: 6 },
  { id: "a2", name: "Marcus Whitfield", email: "marcus@horizon.travel", region: "Europe", clients: 4 },
  { id: "a3", name: "Yuki Tanaka", email: "yuki@horizon.travel", region: "East Asia", clients: 3 },
  { id: "a4", name: "Olivia Bennett", email: "olivia@horizon.travel", region: "Oceania", clients: 2 },
];

export const DRIVERS = ["All Drivers", "Sunil Perera", "Rajesh Kumar", "Nimal Silva", "Kasun Bandara", "Ashan De Silva"];

export const TOURISTS: Tourist[] = [
  {
    id: "t1",
    name: "Hans Müller",
    country: "Germany",
    countryCode: "DE",
    pax: 4,
    currentLocation: "Kandy",
    duration: "10 Days",
    status: "Active",
    passport: "C8XYZ4421",
    phone: "+49 151 2345 6789",
    email: "hans.mueller@gmx.de",
    driver: "Sunil Perera",
    agent: "Marcus Whitfield",
    arrival: "2026-06-18",
    group: [
      { name: "Anna Müller", passport: "C8XYZ4422", phone: "+49 151 2345 6790", email: "anna.m@gmx.de" },
      { name: "Lukas Müller", passport: "C8XYZ4423" },
      { name: "Mia Müller", passport: "C8XYZ4424" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", activities: ["Airport pickup (BIA)", "Transfer to Negombo"], hotel: "Heritance Negombo", hotelEmail: "reservations@heritancenegombo.com", location: "Negombo" },
      { day: 2, title: "Cultural Triangle", activities: ["Transfer to Sigiriya", "Sigiriya Rock Fortress climb"], hotel: "Aliya Resort & Spa", hotelEmail: "info@aliyaresort.com", location: "Sigiriya" },
      { day: 3, title: "Ancient City of Polonnaruwa", activities: ["Polonnaruwa cycling tour", "Minneriya elephant safari"], hotel: "Aliya Resort & Spa", hotelEmail: "info@aliyaresort.com", location: "Sigiriya" },
      { day: 4, title: "Temple of the Tooth", activities: ["Transfer to Kandy", "Temple of the Sacred Tooth Relic", "Cultural dance show"], hotel: "Earl's Regency", hotelEmail: "reservations@earlsregency.com", location: "Kandy" },
      { day: 5, title: "Tea Country", activities: ["Royal Botanical Gardens", "Transfer to Nuwara Eliya via tea plantations"], hotel: "Grand Hotel Nuwara Eliya", hotelEmail: "info@grandhotelnuwaraeliya.com", location: "Nuwara Eliya" },
      { day: 6, title: "Scenic Train to Ella", activities: ["Train ride Nanu Oya → Ella", "Nine Arches Bridge"], hotel: "98 Acres Resort", hotelEmail: "reservations@98acresresort.com", location: "Ella" },
      { day: 7, title: "Yala Safari", activities: ["Transfer to Yala", "Afternoon jeep safari"], hotel: "Cinnamon Wild Yala", hotelEmail: "reservations.wildyala@cinnamonhotels.com", location: "Yala" },
    ],
  },
  {
    id: "t2",
    name: "Sophie Laurent",
    country: "France",
    countryCode: "FR",
    pax: 2,
    currentLocation: "Galle",
    duration: "7 Days",
    status: "Active",
    passport: "19FR88421",
    phone: "+33 6 22 14 87 03",
    email: "s.laurent@orange.fr",
    driver: "Rajesh Kumar",
    agent: "Marcus Whitfield",
    arrival: "2026-06-20",
    group: [{ name: "Julien Laurent", passport: "19FR88422" }],
    itinerary: [
      { day: 1, title: "Arrival & Beach", activities: ["Airport pickup", "Transfer to Bentota"], hotel: "Cinnamon Bey Beruwala", hotelEmail: "reservations.bey@cinnamonhotels.com", location: "Bentota" },
      { day: 2, title: "Madu River Safari", activities: ["Madu River boat safari", "Turtle hatchery visit"], hotel: "Cinnamon Bey Beruwala", hotelEmail: "reservations.bey@cinnamonhotels.com", location: "Bentota" },
      { day: 3, title: "Galle Fort", activities: ["Transfer to Galle", "Dutch Fort walking tour"], hotel: "Jetwing Lighthouse", hotelEmail: "lighthouse@jetwinghotels.com", location: "Galle" },
      { day: 4, title: "Whale Watching", activities: ["Early morning whale watching from Mirissa"], hotel: "Jetwing Lighthouse", hotelEmail: "lighthouse@jetwinghotels.com", location: "Galle" },
    ],
  },
  {
    id: "t3",
    name: "Kenji Watanabe",
    country: "Japan",
    countryCode: "JP",
    pax: 3,
    currentLocation: "En Route",
    duration: "8 Days",
    status: "Active",
    passport: "TR9924118",
    phone: "+81 90 1234 5678",
    email: "k.watanabe@nifty.jp",
    driver: "Nimal Silva",
    agent: "Yuki Tanaka",
    arrival: "2026-06-19",
    group: [
      { name: "Akiko Watanabe", passport: "TR9924119" },
      { name: "Haruto Watanabe", passport: "TR9924120" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Airport pickup", "Rest at Negombo"], hotel: "Jetwing Blue", hotelEmail: "blue@jetwinghotels.com", location: "Negombo" },
      { day: 2, title: "Dambulla Caves", activities: ["Transfer to Dambulla", "Cave Temple tour"], hotel: "Heritance Kandalama", hotelEmail: "reservations@heritancekandalama.com", location: "Dambulla" },
      { day: 3, title: "Sigiriya Rock", activities: ["Sigiriya climb at dawn", "Village tour"], hotel: "Heritance Kandalama", hotelEmail: "reservations@heritancekandalama.com", location: "Dambulla" },
    ],
  },
  {
    id: "t4",
    name: "Emma Wilson",
    country: "Australia",
    countryCode: "AU",
    pax: 2,
    currentLocation: "Ella",
    duration: "12 Days",
    status: "Active",
    passport: "PA3399871",
    phone: "+61 412 998 221",
    email: "emma.wilson@bigpond.com",
    driver: "Kasun Bandara",
    agent: "Olivia Bennett",
    arrival: "2026-06-15",
    group: [{ name: "Jack Wilson", passport: "PA3399872" }],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup & transfer to Colombo"], hotel: "Galle Face Hotel", hotelEmail: "reservations@gallefacehotel.net", location: "Colombo" },
      { day: 2, title: "City Tour", activities: ["Colombo highlights"], hotel: "Galle Face Hotel", hotelEmail: "reservations@gallefacehotel.net", location: "Colombo" },
    ],
  },
  {
    id: "t5",
    name: "Rajesh Sharma",
    country: "India",
    countryCode: "IN",
    pax: 6,
    currentLocation: "Nuwara Eliya",
    duration: "9 Days",
    status: "Active",
    passport: "Z4488210",
    phone: "+91 98212 44109",
    email: "r.sharma@gmail.com",
    driver: "Ashan De Silva",
    agent: "Priya Fernando",
    arrival: "2026-06-17",
    group: [
      { name: "Meera Sharma", passport: "Z4488211" },
      { name: "Aarav Sharma", passport: "Z4488212" },
      { name: "Ishaan Sharma", passport: "Z4488213" },
      { name: "Diya Sharma", passport: "Z4488214" },
      { name: "Vivaan Sharma", passport: "Z4488215" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Airport pickup", "Transfer to Kandy"], hotel: "Cinnamon Citadel Kandy", hotelEmail: "reservations.citadel@cinnamonhotels.com", location: "Kandy" },
      { day: 2, title: "Tea Country", activities: ["Transfer to Nuwara Eliya", "Pedro Tea Estate"], hotel: "Heritance Tea Factory", hotelEmail: "reservations@heritanceteafactory.com", location: "Nuwara Eliya" },
    ],
  },
  {
    id: "t6",
    name: "Oliver Smith",
    country: "United Kingdom",
    countryCode: "GB",
    pax: 2,
    currentLocation: "Colombo",
    duration: "6 Days",
    status: "Upcoming",
    passport: "GBR557812",
    phone: "+44 7700 900 421",
    email: "oliver.smith@btinternet.com",
    driver: "Sunil Perera",
    agent: "Marcus Whitfield",
    arrival: "2026-07-02",
    group: [{ name: "Charlotte Smith", passport: "GBR557813" }],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Airport pickup"], hotel: "Shangri-La Colombo", hotelEmail: "slcb@shangri-la.com", location: "Colombo" },
    ],
  },
  {
    id: "t7",
    name: "Isabella Rossi",
    country: "Italy",
    countryCode: "IT",
    pax: 4,
    currentLocation: "Sigiriya",
    duration: "11 Days",
    status: "Active",
    passport: "YA8821330",
    phone: "+39 333 421 8870",
    email: "isabella.rossi@libero.it",
    driver: "Rajesh Kumar",
    agent: "Marcus Whitfield",
    arrival: "2026-06-14",
    group: [
      { name: "Matteo Rossi", passport: "YA8821331" },
      { name: "Sofia Rossi", passport: "YA8821332" },
      { name: "Leonardo Rossi", passport: "YA8821333" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup → Negombo"], hotel: "Jetwing Blue", hotelEmail: "blue@jetwinghotels.com", location: "Negombo" },
      { day: 2, title: "Sigiriya", activities: ["Transfer to Sigiriya"], hotel: "Aliya Resort & Spa", hotelEmail: "info@aliyaresort.com", location: "Sigiriya" },
    ],
  },
  {
    id: "t8",
    name: "Liam O'Connor",
    country: "Ireland",
    countryCode: "IE",
    pax: 2,
    currentLocation: "Yala",
    duration: "8 Days",
    status: "Active",
    passport: "IE7798220",
    phone: "+353 87 661 2003",
    email: "liam.oconnor@eircom.net",
    driver: "Kasun Bandara",
    agent: "Marcus Whitfield",
    arrival: "2026-06-16",
    group: [{ name: "Saoirse O'Connor", passport: "IE7798221" }],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup → Yala"], hotel: "Cinnamon Wild Yala", hotelEmail: "reservations.wildyala@cinnamonhotels.com", location: "Yala" },
    ],
  },
  {
    id: "t9",
    name: "Chen Wei",
    country: "China",
    countryCode: "CN",
    pax: 5,
    currentLocation: "Bentota",
    duration: "7 Days",
    status: "Active",
    passport: "EH8821109",
    phone: "+86 138 0013 8000",
    email: "chen.wei@163.com",
    driver: "Ashan De Silva",
    agent: "Yuki Tanaka",
    arrival: "2026-06-19",
    group: [
      { name: "Li Na", passport: "EH8821110" },
      { name: "Chen Yu", passport: "EH8821111" },
      { name: "Chen Lin", passport: "EH8821112" },
      { name: "Wang Mei", passport: "EH8821113" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup → Bentota"], hotel: "Centara Ceysands", hotelEmail: "ccrs@chr.co.th", location: "Bentota" },
    ],
  },
  {
    id: "t10",
    name: "Carlos Mendoza",
    country: "Spain",
    countryCode: "ES",
    pax: 3,
    currentLocation: "—",
    duration: "10 Days",
    status: "Completed",
    passport: "ES4421887",
    phone: "+34 612 887 002",
    email: "c.mendoza@telefonica.es",
    driver: "Sunil Perera",
    agent: "Marcus Whitfield",
    arrival: "2026-05-22",
    group: [
      { name: "Lucia Mendoza", passport: "ES4421888" },
      { name: "Diego Mendoza", passport: "ES4421889" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup → Colombo"], hotel: "Cinnamon Grand Colombo", hotelEmail: "reservations.cgc@cinnamonhotels.com", location: "Colombo" },
    ],
  },
  {
    id: "t11",
    name: "Noah Johansson",
    country: "Sweden",
    countryCode: "SE",
    pax: 2,
    currentLocation: "Mirissa",
    duration: "9 Days",
    status: "Active",
    passport: "SE99221103",
    phone: "+46 70 998 4421",
    email: "noah.j@telia.se",
    driver: "Nimal Silva",
    agent: "Priya Fernando",
    arrival: "2026-06-18",
    group: [{ name: "Elsa Johansson", passport: "SE99221104" }],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["Pickup → Mirissa"], hotel: "Weligama Bay Marriott", hotelEmail: "weligamabay@marriott.com", location: "Mirissa" },
    ],
  },
  {
    id: "t12",
    name: "Aisha Al-Mansoori",
    country: "UAE",
    countryCode: "AE",
    pax: 4,
    currentLocation: "Colombo",
    duration: "5 Days",
    status: "Upcoming",
    passport: "AE3398810",
    phone: "+971 50 442 9981",
    email: "aisha.m@emirates.net.ae",
    driver: "Rajesh Kumar",
    agent: "Priya Fernando",
    arrival: "2026-07-08",
    group: [
      { name: "Khalid Al-Mansoori", passport: "AE3398811" },
      { name: "Fatima Al-Mansoori", passport: "AE3398812" },
      { name: "Omar Al-Mansoori", passport: "AE3398813" },
    ],
    itinerary: [
      { day: 1, title: "Arrival", activities: ["VIP pickup"], hotel: "Shangri-La Colombo", hotelEmail: "slcb@shangri-la.com", location: "Colombo" },
    ],
  },
];

export const NOTIFICATIONS = [
  { id: "n1", touristId: "t1", type: "alert", title: "Flight Delay — Hans Müller", body: "Lufthansa LH758 delayed 90 min. Driver Sunil notified.", time: "12 min ago" },
  { id: "n2", touristId: "t7", type: "info", title: "Hotel confirmation received", body: "Aliya Resort confirmed booking for Rossi family.", time: "1 h ago" },
  { id: "n3", touristId: "t9", type: "warn", title: "Visa expiry approaching", body: "Chen Wei visa expires in 4 days.", time: "3 h ago" },
  { id: "n4", touristId: "t8", type: "info", title: "Safari permit issued", body: "Yala permits ready for O'Connor party.", time: "6 h ago" },
  { id: "n5", touristId: "all", type: "alert", title: "Driver swap requested", body: "Kasun unavailable Thu — needs reassignment.", time: "Yesterday" },
];

export function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
