import {Request, Response} from 'express'

// export class CalcController {
//   handleCalc(req: Request, res: Response) {
//     const num1 = req.query.num1;
//     const num2 = req.query.num2;
//     const sum = num1 + num2;
//     res.render("calculator", {num1, num2, sum});
//   }
// }


// when using current Express Typings 'Request' is more completely typed
// thus "special" value types (unknown, ...) are listed, thus providing
// a reminder to handle these.
// export class CalcController {
//     handleCalc(req:Request, res:Response) {
//       const num1 = parseFloat(req.query.num1);
//       const num2 = parseFloat(req.query.num2);
//       const sum = num1 + num2;
//       res.render("calculator", { num1, num2, sum });
//     }
// }

// with older express typings it was necessary to define custom extension to the types
// e.g. define and use CalcRequest in CalcController
// interface CalcRequest extends Request {
//   body: { num1?: string; num2?: string };
// }
// export class CalcController {
//   handleCalc(req: CalcRequest, res: Response) {...}
//

// "solution"
export class CalcController {
  handleCalc(req: Request, res: Response) : void {
    const num1 = parseFloat(String(req.query.num1 ?? "0"));
    const num2 = parseFloat(String(req.query.num2 ?? "0"));
    const sum = num1 + num2;
    res.render("calculator", {num1, num2, sum});
  }
}

export const calcController = new CalcController();
