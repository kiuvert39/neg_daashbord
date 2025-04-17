export interface Testimonial {
    name: string;
    position: string;
    text: string;
  }
  
  export interface TeamMember {
    name: string;
    role: string;
    img: string;
    experience: string;
    education: string;
  }
  
  export interface DashboardData {
    images: string[];
    testimonials: Testimonial[];
    teamMembers: TeamMember[];
  }
  