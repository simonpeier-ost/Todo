import {Request, Response} from 'express'
import path from "path";
import fs from "fs";

async function promisedFileData(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

export class StaticController {
  // misconception 1:  fs.readFile is assumed to be synchronous returning error and data
  // async showFile(req: Request, res: Response) {
  //   const filePath = path.join(path.resolve(), 'public', req.params.filename);
  //   const {error, data} = fs.readFile(filePath, 'utf8');
  //   if (!error) {
  //     console.log(filePath, data);
  //   }
  //   res.send(`You requested the file public/${req.params.filename}; Found: ${!error} \n data: \n${data}`);
  // }
  //
  // misconception 2:  error is assumed to be a boolean (detected by TS)
  // misconception 3: res.send outside callback is ok (not detected by TS)
  // async showFile(req: Request, res: Response) {
  //   const filePath = path.join(path.resolve(), 'public', req.params.filename);
  //   let theError = true;
  //   let theData = "";
  //   fs.readFile(filePath, 'utf8', (error, data) => {
  //     if (!error) {
  //       console.log(filePath, data);
  //     }
  //     theError = error;
  //     theData = data;
  //   });
  //   res.send(`You requested the file public/${req.params.filename}; Found: ${!theError} \n data: \n${theData}`);
  // }
  async showFile(req: Request, res: Response) {
    const filePath = path.join(path.resolve(), 'public', req.params.filename);
    try {
      // const data = await promisedFileData(filePath, 'utf8'); //typo; below: corrected
      const data = await promisedFileData(filePath);
      console.log(filePath, data);
      res.send(`You requested the file public/${req.params.filename}; data: \n${data}`);
    } catch (e) {
      res.send(`file not found: public/${req.params.filename}\n${e}`);
    }
  }
}

export const staticController = new StaticController();
