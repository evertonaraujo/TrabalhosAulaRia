Ext.define('EIA.view.fluxo.Combo', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.contaCombo',
    name 			: 'teContas_idContas',
    fieldLabel		: 'conta',
    store			: 'Contas',
    displayField	: 'teContas_idContas',
    valueField		: 'idContas',
    queryMode		: 'local',
    typeAhead		: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
    }
});