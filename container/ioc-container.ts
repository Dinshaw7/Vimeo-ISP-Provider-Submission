import 'reflect-metadata';
import { Container } from 'inversify';
import { IProviderRepository } from '../dao/IProviderRepository';
import TYPES from './types';
import ProviderRepositoryMongoDbImpl from '../dao/MongoDb/ProviderRepositoryMongoDbImpl';
import ProviderService from '../service/ProviderService';
import { IProviderService } from '../service/IProviderService';

const container = new Container();
container.bind<IProviderRepository>(TYPES.IProviderRepository).to(ProviderRepositoryMongoDbImpl);

container.bind<IProviderService>(TYPES.IProviderService).to(ProviderService);

export default container;
