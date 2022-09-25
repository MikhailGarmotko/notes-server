const yup = require("yup");
import { Request, Response, NextFunction } from "express";

export const linkSchema = yup.object({
    body: yup.object({
        name: yup.string().min(2).max(25).required(),
        category: yup.string().oneOf(['Task', 'Idea', 'Random Thought']).required(),
        content: yup.string().required(),
        status: yup.string().oneOf(['active', 'archive']).required(),
    })
});


export const validate = (schema:any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (e:any) {
    return res.status(500).json({ type: e.name, message: e.message });
  }
};
