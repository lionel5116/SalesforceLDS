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

    handleChange(event) {
        const field = event.target.name;
        if (field === 'Name') {
            this.vName = event.target.value;
        } else if (field === 'Address__c') {
            this.vAAdress = event.target.value;
        }else if (field === 'Account_Number__c') {
            this.vAccountNuber = event.target.value;
        }else if (field === 'PGI__c') {
            this.vPGI = event.target.value;
        }else if (field === 'Occupancy__c') {
            this.vOCC = event.target.value;
        }else if (field === 'NOI__c') {
            this.vNOI = event.target.value;
        }else if (field === 'Fixed_Expenses__c') {
            this.vFixedExp = event.target.value;
        }else if (field === 'Variable_Expenses__c') {
            this.vVariable = event.target.value;
        }else if (field === 'EGI') {
            this.vEGI = event.target.value;
        }else if (field === 'Cap_Rate__c') {
            this.vCAPRate = event.target.value;
        }else if (field === 'Value__c') {
            this.vValue = event.target.value;
        }else if (field === 'Notes__c') {
            this.vNotes = event.target.value;
        }
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

    clearForm() {
        const event = new CustomEvent('clearForm', {
           
        });
        this.dispatchEvent(event);
    }

}