const textToImage = require('text-to-image');

export default class TextToImage {
  public static async convert(dataText: string): Promise<string> {
    return new Promise((resolve, reject) => {
      textToImage.generate(dataText).then(function (dataUri: any) {
        resolve(dataUri);
      });
    });
  }
}
