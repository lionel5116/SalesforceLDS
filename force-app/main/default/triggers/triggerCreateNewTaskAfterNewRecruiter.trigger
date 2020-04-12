trigger triggerCreateNewTaskAfterNewRecruiter on Recruiters__c (after insert) {

     for(Recruiters__c recruiterRec: trigger.new) {
        if(HelperClass.firstRun)
        {
            String userId = UserInfo.getUserId();

            Task t = new Task();
            t.OwnerId = userId;
            t.Subject = 'New Recruiter record entered- Firm Name ' + recruiterRec.Firm_Name__c ;
            t.Status = 'Open';
            t.Priority = 'Normal';
            insert t;
        }
    }
   HelperClass.firstRun = false;

}