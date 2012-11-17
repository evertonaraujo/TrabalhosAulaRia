Ext.define('EIA.view.fluxo.ComboRenderer', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.fluxoComboRenderer',
    name 			: 'teContas_idContas',    
    fieldLabel		: 'conta',
    store			: 'Contas',
    displayField	: 'teContas_idContas',
    valueField		: 'idContas',
    queryMode		: 'local',	//Server fazer a busca por que os dados nao estao carregados 		
	//local - os dados ja estão carregados 
    typeAhead   	: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
        this.store.load();
    }
});