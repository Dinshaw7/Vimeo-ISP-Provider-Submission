import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import { cyan, green, blue } from 'colors/safe';
import './controller/ProviderController';
import container from './container/ioc-container';
require('dotenv').config();

const port = process.env.SERVER_PORT;

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});
const app = server.build();
// app.use('/assets/images', express.static(__dirname + '/public/')); //localhost:8080/assets/images/art.png -> art.png should be present in /public/
app.listen(port, () => {
  console.log(`${blue('Server ')}${cyan('started on port :')} ${green(port!.toString())}`);
});
exports = app;
module.exports = app;
