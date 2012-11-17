Ext.require(['EIA.view.AbstractForm']);
Ext.require(['EIA.view.AbstractWindow']);
Ext.require(['EIA.view.fluxo.Combo']);

Ext.define('EIA.view.fluxo.Edit', {
    extend: 'EIA.view.AbstractWindow',
    alias : 'widget.fluxoEdit',
    title : 'Edição de Contato',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [
			{
                xtype		: 'contaCombo'
            },
			{
                name 		: 'DsDescricao',
                fieldLabel	: 'DsDescricao',
				allowBlank	: false				
            }
			,
			{
                name 		: 'NuValor',
                fieldLabel	: 'NuValor',
				allowBlank	: false				
            }			
			,
            {
                xtype		: 'datefield',
                name 		: 'DtFluxo',
                ref			: 'DtFluxo',
                fieldLabel	: 'DtFluxo',
                maxValue	: new Date(),
                format		: 'd/m/Y',
                submitFormat: 'Y-m-d',
                allowBlank	: false
            }            			
			]}
        ];
        this.callParent(arguments);
    }
});