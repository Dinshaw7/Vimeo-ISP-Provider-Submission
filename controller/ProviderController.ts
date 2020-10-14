import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import TYPES from '../container/types';
import { IProviderService } from '../service/IProviderService';
import Provider from '../models/Provider';
import TextToImage from '../utils/TextToImage';

const API_VERSION = 'v1';
@controller(`/${API_VERSION}/provider`)
export default class ProviderController {
  private response: { apiVersion: string; data: any; error: any } = {
    apiVersion: API_VERSION,
    data: {},
    error: {},
  };
  constructor(@inject(TYPES.IProviderService) private providerService: IProviderService) {}

  private static API_Hit_counter: number = 0;

  @httpGet('/healthCheck')
  private async healthCheck(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.healthCheck();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpPost('/create')
  private async create(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      const provider = new Provider(
        req.body.name,
        req.body.price,
        req.body.rating,
        req.body.maxSpeed,
        req.body.contactNo,
        req.body.emailId,
        req.body.minimumPlan,
        req.body.description
      );
      this.response.data = await this.providerService.create(provider);
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/read/:id')
  private async read(
    @requestParam('id') id: string,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.read(id);
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/download/:id')
  private async download(
    @requestParam('id') id: string,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      const data = await this.providerService.read(id);
      this.response.data = (await TextToImage.convert(JSON.stringify(data))) as string;
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/totalISPProvider')
  private async totalISPProvider(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.totalISPProvider();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/totalAPI_Hit')
  private async totalAPI_Hit(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = ProviderController.API_Hit_counter;
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/sortByPrice')
  private async sortByPrice(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.sortByPrice();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/sortByRating')
  private async sortByRating(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.sortByRating();
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }

  @httpGet('/search/:searchAttribute')
  private async search(
    @requestParam('searchAttribute') searchAttribute: string | number,
    @response() res: express.Response
  ): Promise<express.Response> {
    try {
      this.response.data = await this.providerService.search(searchAttribute);
      return res.status(200).send(this.response);
    } catch (error) {
      this.response.error = error.message;
      return res.status(500).send(this.response);
    } finally {
      ProviderController.API_Hit_counter++;
    }
  }
}
