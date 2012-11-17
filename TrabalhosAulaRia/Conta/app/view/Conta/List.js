Ext.require(['EIA.view.AbstractList']);

Ext.define('EIA.view.conta.List' ,{
    extend			: 'EIA.view.AbstractList',
    alias 			: 'widget.contaList',
    store			: 'Contas',
    title 			: 'Lista das Contas',         
	selModel 		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

		this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'idContas',  flex: 1},
        {header: 'Conta ID',  dataIndex: 'teContas_idContas',  flex: 1},
        {header: 'Descrição',  dataIndex: 'NmConta',  flex: 1},
        {header: 'Tipo',  dataIndex: 'FgTipo',  flex: 1} 
       
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Contas',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});