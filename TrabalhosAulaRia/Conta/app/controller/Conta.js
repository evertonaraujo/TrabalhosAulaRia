Ext.require('Ext.window.MessageBox');

Ext.define('EIA.controller.Conta', {
    extend	: 'Ext.app.Controller',
    stores	: ['Contas'],
    models	: ['Conta'], 	
    views	: [
			'conta.List',
			'conta.Edit'
			],    
    refs: [
    {
        ref			: 'contaEdit', 
        selector	: 'contaEdit'
    },
    {
        ref			: 'contaList', 
        selector	: 'contaList'
    }
    ],
    init	: function() 
	{
        this.control({
            'contaList': {
                itemdblclick: this.edit
            },

            'contaList button[action=insert]': {
                click: this.insert
            },
            
            'contaList button[action=edit]': {
                click: this.edit
            },

            'contaList button[action=destroy]': {
                click: this.destroy
            },
            
            'contaList button[action=refresh]': {
                click: this.refresh
            },

            'contaEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getContaList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('contaEdit');
        view.setTitle('Nova conta');
    },
    
    destroy: function() {
        
        var grid    = this.getContaList(),
            records = grid.getSelectionModel().getSelection();

        if(records.length === 0)
		{
            Ext.Msg.alert('Aten��o', 'Nenhum registro selecionado');
            return false;
        }
		else
		{
            Ext.Msg.show({
                title 	: 'Confirma��o',
                msg 	: 'Tem CERTEZA que deseja deletar o(s) registro(s) selecionado(s)?',
                buttons : Ext.Msg.YESNO,
                icon 	: Ext.MessageBox.WARNING,
                scope 	: this,
                width 	: 450,
                fn 		: function(btn, ev)
						{
							if (btn == 'yes') 
							{						
								var store = this.getContaList().store;
								//Em cache - action destroy (records)
								store.remove(records);
								//Linha envia o seu store banco 
								this.getContaList().store.sync();
							}
						}
            });
        }
    },

    save: function(button) {	
        
        var win     	= button.up('window'),
            form    	= win.down('form').getForm(),
            idContas   = form.getRecord() ? form.getRecord().get('idContas') : 0;
        
        if (form.isValid()) 
		{
            var record 	= form.getRecord(),
                values 	= form.getValues();
				
            if (record)
			{
                if(record.data['idContas'])
				{					
                    record.set(values);
                }
            } 
			else
			{
                var record = Ext.create('EIA.model.Conta');
                record.set(values);
                this.getContaList().store.add(record);
            }

            win.close();
            this.getContaList().store.sync();
        }
		else
		{
            Ext.ux.Msg.flash({
                msg: 'H� campos preenchidos incorretamente',
                type: 'error'
        });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getContaList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1)
		{
            var editWind = Ext.widget('contaEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});