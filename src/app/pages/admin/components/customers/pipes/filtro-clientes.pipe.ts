import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../../sales/services/customers.service';

@Pipe({
  name: 'filtroClientes',
  standalone: true
})
export class FiltroClientesPipe implements PipeTransform {
  transform(clientes: Customer[], filtro: string): Customer[] {
    if (!filtro || filtro.trim() === '') {
      return clientes;
    }

    const lowerFiltro = filtro.toLowerCase();
    return clientes.filter(c =>
      c.username?.toLowerCase().includes(lowerFiltro) ||
      c.email?.toLowerCase().includes(lowerFiltro) ||
      c.address?.toLowerCase().includes(lowerFiltro) ||
      c.phoneNumber?.toLowerCase().includes(lowerFiltro)
    );
  }
}
