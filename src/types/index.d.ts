declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
export enum status {
  'IN_PROCESS' = 'IN_PROCESS',
  'MANUAL_APPROVED' = 'MANUAL_APPROVED',
  'MANUAL_REPROVED' = 'MANUAL_REPROVED',
  'DIRECT_APPROVED' = 'DIRECT_APPROVED',
  'DIRECT_REPROVED' = 'DIRECT_REPROVED',
  'CANCELED' = 'CANCELED',
  'PENDING' = 'PENDING',
  'MANUAL_APPROVE' = 'MANUAL_APPROVE',
}
export enum sex {
  'M' = 'M',
  'F' = 'F',
}
