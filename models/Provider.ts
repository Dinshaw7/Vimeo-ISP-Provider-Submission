import { IProvider } from './IProvider';

export default class Provider implements IProvider {
  constructor(
    public name: string,
    public price: number,
    public rating: number,
    public maxSpeed: string,
    public contactNo: string,
    public emailId: string,
    public minimumPlan: number,
    public description: string
  ) {}
}
