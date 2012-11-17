Ext.define('EIA.model.Fluxo', {
    extend		: 'Ext.data.Model',
	idProperty  : 'idFluxo',	
    fields: [
    {
        name: 'idFluxo'
    },
	{
        name: 'teContas_idContas'
    },	
    {
        name: 'DsDescricao',
        type: 'string'
    }
	,	
    {
        name: 'NuValor',
        type: 'float'
    }
	,
    {
        name: 'DtFluxo',
        type: 'date', 
        dateFormat:'Y-m-d'
    }    
    ]
});