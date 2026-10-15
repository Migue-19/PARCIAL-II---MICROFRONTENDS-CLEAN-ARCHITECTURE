export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  registeredAt: string | Date;
}

export interface RegisterCustomerDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}
