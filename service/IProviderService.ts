import { IProvider } from '../models/IProvider';

export interface IProviderService {
  healthCheck(): Promise<string>;
  create(provider: IProvider): Promise<boolean>;
  read(id: string): Promise<IProvider>;
  totalISPProvider(): Promise<number>;
  sortByRating(): Promise<IProvider[]>;
  sortByPrice(): Promise<IProvider[]>;
  search(searchAttribute: string | number): Promise<IProvider[]>;
}
