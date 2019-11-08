import { Request, Response } from "express";

export * from "./submit";

export const HealthCheck = () => (req?: Request, res: Response): void => {
  res.json({ ok: true });
};
