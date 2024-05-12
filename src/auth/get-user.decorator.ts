import { createParamDecorator } from "@nestjs/common";

export const user = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
})