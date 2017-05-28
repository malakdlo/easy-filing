'use strict';

/* Controllers */  
angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http.get('api/name').then(successCallback, errorCallback);
    function successCallback(response) {
      console.log(typeof response);
      console.log("Success! API Value is: " + response.data.name);
      $scope.name = response.data.name;
    };
    function errorCallback(error) {
      console.log("Error! Error is: " + error);
      $scope.name = error;
    };

  }).
  controller('ScCtrl', function($scope){
    
    
      var quizObject = [];
            
      /************************************************************************************************************ 
                                          Small Claims Specific 
      *************************************************************************************************************/

      /* Small Claims Specific Data */
      $scope.filingDeetsObject = {
            "CA": {
              canFile: true,
              filingRanges:{
                min: 1000,
                mid: 5000,
                max: 10000  
              },
              filingFees:{
                min: 30,
                mid: 50,
                max: 75
              }
            },
            "TX": {
              canFile: false,
              filingRanges:{
                min: 1000,
                mid: 5000,
                max: 10000  
              },
              filingFees:{
                min: 30,
                mid: 50,
                max: 75
              }
            },
            "NV": {
              canFile: true,
              filingRanges:{
                min: 1000,
                mid: 5000,
                max: 10000  
              },
              filingFees:{
                min: 30,
                mid: 50,
                max: 75
              }
            }
          };
      $scope.quizDeetsObject = {};
      /* Small Claims Specific Functions  */

      // For Step 1
      $scope.canFile = function(state, amount){
                    console.log("**** canFile Results ****");
                    $scope.passBasics = false;
                    if($scope.filingDeetsObject.hasOwnProperty(state)){
                      if($scope.filingDeetsObject[state].canFile === true){
                         if(amount <= $scope.filingDeetsObject[state].filingRanges.max){
                           console.log("Less than the max?");
                           console.log("Yes")
                           $scope.passBasics = true;
                         } else {
                           $scope.reason = "Sorry, you have surpassed the max";
                           console.log($scope.reason);
                         }// end if / else for max
                      }else {
                        $scope.reason = "Sorry, can't file in this state :( "
                        console.log($scope.reason);
                      } // end if / else for canFile
                    } // end if for hasOwnProperty(state)
                    return $scope.passBasics;
                  };
      $scope.oneToTwo = function(state, type, amount){
        $scope.quizDeetsObject.defendantState = state;
        $scope.quizDeetsObject.defendantType = type;
        $scope.quizDeetsObject.amount = amount;

        //console.log("Scoped Defendant Type: " + $scope.defendantType);
        //console.log("Non Scoped Variable: " + defendantType);
        //console.log($scope.defendantState, $scope.defendantType, $scope.amount);
        //quizObject.push(defendantState, defendantType, amount);
        //$scope.quizObject.push(defendantState, defendantType, amount);

        $scope.incrementStep();
      };

      // For Step 2
      $scope.twoToThree = function(type, loc){
        $scope.quizDeetsObject.plaintiffType = type;
        $scope.quizDeetsObject.loc = loc;
        $scope.incrementStep();
      };


      // For Step 3
      $scope.calculateCost = function(num, service, amount){
      }
      // Radio Buttons
      $scope.casesCountModal = 1;
      $scope.disputeServiceModal = "Small Claim";

      /************************************************************************************************************ 
                                                          Multi Step Form 
      *************************************************************************************************************/

      /* Form Data */
      $scope.states = ['CA', 'NV', 'TX'];
      $scope.types = ['Business', 'Person', 'Government Official'];
      $scope.locations = ['In State', 'Out of State'];
      // Maybe rename Can I, Should I, Will I?
      $scope.steps = ['Step 1: Basic Info', 'Step 2: Case Difficulty', 'Step 3: Cost'];
      $scope.selection = $scope.steps[0];

      /* Form Functions */

      // Linear: 1 -> 3
      // Get Current Index (Necessary for incrementStep)
      $scope.getCurrentStepIndex = function(){
        // Get the index of the current step given selection
        return _.indexOf($scope.steps, $scope.selection);
      };
      $scope.incrementStep = function() {
        if ( $scope.hasNextStep() ){
          var stepIndex = $scope.getCurrentStepIndex();
          var nextStep = stepIndex + 1;
          $scope.selection = $scope.steps[nextStep];
          console.log("***Quiz Deets Object Update***");
          console.log($scope.quizDeetsObject);
          /*console.log("dState: ", $scope.defendantState);
          console.log("dType: ", $scope.defendantType);
          console.log("amount: ", $scope.amount);
          console.log("pType: ", $scope.plaintiffType);
          console.log("location: ", $scope.loc);*/
        }
      };
      $scope.decrementStep = function() {
        if ( $scope.hasPreviousStep() )
        {
          var stepIndex = $scope.getCurrentStepIndex();
          var previousStep = stepIndex - 1;
          $scope.selection = $scope.steps[previousStep];
        }
      };

      // Dynamic Choice: User Selects Step
      // Go to a defined step index
      $scope.goToStep = function(index) {
        if ( !_.isUndefined($scope.steps[index]) )
        {
          $scope.selection = $scope.steps[index];
        }
      };
      $scope.hasNextStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var nextStep = stepIndex + 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[nextStep]);
      };
      $scope.hasPreviousStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var previousStep = stepIndex - 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[previousStep]);
      };

    
  }).
  controller('ScBasicCtrl', function($scope){
  
    /******************** Data **********************/
    // Steps
      $scope.steps = ['q1', 'q2', 'q3'] // End Steps 
      $scope.selection = $scope.steps[2];

    // Small Claims
      $scope.filingDeetsObject = {
          "CA": {
            canFile: true,
            filingRanges:{
              min: 1000,
              mid: 5000,
              max: 10000  
            },
            filingFees:{
              min: 30,
              mid: 50,
              max: 75
            }
          },
          "TX": {
            canFile: false,
            filingRanges:{
              min: 1000,
              mid: 5000,
              max: 10000  
            },
            filingFees:{
              min: 30,
              mid: 50,
              max: 75
            }
          },
          "NV": {
            canFile: true,
            filingRanges:{
              min: 1000,
              mid: 5000,
              max: 10000  
            },
            filingFees:{
              min: 30,
              mid: 50,
              max: 75
            }
          }
        };
      $scope.quizDeetsObject = {};

      $scope.states = ['CA', 'NV', 'TX'];
      $scope.types = ['Business', 'Person', 'Government Official'];
      $scope.locations = ['In State', 'Out of State'];

  /******************** Functions **********************/

    // ng-switch steps
      $scope.getCurrentStepIndex = function(){
        // Get the index of the current step given selection
        return _.indexOf($scope.steps, $scope.selection);
      }; // end getCurrentStepIndex()
      $scope.hasNextStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var nextStep = stepIndex + 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[nextStep]);
      }; // end hasNextStep()
      $scope.hasPreviousStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var previousStep = stepIndex - 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[previousStep]);
      }; // end hasPreviousStep()
      $scope.incrementStep = function() {
        if ( $scope.hasNextStep() ){
          var stepIndex = $scope.getCurrentStepIndex();
          var nextStep = stepIndex + 1;
          $scope.selection = $scope.steps[nextStep];
          console.log("***Quiz Deets Object Update***");
          console.log($scope.quizDeetsObject);
          /*console.log("dState: ", $scope.defendantState);
          console.log("dType: ", $scope.defendantType);
          console.log("amount: ", $scope.amount);
          console.log("pType: ", $scope.plaintiffType);
          console.log("location: ", $scope.loc);*/
        }
      }; // end incrementStep()
      $scope.decrementStep = function() {
        if ( $scope.hasPreviousStep() )
        {
          var stepIndex = $scope.getCurrentStepIndex();
          var previousStep = stepIndex - 1;
          $scope.selection = $scope.steps[previousStep];
        }
      }; // end decrementStep()


    // SC specific

      // Complete
        // Q2
      $scope.canFile = function(state, amount){
                  console.log("**** canFile Results ****");
                  $scope.passBasics = false;
                  if($scope.filingDeetsObject.hasOwnProperty(state)){
                    if($scope.filingDeetsObject[state].canFile === true){
                       if(amount <= $scope.filingDeetsObject[state].filingRanges.max){
                         console.log("Less than the max?");
                         console.log("Yes")
                         $scope.passBasics = true;
                       } else {
                         $scope.reason = "Sorry, you have surpassed the max";
                         console.log($scope.reason);
                       }// end if / else for max
                    }else {
                      $scope.reason = "Sorry, can't file in this state :( "
                      console.log($scope.reason);
                    } // end if / else for canFile
                  } // end if for hasOwnProperty(state)
                  return $scope.passBasics;
                };
      $scope.twoToThree = function(state, type, amount){
        $scope.quizDeetsObject.defendantState = state;
        $scope.quizDeetsObject.defendantType = type;
        $scope.quizDeetsObject.amount = amount;

        //console.log("Scoped Defendant Type: " + $scope.defendantType);
        //console.log("Non Scoped Variable: " + defendantType);
        //console.log($scope.defendantState, $scope.defendantType, $scope.amount);
        //quizObject.push(defendantState, defendantType, amount);
        //$scope.quizObject.push(defendantState, defendantType, amount);

        $scope.incrementStep();
      };
      $scope.letsFile = function(){

      }
      // Not Complete
      $scope.demandLetter = function(){

      }
      $scope.cantContinue = function(){};

  }).
  controller('FileScCtrl',function($scope){
    // Google Form
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      }); // End $scope.states
    
  
  });
