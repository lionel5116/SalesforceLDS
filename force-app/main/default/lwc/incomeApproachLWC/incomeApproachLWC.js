import { LightningElement , api, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Name';
import ADDRESS_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Address__c';
import ACCOUNT_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Account_Number__c';
import PGI_FIELD from '@salesforce/schema/Income_Approach_JobS__c.PGI__c';
import OCC_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Occupancy__c';
import NOI_FIELD from '@salesforce/schema/Income_Approach_JobS__c.NOI__c';
import FIXED_EXP_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Fixed_Expenses__c';
import VARIABLE_EXP_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Variable_Expenses__c';
import EGI_FIELD from '@salesforce/schema/Income_Approach_JobS__c.EGI__c';
import CAP_RATE_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Cap_Rate__c';
import VALUE_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Value__c';
import NOTES_FIELD from '@salesforce/schema/Income_Approach_JobS__c.Notes__c';
import createIncApproachRecord from '@salesforce/apex/CreateIncomeApproachRec.createIncApproachRecord';

export default class IncomeApproachLWC extends LightningElement {
   
   @track vName = NAME_FIELD;
   @track vAAdress = ADDRESS_FIELD;
   @track vAccountNuber = ACCOUNT_FIELD;
   @track vPGI = PGI_FIELD;
   @track vOCC = OCC_FIELD;
   @track vNOI = NOI_FIELD;
   @track vFixedExp = FIXED_EXP_FIELD;
   @track vVariable = VARIABLE_EXP_FIELD;
   @track vEGI = EGI_FIELD;
   @track vCAPRate = CAP_RATE_FIELD;
   @track vValue = VALUE_FIELD;
   @track vNotes = NOTES_FIELD;


   rec = {
     Name : this.vName,
     Address__c : this.vAAdress,
     Account_Number__c : this.vAccountNuber,
     PGI__c : this.vPGI,
     Occupancy__c : this.vOCC,
     NOI__c : this.vNOI,
     Fixed_Expenses__c : this.vFixedExp,
     Variable_Expenses__c : this.vVariable,
     EGI__c : this.vEGI,
     Cap_Rate__c : this.vCAPRate,
     Value__c : this.vValue,
     Notes__c : this.vNotes,
   }

    nameHandler(event)
    {
        this.rec.Name = event.target.value; 
    }
    addressHandler(event)
    {
        this.rec.Address__c = event.target.value; 
    }
    accntNumberHandler(event)
    {
        this.rec.Account_Number__c = event.target.value; 
    }
    PGIHandler(event)
    {
        this.rec.PGI__c = event.target.value; 
    }
    OCCHandler(event)
    {
        this.rec.Occupancy__c = event.target.value; 
    }
    NOIHandler(event)
    {
        this.rec.NOI__c = event.target.value; 
    }
    fixedExpHandler(event)
    {
        this.rec.Fixed_Expenses__c = event.target.value; 
    }
    variableExpHandler(event)
    {
        this.rec.Variable_Expenses__c = event.target.value; 
    }
    EGIHandler(event)
    {
        this.rec.EGI__c = event.target.value; 
    }
    capRateHandler(event)
    {
        this.rec.Cap_Rate__c = event.target.value; 
    }
    ttlValHandler(event)
    {
        this.rec.Value__c = event.target.value;  
    }
    notesHandler(event)
    {
        this.rec.Notes__c = event.target.value; 
    }

   
    handleClick() {
        createIncApproachRecord({ incRec : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                  
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Income Approach Record created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
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

       this.rec.Name = '';
       this.rec.Address__c  = ''; 
       this.rec.Account_Number__c  = '';
       this.rec.PGI__c  = '';
       this.rec.Occupancy__c  = '';
       this.rec.NOI__c  = ''; 
       this.rec.Fixed_Expenses__c  = ''; 
       this.rec.Variable_Expenses__c  = ''; 
       this.rec.EGI__c  = ''; 
       this.rec.Cap_Rate__c  = ''; 
       this.rec.Value__c  = '';
       this.rec.Notes__c  = ''; 
    }

    calc(event)
    {
        var totalExpenses;
        console.log("Something is happening");
        this.rec.NOI__c = (this.rec.PGI__c * this.rec.Occupancy__c);
        console.log("NOI: " + this.rec.NOI__c);
        this.totalExpenses = parseFloat (this.rec.Fixed_Expenses__c) + parseFloat(this.rec.Variable_Expenses__c);
        console.log("Total Expenses: " + this.totalExpenses);
        this.rec.EGI__c = parseFloat(this.rec.NOI__c) - this.totalExpenses;
        var formattedFinalValue = this.rec.EGI__c / parseFloat(this.rec.Cap_Rate__c);
        this.rec.Value__c = formattedFinalValue.toFixed(2);
        console.log(this.rec)
    }

}