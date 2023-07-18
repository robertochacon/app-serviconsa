import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InvoiceQuoteService } from 'src/app/services/invoice-quote.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-invoice-quote',
  templateUrl: './invoice-quote.component.html',
  styleUrls: ['./invoice-quote.component.css']
})
export class InvoiceQuoteComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  client = '';
  attended = '';
  taxes = '';
  discount = '';
  observation = '';
  terms = '';
  type = '';
  allInvoiceQuote: any[] = [];
  listServices: any[] = [];
  listServicesSelected: any = [];
  listInvoices: any[] = [];
  listQuotes: any[] = [];

  constructor(private _invoice_quote: InvoiceQuoteService, private _services: ServicesService) { }

  ngOnInit(): void {
    this.getAllInvoiceQuote();
    this.getAllServices();
  }

  getAllInvoiceQuote(){
    this.loading = true;

    this._invoice_quote.getAllInvoiceQuote().subscribe((response)=>{

      this.allInvoiceQuote  = response.data;
      this.listInvoices = this.allInvoiceQuote .filter(item => item.role === 'invoice');
      this.listQuotes = this.allInvoiceQuote .filter(item => item.role === 'quote');

      setTimeout(function(){
        $('#listInvoices').DataTable();
        $('#listQuotes').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  getAllServices(){
    this.loading = true;

    this._services.getAllServices().subscribe((response)=>{

      this.listServices  = response.data;

      setTimeout(function(){
        $('#listServices').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listInvoiceQuote').DataTable();
    },100);
  }

  reset(){
    this.client = '';
    this.attended = '';
    this.taxes = '';
    this.discount = '';
    this.observation = '';
    this.terms = '';
    this.type = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("client",this.client);
    datos.append("attended",this.attended);
    datos.append("taxes",this.taxes);
    datos.append("discount",this.discount);
    datos.append("observation",this.observation);
    datos.append("terms",this.terms);
    datos.append("type",this.type);
    datos.append("items", this.listServicesSelected);

    this._invoice_quote.setInvoiceQuote(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllInvoiceQuote();
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }
  
  delete(id: any): void {
    Swal.fire({
      title: 'Deseas eliminarla?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._invoice_quote.deleteInvoiceQuote(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllInvoiceQuote();
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Problemas tecnicos!',
          text: 'No se pudo completar el registro, favor intente nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      })
    
      }
    })

  }

  selectedService(service:any){
    service.amount = 1;
    service.total = service.price;
    this.listServicesSelected.push(service);
  }

}
