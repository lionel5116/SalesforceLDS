({
    
    handleSuccess : function(component, event, helper) {
      
      console.log(event.getParams().response);
      for(let key of Object.keys(event.getParams().response)){
          console.log(key + event.getParams().response[key]);
      }
      console.log(event.getParams().response.id);
      
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams(
           {
           "title":"Success",
           "message": "Income Approach Record has been created successfully.",
           "type:": "success"
           }
      );
      toastEvent.fire();
   },
  
   handleSubmit: function(component, event, helper) {
    console.log('Submit Event' + JSON.stringify(event.getParams()));
    console.log(component.find("Firm_Name__c"));
  
  },
   
    handleOnLoad: function(component, event, helper) {
        console.log('Load Event' + JSON.stringify(event.getParams()));
    },
    
    clearForm: function(component, event, helper) {
        component.set("v.vName","");
        component.set("v.vAAdress","");
        component.set("v.vAccountNuber","");
        component.set("v.vPGI","");
        component.set("v.vOCC","");
        component.set("v.vNOI","");
        component.set("v.vFixedExp","");
        component.set("v.vVariable","");
        component.set("v.vEGI","");
        component.set("v.vCAPRate","");
        component.set("v.vValue","");
        component.set("v.vNotes","");
    },

    calculate: function(component, event, helper) {
     
       var _PGI = component.get("v.vPGI");
       var _OCC =  component.get("v.vOCC");
       var _NOI =  component.get("v.vNOI");
       var _FixedExp = component.get("v.vFixedExp");
       var _VariableExp  = component.get("v.vVariable");
       var _EGI =  component.get("v.vEGI");
       var _CAPRate =  component.get("v.vCAPRate");
       var _Value  =  component.get("v.vValue");
       
       component.set("v.vNOI",_PGI * _OCC);  //this works
       var _TotalExpenses = (parseFloat(component.get("v.vFixedExp")) + parseFloat(component.get("v.vVariable")));  //THIS WORKS
       console.log("Fixed Expenses: " + _FixedExp)
       console.log("Variable Expenses: " + _VariableExp);
       console.log("Total Expenses: " + _TotalExpenses);  //THIS WORKS
       component.set("v.vEGI",parseFloat(component.get("v.vNOI")) - _TotalExpenses);
       console.log(_CAPRate);
       if(_CAPRate !== null)
       {
         var initialFinalValue = parseFloat(component.get("v.vEGI")) /_CAPRate;
        var formattedFinalValue = initialFinalValue.toFixed(2);
        component.set("v.vValue",formattedFinalValue);
       }
       else{
         console.log("Cannot calculate value with an invalid cap rate");
         var toastEvent = $A.get("e.force:showToast");
         toastEvent.setParams(
              {
              "title":"Error",
              "message": "Cannot calculate value with an invalid cap rate.",
              "type:": "failure"
              }
         );
         toastEvent.fire();
       }
       
    },

    createToastMessage : function(title,message,type)
    {
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams(
           {
           "title":title,
           "message": message,
           "type:":type
           }
      );
      toastEvent.fire();
    }
  
  })
  