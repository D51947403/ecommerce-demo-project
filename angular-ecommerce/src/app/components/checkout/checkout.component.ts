import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TamasEmartFormService } from 'src/app/services/tamas-emart-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder, private tamasService: TamasEmartFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group(
          {
            firstName: [''],
            lastName: [''],
            email: ['']
          }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipcode: ['']
        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipcode: ['']
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: []
        })
      });
    // populate creadit card months 
    const startMonth: number = new Date().getMonth() + 1;
    console.log('start month' + startMonth);
    this.tamasService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived Credit Card Months " + JSON.stringify(data));
        this.creditCardMonths = data
      }
    );
    // populate credit card years 
    this.tamasService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrived Credit Card years " + JSON.stringify(data));
        this.creditCardYears = data
      }
    );

  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The first name is : " + this.checkoutFormGroup.get('customer')?.value.firstName);
    console.log("The last name is : " + this.checkoutFormGroup.get('customer')?.value.lastName);
    console.log("The email address is : " + this.checkoutFormGroup.get('customer')?.value.email);

  }

  copyAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
  }

  handleMonthsAndYears() {
    console.log("handleMonthsAndYears");
   const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
   const currentYear:number =new Date().getFullYear();
   const selectedYear:number =Number(creditCardFormGroup?.value.expirationYear);
   // if the current year equals the selected year, then start with the current month
   let startMonth:number;
   if(currentYear ===selectedYear){
     startMonth=new Date().getMonth()+1;
   }else{
     startMonth=1;
   }
   this.tamasService.getCreditCardMonths(startMonth).subscribe(
    data => this.creditCardMonths=data
   );
  }


}
