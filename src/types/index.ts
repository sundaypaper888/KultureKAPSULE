export type Category = 
  | 'Hip-Hop' 
  | 'Rock' 
  | 'Classical' 
  | 'Movie Scenes' 
  | 'Quotes' 
  | 'Psychedelic/Original Art' 
  | 'Top 40s';

export type ProductType = 'single' | 'triptych';

export interface Product {
  id: string;
  title: string;
  artist?: string;
  description: string;
  price: number;
  category: Category;
  type: ProductType;
  imageUrl: string;
  dimensions: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
