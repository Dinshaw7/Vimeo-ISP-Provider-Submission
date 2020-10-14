import { IProvider } from '../models/IProvider';

export interface IProviderRepository {
  healthCheck(): Promise<boolean>;
  create(provider: IProvider): Promise<boolean>;
  read(id: string): Promise<IProvider>;
  totalISPProvider(): Promise<number>;
  sortByRating(): Promise<IProvider[]>;
  sortByPrice(): Promise<IProvider[]>;
  search(searchAttribute: string | number): Promise<IProvider[]>;
}
