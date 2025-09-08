
export enum CraftType {
  Handloom = 'Handloom',
  Handicraft = 'Handicraft',
}

export interface Artisan {
  id: string;
  fullName: string;
  parentName: string;
  dob: string;
  gender: string;
  aadhaar: string;
  phone: string;
  email: string;
  education: string;
  photo: string | null;
  address: string;
  state: string;
  district: string;
  pincode: string;
  category: string;
  minority: string;
  otherId?: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  craftType: CraftType;
  experience: string;
  training: string;
  trainingDetails?: string;
  certification: string;
}
