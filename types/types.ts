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
