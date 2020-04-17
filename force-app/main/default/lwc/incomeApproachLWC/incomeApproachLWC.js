import { LightningElement , api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class IncomeApproachLWC extends LightningElement {
    
    @api Income_Approach_JobS__c;

    @track vName = '';
    @track vAAdress = '';
    @track vAccountNuber = '';
    @track vPGI = '';
    @track vOCC = '';
    @track vNOI = '';
    @track vFixedExp = '';
    @track vVariable = '';
    @track vEGI = '';
    @track vCAPRate = '';
    @track vValue = '';
    @track vNotes = '';
    
   


    nameHandler(event)
    {
        this.vName = event.target.value; 
    }
    addressHandler(event)
    {
        this.vAAdress = event.target.value; 
    }
    accntNumberHandler(event)
    {
        this.vAccountNuber = event.target.value; 
    }
    PGIHandler(event)
    {
        this.vPGI = event.target.value; 
    }
    OCCHandler(event)
    {
        this.vOCC = event.target.value; 
    }
    NOIHandler(event)
    {
        this.vNOI = event.target.value; 
    }
    fixedExpHandler(event)
    {
        this.vFixedExp = event.target.value; 
    }
    variableExpHandler(event)
    {
        this.vVariable = event.target.value; 
    }
    EGIHandler(event)
    {
        this.vEGI = event.target.value; 
    }
    capRateHandler(event)
    {
        this.vCAPRate = event.target.value; 
    }
    ttlValHandler(event)
    {
        this.vValue = event.target.value; 
    }
    notesHandler(event)
    {
        this.vNotes = event.target.value; 
    }

   

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName + ' created.',
                variant: 'success',
            }),
        );
    }

    clearForm(event) {
       this.vName = '';
       this.vPGI = '';
       this.vAAdress = '';
       this.vAccountNuber = '';
       this.vPGI = '';
       this.vOCC = '';
       this.vNOI = '';
       this.vFixedExp = '';
       this.vVariable = '';
       this.vEGI = '';
       this.vCAPRate = '';
       this.vValue = '';
       this.vNotes = '';
    }

    calc(event)
    {
        var totalExpenses;
        console.log("Something is happening");
        
        this.vNOI = (this.vPGI * this.vOCC);
        console.log("NOI: " + this.vNOI);
        this.totalExpenses = parseFloat (this.vFixedExp) + parseFloat(this.vVariable);
        console.log("Total Expenses: " + this.totalExpenses);
        this.vEGI = parseFloat(this.vNOI) - this.totalExpenses;
        this.vValue = this.vEGI / parseFloat(this.vCAPRate);
    }

}