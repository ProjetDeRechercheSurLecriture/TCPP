define([ 
     "use!backbone",
     "use!handlebars", 
     "text!datum/datum_field_settings_edit_embedded.handlebars",
     "datum/DatumField"
  ], function(
      Backbone, 
      Handlebars,
      datum_fieldTemplate,
      DatumField
) {
  var DatumFieldSettingsEditView = Backbone.View.extend(
  /** @lends DatumFieldSettingsEditView.prototype */
  {
    /**
     * @class This is the view of the Datum Field Model. The Datum Field is a
     *        drop down field that has the most frequent ones first, and at the
     *        bottom an option to create a new one.
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      Utils.debug("DATUM FIELD init");
    
      // If the model changes, re-render
      this.model.bind('change', this.render, this);
    },
    
    /**
     * The underlying model of the DatumFieldSettingsEditView is a DatumField.
     */
    model : DatumField,
    
    /**
     * Specified which css class to add to the elements
     */
    className   : 'breadcrumb',
    
    /**
     * Events that the DatumFieldSettingsEditView is listening to and their handlers.
     */
    events : {
      "blur .choose-field" : "updateField",
      "click .encrypted" : "updateEncrypted",
      "blur .help-text" : "updateHelp",
    },

    /**
     * The Handlebars template rendered as the DatumFieldSettingsEditView.
     */
    template : Handlebars.compile(datum_fieldTemplate),
    
    /**
     * Renders the DatumFieldSettingsEditView.
     */
    render : function() {
      Utils.debug("DATUM FIELD EDIT render");
     
      $(this.el).html(this.template(this.model.toJSON()));
      

      // Select the correct values from the model
      this.$el.children(".choose-field").val(this.model.get("label"));
      
      return this;
    },
    
    /**
     * Change the model's state.
     */
    updateField : function() {
      Utils.debug("Updated label to " + this.$el.children(".datum_field_input").val());
      this.model.set("label", this.$el.children(".datum_field_input").val());
    },
    
    // TODO Add description
    updateEncrypted : function() {
      var checked = this.$el.children(".encrypted").is(':checked');
      if (checked ) {
        checked = "checked";
      } else {
        checked = "";
      }
      Utils.debug("Updated encrypted to " + checked);
      this.model.set("encrypted", checked);
    },
    
    // TODO Add description
    updateHelp : function() {
      var help = this.$el.children(".help-text").val();
      Utils.debug("Updated help to " + help);
      this.model.set("help",help);
    }    
  });

  return DatumFieldSettingsEditView;
});