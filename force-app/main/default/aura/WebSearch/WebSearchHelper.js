({
    setSearchTerm : function(component, event) {
      var searchTerm = component.find('searchBox').getElement().value;
      component.set("v.searchTerm",searchTerm);
    }
})
