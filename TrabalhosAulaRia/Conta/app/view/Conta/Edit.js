Ext.define('EIA.view.conta.Edit', {
    extend		: 'Ext.window.Window',
    alias 		: 'widget.contaEdit',
    title 		: 'Edição de contas',
    layout		: 'fit',
    autoShow	: true,
    modal		: true,
    initComponent: function() {    	
        this.items = [{
            xtype			: 'form',
            style			: 'background-color: #fff;',
            fieldDefaults	: {
                anchor			: '100%',
                labelAlign		: 'left',
                labelWidth		: 150,
                allowBlank		: false,
                combineErrors	: false,
                msgTarget		: 'side'
            },
            defaultType			: 'textfield',
            defaults			: {
							anchor: '100%'
            },
            items	: [
			{
                xtype		: 'textfield',
                name 		: 'teContas_idContas',
                ref			: 'teContas_idContas',
                fieldLabel	: 'Conta ID',
                allowBlank	: false
            },
			{
                xtype		: 'textfield',
                name 		: 'NmConta',
                ref			: 'NmConta',
                fieldLabel	: 'Descrição',
                allowBlank	: false
            }
			,
			{
                xtype		: 'textfield',
                name 		: 'FgTipo',
                ref			: 'FgTipo',
                fieldLabel	: 'Tipo',
                allowBlank	: false
            }
			]
			
			}
        ];

        this.buttons = [{
            text	: 'Salvar',
            action	: 'save',
            iconCls	: 'save'
        },
        {
            text	: 'Cancelar',
            scope	: this,
            iconCls	: 'cancel',
            handler	: this.close
        }];

        this.callParent(arguments);
    }
});