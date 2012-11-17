<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
    $data 			= json_decode($arrDados['data']);	
	
	$Conta_id	= mysql_escape_string($data->{'teContas_idContas'}); 	
	$Dsdescricao 		= mysql_escape_string($data->{'DsDescricao'}); 	
	$NuValor	= mysql_escape_string($data->{'NuValor'}); 	
	$DtFluxo 		= mysql_escape_string($data->{'DtFluxo'}); 	 			

	$strSQL  = "INSERT INTO tefluxo ";
	$strSQL .= " (teContas_idContas,DsDescricao,NuValor,DtFluxo) "; 
	$strSQL .= "VALUES ('".$Conta_id."', '".$Dsdescricao."', '".$NuValor."', '".$DtFluxo."')";
	
	if(mysql_query($strSQL))
	{
	
		$data->{'idFluxo'} 	   					= mysql_insert_id(); 	
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro salvo com sucesso!";
		$arrMessage['data']    						= $data;		
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);
	
}
else if($arrDados["acao"]=="update")
{
	$idFluxo		= mysql_escape_string($arrDados['idFluxo']); 
	$Conta_id	= mysql_escape_string($arrDados['teContas_idContas']); 	
	$Dsdescricao		= mysql_escape_string($arrDados['DsDescricao']); 	
	$NuValor	= mysql_escape_string($arrDados['NuValor']); 	
	$DtFluxo		= mysql_escape_string($arrDados['DtFluxo']); 	

	$strSQL  = "UPDATE tefluxo SET "; 
	$strSQL .= " teContas_idContas					= '".$Conta_id."' "; 
	$strSQL .= ", DsDescricao			= '".$Dsdescricao."'"; 
	$strSQL .= ", NuValor 				= '".$NuValor."'"; 
	$strSQL .= ", DtFluxo 					= '".$DtFluxo."'"; 	
	$strSQL .= " WHERE idFluxo			= '".$idFluxo."' ";
			
	if(mysql_query($strSQL))
	{
		$arrMessage['success'] 						= true; 
		$arrMessage['message'] 						= "Registro(s) salvo(s) com sucesso!";	
	}
	else
	{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
		
	 echo json_encode($arrMessage);
}
else if($arrDados["acao"]=="delete")
{	
    $arrAgendas = $arrDados["id"];
	
	for($i=0;$i<count($arrAgendas);$i++)
	{
       $idFluxo	= mysql_real_escape_string($arrAgendas[$i]);
	   $strSQL 	 	= "DELETE FROM tefluxo WHERE idFluxo = '".$idFluxo."'"; 
                if(!mysql_query($strSQL))
				{
						echo json_encode(array(
							"success" => false,
							"message" => 'Erro na exclusão'
					));	
					break;	
				}
	}
	echo json_encode(array(
		"success" => true,
		"message" => 'Registro(s) excluído(s) com sucesso'
	));	 
}
else 
{
		$sort 	= $arrDados['sort'] ? $arrDados['sort'] : '1';
        $dir 	= $arrDados['dir']  ? $arrDados['dir']  : 'ASC';
        $order 	= $sort . ' ' . $dir;
        
        $strSQL = "SELECT idFluxo, teContas_idContas, DsDescricao, NuValor, DtFluxo FROM tefluxo ORDER BY ".mysql_real_escape_string($order);
        
        if($arrDados["start"] !== null && $arrDados["start"] !== 'start' && $arrDados["limit"] !== null && $arrDados["limit"] !== 'limit')
		{
				
			$inicio  = ($arrDados["page"]-1);  
			$inicio *= $arrDados["limit"];
			
            $strSQL .= " LIMIT " . $inicio . " , " . $arrDados["limit"];
        }
        		
		
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		        
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM tefluxo";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 