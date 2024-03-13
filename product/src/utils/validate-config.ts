import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export default function validateConfig<T extends object>(config: Record<string, unknown>, envVariablesClass: ClassConstructor<T>) {
  const validatedConfig = plainToClass(envVariablesClass, config, { enableImplicitConversion: true });

  const errors = validateSync(validatedConfig, { skipMissingProperties: true });
  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
