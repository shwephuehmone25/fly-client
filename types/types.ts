export interface Hotel {
  id: number;
  name: string;
  location: string;
  total_rooms: number;
  remaining_rooms: number;
  rating: string;
  created_at: string;
  updated_at: string;
}

export interface HotelResponse {
  message: string;
  data: {
    current_page: number;
    from: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    data: Hotel[];
  };
  links: {
    label: string;
    url: string | null;
    active: boolean;
  }[];
  meta: {
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Flight {
  id: number;
  flight_number: string;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  total_seats: number;
  available_seats: number;
  price: number;
  status: 'scheduled' | 'delayed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface FlightResponse {
  message: string;
  data: {
    current_page: number;
    from: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    data: Flight[];
  };
  links: {
    label: string;
    url: string | null;
    active: boolean;
  }[];
  meta: {
    last_page: number;
    per_page: number;
    total: number;
  };
}
