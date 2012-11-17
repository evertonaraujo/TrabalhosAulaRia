<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"]=="grafico")
{    	        
        $strSQL  = "SELECT sum( a.NuValor ) AS total, c.NmConta AS conta
		FROM tefluxo a
		INNER JOIN tecontas c ON a.teContas_idContas = c.idContas
		GROUP BY c.NmConta LIMIT 0 , 30";
               				
		$objRs = mysql_query($strSQL);
		$arrBanco = array(); 
		
		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow; 	
		}		                

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true			
        ));
	
	
}		
mysql_close(); 