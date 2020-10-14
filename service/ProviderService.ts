import { IProviderService } from './IProviderService';
import { injectable, inject } from 'inversify';
import TYPES from '../container/types';
import { IProvider } from '../models/IProvider';

@injectable()
export default class ProviderService implements IProviderService {
  constructor(@inject(TYPES.IProviderRepository) private providerRepository: IProviderService) {}

  public async healthCheck(): Promise<string> {
    const isHealth = await this.providerRepository.healthCheck();
    if (isHealth) {
      return 'I am Alive!';
    }
    return 'I am Dead!';
  }

  public async create(provider: IProvider): Promise<boolean> {
    const res = await this.providerRepository.create(provider);
    return res;
  }

  public async read(id: string): Promise<IProvider> {
    const res = await this.providerRepository.read(id);
    return res;
  }

  public async totalISPProvider(): Promise<number> {
    const res = await this.providerRepository.totalISPProvider();
    return res;
  }

  public async sortByRating(): Promise<IProvider[]> {
    const res = await this.providerRepository.sortByRating();
    return res;
  }

  public async sortByPrice(): Promise<IProvider[]> {
    const res = await this.providerRepository.sortByPrice();
    return res;
  }

  public async search(searchAttribute: string | number): Promise<IProvider[]> {
    const res = await this.providerRepository.search(searchAttribute);
    return res;
  }
}
