import { Request } from 'express';

export type RequestWithCompanyId = Request & { companyId: string };
