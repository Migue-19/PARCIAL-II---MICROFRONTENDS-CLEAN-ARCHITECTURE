import { Request, Response } from 'express';
import { GetAllCustomersUseCase } from '../../application/use-cases/get-all-customers.use-case';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from '../../application/use-cases/register-customer.use-case';

export class CustomerController {
  constructor(
    private readonly getAllUseCase: GetAllCustomersUseCase,
    private readonly getByIdUseCase: GetCustomerByIdUseCase,
    private readonly registerUseCase: RegisterCustomerUseCase
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const customers = await this.getAllUseCase.execute();
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const customer = await this.getByIdUseCase.execute(id);
      if (!customer) {
        res.status(404).json({ message: `Cliente con ID '${id}' no encontrado` });
        return;
      }
      res.status(200).json(customer);
    } catch (error: any) {
      res.status(400).json({ message: 'Error en la solicitud', error: error.message });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, company } = req.body;
      const created = await this.registerUseCase.execute({ name, email, phone, company });
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al registrar cliente', error: error.message });
    }
  };
}
