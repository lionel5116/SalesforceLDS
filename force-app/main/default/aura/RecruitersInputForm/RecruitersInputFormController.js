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
         "message": "The records has been created successfully.",
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
  component.set("v.recruiterName","The recruter is baddassss");
  console.log("The value of recruiter name is: " + component.get("v.recruiterName"));
},

})
