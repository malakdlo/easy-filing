const express = require('express')
const router = express.Router()
const pdffiller = require('pdffiller-stream')

router.post('/', (req, res) => {
  const sourcePDF = "./pdfs/sc/sc100-fillable.pdf";

  const data = {
    clerk_stamp: '',
    case_number_page1: '',
    court_name_address_page1: '',
    case_name_page1: '',
    td_date1_page1: '',
    td_date2_page1: '',
    td_date3_page1: '',
    td_time1_page1: '',
    td_time2_page1: '',
    td_time3_page1: '',
    td_dep1_page1: '',
    td_dep2_page1: '',
    td_dep3_page1: '',
    td_courtinfo1_page1: '',
    td_courtinfo2_page1: '',
    td_courtinfo3_page1: '',
    td_date4_page1: '',
    td_clerkname_page1: '',
    pg2_s1_pListNames: '',
    pg2_s1_caseNum: '',
    pg2_s2_p1_phone: req.body.pphone,
    pg2_s2_p1_street: req.body.pstreetAddress,
    pg2_s2_p1_state: req.body.pstreetState,
    pg2_s2_p1_city: req.body.pstreetCity,
    pg2_s2_p1_zip: req.body.pstreetZip,
    pg2_s2_p1_street2: req.body.pmailingAddress,
    pg2_s2_p1_city2: req.body.pmailingCity,
    pg2_s2_p1_state2: req.body.pmailingState,
    pg2_s2_p1_zip2: req.body.pmailingZip,
    pg2_s2_p1_name: req.body.pfirstName + " " + req.body.plastName,
    pg2_s2_p2_name: '',
    pg2_s2_p2_phone: '',
    pg2_s2_p2_street: '',
    pg2_s2_p2_city: '',
    pg2_s2_p2_state: '',
    pg2_s2_p2_zip: '',
    pg2_s2_p2_street2: '',
    pg2_s2_p2_city2: '',
    pg2_s2_p2_state2: '',
    pg2_s2_p2_zip2: '',
    pg2_s2_check_moreThanTwoP: '',
    pg2_s2_check_dba: '',
    pg2_s2_check_financial: '',
    pg2_s3_d1_phone: '',
    pg2_s3_d1_name: '',
    pg2_s3_d1_street: '',
    pg2_s3_d1_city: '',
    pg2_s3_d1_state: '',
    pg2_s3_d1_zip: '',
    pg2_s3_d1_street2: '',
    pg2_s3_d1_city2: '',
    pg2_s3_d1_state2: '',
    pg2_s3_d1_zip2: '',
    pg2_s3_agent_name: '',
    pg2_s3_agent_jobTitle: '',
    pg2_s3_agent_street: '',
    pg2_s3_agent_city: '',
    pg2_s3_agent_state: '',
    pg2_s3_agent_zip: '',
    pg2_s3_check_moreThanOneD: '',
    pg2_s3_check_activeMilitary: '',
    pg2_s3_check_activeMilitary_explain: '',
    pg2_s4_amountOwed: '',
    pg2_s4_why_line1: '',
    pg2_s4_why_line2: '',
    pg2_s4_when_specificDate: '',
    pg2_s4_when_rangeStart: '',
    pg2_s4_when_rangeEnd: '',
    pg2_s4_calculate_line1: '',
    pg2_s4_calculate_line2: '',
    pg2_s4_check_needSpace: '',
    pg3_s1_listNames: '',
    pg3_s1_caseNum: '',
    pg3_s2_check_yes: '',
    pg3_s2_check_no: '',
    pg3_s2_whyNot_line1: '',
    pg3_s2_whyNot_line2: '',
    pg3_s3_check_b: '',
    pg3_s3_check_a: '',
    pg3_s3_check_c: '',
    pg3_s3_check_d: '',
    pg3_s3_check_other: '',
    pg3_s3_check_other_line1: '',
    pg3_s3_check_other_line2: '',
    pg3_s4_zipOfDef: '',
    pg3_s5_yes: '',
    pg3_s5_no: '',
    pg3_s5_sc101_check_yes: '',
    pg3_s6_check_yes: '',
    pg3_s6_check_no: '',
    pg3_s6_check_filed_yes: '',
    pg3_s6_filed_date: '',
    pg3_s7_check_yes: '',
    pg3_s7_check_no: '',
    pg3_s8_check_yes: '',
    pg3_s8_check_no: '',
    pg3_s9_date1: '',
    pg3_s9_date2: '',
    pg3_s9_plaintiffPrint1: '',
    pg3_s9_plaintiffPrint2: '',
    pg3_s9_plaintiffSig1: '',
    pg3_s9_plaintiffSig2: ''
   }


  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  }

  const rando = getRandomInt(1, 10000);

  pdffiller.fillForm( sourcePDF, data)
    .toFile('./pdfs/sc/scResults-' + req.body.p1First + "-" + req.body.p1Last + '-' + rando + '.pdf')
    .catch((err) => {
        console.log(err);
    }); // End fillForm Method

  res.send("End");

}); // End Router Post

module.exports = router
