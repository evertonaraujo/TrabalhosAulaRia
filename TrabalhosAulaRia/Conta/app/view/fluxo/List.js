Ext.require(['EIA.view.fluxo.ComboRenderer']);
Ext.require(['EIA.view.AbstractList']);

Ext.define('EIA.view.fluxo.List' ,{
    extend		: 'EIA.view.AbstractList',
    alias 		: 'widget.fluxoList',
    store		: 'Fluxos',
    title 		: 'Lista de Fluxo de conta', 
	selModel 	: Ext.create('Ext.selection.CheckboxModel'),	
    initComponent: function(){

		this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
		{header: 'Código',  dataIndex: 'idFluxo',  flex: 1}				
		, 
		{
            header		: 'Conta',  
            dataIndex	: 'teContas_idContas',  
            flex		: 1,
            //field		: Ext.create('EIA.view.fluxo.ComboRenderer'),
            renderer	: Ext.util.Format.comboRenderer(Ext.create('EIA.view.fluxo.ComboRenderer'))
            //renderer: function (value, metadata, record, rowIndex, colIndex, store) 
			//{                    			                 
			//	var idx = this.columns[colIndex].field.store.find('idContas', value);
			//	return idx !== -1 ? this.columns[colIndex].field.store.getAt(idx).get('teContas_idContas') : '';
           //}
        },        
		{header: 'Dsdescricao',  dataIndex: 'DsDescricao',  flex: 1}
		,         
		{header: 'NuValor',  dataIndex: 'NuValor',  flex: 1}
		,
		{	header		: 'DtFluxo',  
            dataIndex	: 'DtFluxo',  
            flex		: 1, 
            xtype		: 'datecolumn', 
            format		: 'd/m/Y'
        } 			
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Fluxos',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});