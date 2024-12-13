interface Image {
  _id: string;
  url: string;
  id: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  message: string;
  __v: number;
  image: Image;
  link: string;
  id: string;
}
