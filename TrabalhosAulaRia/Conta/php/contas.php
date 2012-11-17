<?php

require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="insert")
{
    $data 			= json_decode($arrDados['data']);	
	
	$Conta_id	= mysql_escape_string($data->{'teContas_idContas'}); 	
	$Dsdescricao 		= mysql_escape_string($data->{'NmConta'}); 	
	$FgTipo	= mysql_escape_string($data->{'FgTipo'}); 	
		 			

	$strSQL  = "INSERT INTO tecontas ";
	$strSQL .= " (teContas_idContas,NmConta,FgTipo) "; 
	$strSQL .= "VALUES ('".$Conta_id."', '".$Dsdescricao."', '".$FgTipo."')";
	
	if(mysql_query($strSQL))
	{
	
		$data->{'idContas'} 	   					= mysql_insert_id(); 	
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
	$idConta 		= mysql_escape_string($arrDados['idContas']); 
	$Conta_id	= mysql_escape_string($arrDados['teContas_idContas']); 	
	$Dsdescricao		= mysql_escape_string($arrDados['NmConta']); 	
	$FgTipo	= mysql_escape_string($arrDados['FgTipo']); 	
	 	

	$strSQL  = "UPDATE tecontas SET ";
	$strSQL .= "  teContas_idContas				= '".$Conta_id."' "; 
	$strSQL .= ", NmConta					= '".$Dsdescricao."'"; 
	$strSQL .= ", FgTipo				= '".$FgTipo."'"; 
	$strSQL .= " WHERE idContas			= '".$idConta."' ";
			
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
    $arrconta = $arrDados["id"];
	
	for($i=0;$i<count($arrconta);$i++)
	{
       $idConta	= mysql_real_escape_string($arrconta[$i]);
	   $strSQL 	 	= "DELETE FROM tecontas WHERE idContas = '".$idConta."'";
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
        
        $strSQL = "SELECT idContas, teContas_idContas, NmConta, FgTipo FROM tecontas ORDER BY ".mysql_real_escape_string($order);
        
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
		
		        
        $strSQL 	= "SELECT COUNT(*) AS total FROM tecontas";
        $total 		= mysql_fetch_array(mysql_query($strSQL));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
			"inicio" => $inicio,
            "total" => $total['total']			
        ));
	
	
}		
mysql_close(); 