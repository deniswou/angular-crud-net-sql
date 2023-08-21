import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {

  listTarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechExp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(){
    this.obtenerTarjetas();
  }

  obtenerTarjetas() 
  {
    this._tarjetaService.getListTarjetas().subscribe(data => 
      {
        console.log(data);
        this.listTarjetas = data;
      }, error => {
        console.log(error);
      })
  }

  guardarTarjeta() {

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numTarjeta: this.form.get('numTarjeta')?.value,
      fechExp: this.form.get('fechExp')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Registro con éxito', 'Tarjeta Registrada!');
        this.obtenerTarjetas();
        this.form.reset;
      }, error => {
        this.toastr.error('Ops, ocurrio un error','Error');
        console.log(error);
      })
    }else{
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = "Agregar";
        this.id = undefined;
        this.toastr.info('Actualización con éxito','Tarjeta actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('Eliminación con éxito', 'Tarjeta Eliminada!');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numTarjeta: tarjeta.numTarjeta,
      fechExp: tarjeta.fechExp,
      cvv: tarjeta.cvv,
    })
  }

}
