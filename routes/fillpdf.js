const express = require('express')
const router = express.Router()
const pdffiller = require('pdffiller-stream')

router.post('/', (req, res) => {
  const sourcePDF = "./pdfs/sc/sc100-fillable2.pdf";
  
  const data = { 
  '1': '',
  Phone_2: '',
  'Street address_2': '',
  Street_3: '',
  City_3: '',
  State_3: '',
  Zip_3: '',
  Street_4: '',
  City_4: '',
  State_4: '',
  Zip_4: '',
  'Check here if more than two plaintiffs and attach form SC100A': '',
  'Check here if either plaintiff listed above is doing business under a fictitious name If so attach form SC103': '',
  'Check here if any plaintiff is a licensee or deferred deposit originator payday lender under Financial': '',
  'Street address_3': '',
  Phone_3: '',
  Street_5: '',
  City_5: '',
  State_5: '',
  Zip_5: '',
  Street_6: '',
  City_6: '',
  State_6: '',
  Zip_6: '',
  Address: '',
  'Job title if known 1': '',
  'Job title if known 2': '',
  Street_7: '',
  State_7: '',
  Zip_7: '',
  'Check here if your case is against more than one defendant and attach form SC100A': 'true',
  'Check here if any defendant is on active military duty and write his or her name here': '',
  'The plaintiff claims the defendant owes': '',
  'Explain below': '',
  'Why does the defendant owe the plaintiff money 1': '',
  'Why does the defendant owe the plaintiff money 2': '',
  'If no specific date give the time period': '',
  'Date started': '',
  Through: '',
  'How did you calculate the money owed to you Do not include court costs or fees for service': '',
  '2_2': '',
  'Check here if you need more space Attach one sheet of paper or form MC031 and write SC100 Item 3 at': '',
  'Revised January 1 2017': '',
  'SC100 Page 2 of 5': '',
  'Plaintiff list names_2': '',
  'Case Number_2': '',
  'the property Have you done this': '',
  'If no explain why not 1': '',
  'If no explain why not 2': '',
  '1 Where the defendant lives or does business': '',
  'Where the buyer or lessee signed the contract lives now or lived when the contract was made if this claim': '',
  'Where the buyer signed the contract lives now or lived when the contract was made if this claim is about a': '',
  'Where the buyer signed the contract lives now or lived when the contract was made or where the vehicle is': '',
  'Other specify': '',
  'permanently garaged if this claim is about a vehicle finance sale Civ Code  29844': '',
  'List the zip code of the place checked in': '',
  'above if you know': '',
  No_2: '',
  Yes_2: '',
  'If yes and if you have had arbitration fill out form SC101 attach it to this form and check here': '',
  undefined_2: '',
  'If the public entity denies your claim or does not answer within the time allowed by law you can file this form': '',
  'If yes you must file a written claim with the entity first': '',
  'A claim was filed on date': '',
  'Have you filed more than 12 other small claims within the last 12 months in California': '',
  'If yes the filing fee for this case will be higher': '',
  Date_3: '',
  'Plaintiff types or prints name here': '',
  'Plaintiff signs here': '',
  Date_4: '',
  'Second plaintiff types or prints name here': '',
  'Second plaintiff signs here': '',
  'Small claims court is a special court where claims for': '',
  'Prove this is the wrong court Send a letter to the court': '',
  'La Corte de reclamos menores es una corte especial donde se': '',
  'Probar que es la corte equivocada Envíe una carta a la corte': '',
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
  pg2_s1_pListNames: req.body.p1First + " " + req.body.p1Last,
  pg2_s1_caseNum: '',
  pg2_s2_p1_name: req.body.p1First + " " + req.body.p1Last,
  pg2_s2_p1_phone: req.body.d1Phone,
  pg2_s2_p1_street: req.body.p1Street1,
  pg2_s2_p1_state: req.body.p1State1,
  pg2_s2_p1_city: req.body.p1City1,
  pg2_s2_p1_zip: req.body.p1Zip1,
  pg2_s2_p1_street2: req.body.p1Street2,
  pg2_s2_p1_city2: '',
  pg2_s2_p1_state2: '',
  pg2_s2_p1_zip2: '' 
};

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

