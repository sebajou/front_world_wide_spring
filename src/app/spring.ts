export interface SpringComposition {
  elementName: string;
  formula: string;
  quantity: number;
  unity: string;
}

export interface SpringPrice {
  price: number;
  money: string;
  by: string
  country: string
}

export interface SpringLocalisation {
  longitude: number;
  latitude: number;
}

export interface Spring {
  _id: string,
  name: string;
  composition: SpringComposition[];
  description: string;
  brand: string;
  price: SpringPrice[];
  localisation: SpringLocalisation;
  startExploitationDate: Date;
}
