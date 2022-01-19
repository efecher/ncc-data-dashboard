/**
* @copyright 'Copyright 2022, Seton Hall University. All Rights Reserved.'
* @description 'REST functions for interacting with Net Cost Calculator data.'
* @displayName 'Net Cost Calculator'
* @filename 'CostCalculator.cfc'
* @hint 'Defines functions for interacting with Net Cost Calculator data via REST API'
* @output true
*/

component
	consumes = 'application/json,text/plain,text/json'
	produces = 'application/json,text/json'
	rest = true
	restPath = 'costcalculator'
{
  //cfheader(name="Access-Control-Allow-Methods" value="GET,POST");
  //cfheader(name="Access-Control-Allow-Headers" value="Content-Type");
  /**
	* @displayName 'getJSON'
	* @description 'gets JSON data for the specified category'
	* @hint 'gets JSON data for the specified category'
	* @output true
	*/
  remote string function getJSON(
    string category
    restArgSource='path'
  )
  httpMethod='get'
  restPath='get/{category}'
  returnFormat='json'
  responseMessages="404:Not Found,200:successful,10:notdefined"
  {
    try {
      fileData = fileRead(expandPath('/_cs_apps/cost-calculator/' & category & '.json'));
      return fileData; 
    } catch (any error) {
      return '{"error": "error getting data."}';
    }
  } // END function 'get'

  /**
	* @displayName 'postJSON'
	* @description 'posts JSON data for the specified category'
	* @hint 'posts JSON data for the specified category'
	* @output true
	*/
  remote string function postJSON(
    string category
    restArgSource='path'
  )
  httpMethod='post'
  restPath='post/{category}'
  returnFormat='json'
  responseMessages="404:Not Found,200:successful,10:notdefined"
  {
    fileStatus = application.adf.csData.CSFile(
      action='write',
      destination='/cust/webroot/site8/_cs_apps/cost-calculator/' & category & '.json',
      file='/cust/webroot/site8/_cs_apps/cost-calculator/' & category & '.json',
      output=getHTTPRequestData().content
    );
    return "ok";
  }// END function 'post'
} // END Component