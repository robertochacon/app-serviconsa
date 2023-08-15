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
  updateData:any = null;
  client = '';
  attended = '';
  taxes:any = 0;
  discount:any = 0;
  observation = '';
  terms = '';
  total: any = 0;
  totalpartial: any = 0;
  type = 'quote';
  details:any;
  allInvoiceQuote: any[] = [];
  listServices: any[] = [];
  listServicesSelected: any = [];
  listInvoices: any[] = [];
  listQuotes: any[] = [];

  constructor(private _invoice_quote: InvoiceQuoteService, private _services: ServicesService) { }

  ngOnInit(): void {
    this.attended = localStorage.getItem('name') || '';
    this.getAllInvoiceQuote();
    this.getAllServices();
  }

  getAllInvoiceQuote(){
    this.loading = true;

    this._invoice_quote.getAllInvoiceQuote().subscribe((response)=>{

      this.allInvoiceQuote  = response.data;
      this.listInvoices = this.allInvoiceQuote .filter(item => item.type === 'invoice');
      this.listQuotes = this.allInvoiceQuote .filter(item => item.type === 'quote');

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
      $('#listInvoices').DataTable();
      $('#listQuotes').DataTable();
    },100);
  }

  reset(){
    this.client = '';
    // this.attended = '';
    this.taxes = 0;
    this.discount = 0;
    this.observation = '';
    this.terms = '';
    this.total = 0;
    this.totalpartial = 0;
    this.listServicesSelected = [];
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
    datos.append("total",this.total);
    datos.append("items", JSON.stringify(this.listServicesSelected));

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
      this.listServicesSelected = [];
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

  setUpdate(){
    this.client = this.updateData?.client;
    this.taxes = this.updateData?.taxes;
    this.discount = this.updateData?.discount;
    this.observation = this.updateData?.observation;
    this.terms = this.updateData?.terms;
    this.total = this.updateData?.total;
    this.totalpartial = this.updateData?.total;
    this.listServicesSelected = this.updateData?.items;
    console.log(this.listServicesSelected);
    
  }

  update(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("client",this.client);
    datos.append("attended",this.attended);
    datos.append("taxes",this.taxes);
    datos.append("discount",this.discount);
    datos.append("observation",this.observation);
    datos.append("terms",this.terms);
    datos.append("total",this.total);
    // datos.append("items", JSON.stringify(this.listServicesSelected));

    this._invoice_quote.updateInvoiceQuote(this.updateData?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllInvoiceQuote();
      this.action = 'list';
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
    this.total += service.total;
    this.totalpartial = this.total;
    this.listServicesSelected.push(service);
  }

  print():void{
    window.focus();
    setTimeout(() => {
      window.print();
    }, 1000);
  }

  amountChange(index:number){
    let amount: any = prompt("Cantidad");
    this.listServicesSelected[index].amount = amount;
    this.listServicesSelected[index].total = this.listServicesSelected[index].price * this.listServicesSelected[index].amount;
    this.total = (this.total + this.listServicesSelected[index].total) -  this.listServicesSelected[index].price;
    this.totalpartial = this.total;
  }

  taxesChange(){
    this.total=this.totalpartial
    if(this.taxes!=0){
      this.total=(this.total+this.taxes)
    }else{
      this.total=this.totalpartial
    }
  }

  discountChange(){
    this.total=this.totalpartial
    if(this.discount!=0){
      this.total=(this.total-this.discount)+this.taxes
    }else{
      this.total=this.totalpartial
    }
  }

  check_in(){
    this.loading = true;
    let datos = this.details;
    datos.type = this.type;
    delete datos.items;

    this._invoice_quote.updateInvoiceQuote(this.details?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Facturado correctamente!',
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
      this.loading = false;
    })
  }

}
