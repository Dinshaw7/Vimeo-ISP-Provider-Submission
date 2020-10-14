import { IProviderRepository } from '../IProviderRepository';
import { injectable } from 'inversify';
import { IProvider } from '../../models/IProvider';
import { Db, ObjectId } from 'mongodb';
import MongoDBConnection from '../../utils/MongoDBConnection';

@injectable()
export default class ProviderRepositoryMongoDbImpl implements IProviderRepository {
  db!: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public async healthCheck(): Promise<boolean> {
    if (this.db === null || this.db === undefined) {
      return false;
    }
    return true;
  }

  public async create(provider: IProvider): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = provider;
      this.db.collection('providers').insertOne(query, (error, insert) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(insert.insertedCount !== 0);
      });
    });
  }
  public async read(id: string): Promise<IProvider> {
    return new Promise((resolve, reject) => {
      const query = { _id: new ObjectId(id) };
      this.db.collection('providers').findOne(query, (error, data) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public async totalISPProvider(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.collection('providers').countDocuments((error, data) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(data);
      });
    });
  }

  public async sortByRating(): Promise<IProvider[]> {
    return new Promise((resolve, reject) => {
      const query = { rating: -1 };
      this.db
        .collection('providers')
        .find({})
        .sort(query)
        .toArray((error, data) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(data);
        });
    });
  }

  public async sortByPrice(): Promise<IProvider[]> {
    return new Promise((resolve, reject) => {
      const query = { price: -1 };
      this.db
        .collection('providers')
        .find({})
        .sort(query)
        .toArray((error, data) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(data);
        });
    });
  }

  public async search(searchAttribute: string | number): Promise<IProvider[]> {
    return new Promise((resolve, reject) => {
      const query = {
        $or: [{ rating: +searchAttribute }, { price: +searchAttribute }, { name: searchAttribute }],
      };
      this.db
        .collection('providers')
        .find(query)
        .toArray((error, data) => {
          if (error) {
            console.error(error.message);
            reject(error);
          }
          resolve(data);
        });
    });
  }
}
