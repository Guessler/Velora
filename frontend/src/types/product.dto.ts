export interface ProductDto {
  title: string;
  description: string;
  image: string;
  count: number;
  price: number;
  imageKeys: string[];
  discount?: number | null;
}
