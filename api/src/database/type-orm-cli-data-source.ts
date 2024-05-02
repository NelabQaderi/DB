import { DataSource, DataSourceOptions } from 'typeorm';
import { DataSourceForNest } from './nest-data-source';
export const AppDataSource = new DataSource(
  DataSourceForNest as DataSourceOptions,
);
