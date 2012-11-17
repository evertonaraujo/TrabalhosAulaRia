Ext.define('EIA.model.Conta', {
    extend		: 'Ext.data.Model',
	idProperty  : 'idContas',	
    fields: [
    {
        name: 'idContas',
	type: 'int'
    },
	{
        name: 'teContas_idContas',
	type: 'int'
    },	
    {
        name: 'NmConta',
        type: 'string'
    }
	,	
    {
        name: 'FgTipo',
        type: 'int'
    }
	   
    ]
});