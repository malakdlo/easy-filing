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
  controller('ScBasicCtrl', function($scope){

    /******************** Data **********************/
    // Steps
//      $scope.steps = ['q1', 'q2', 'q3'] // End Steps
//      $scope.selection = $scope.steps[2];
    // Steps
      $scope.steps = ['plaintiff', 'defendant', 'final','dispute', 'court']; // End Steps
      $scope.selection = $scope.steps[0];

    // Small Claims Form Info
      $scope.scFormInfo = {
        pNumber : [1, 2, 3, 4, 5, "Greater than 5"],
        pType : ['Business', 'Person', 'Government Official']
      }

    // Small Claims Form Info
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
      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
          return {abbrev: state};
        }); // End $scope.states
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

    // to-do list
    $scope.toDoList = [];
    $scope.addToDo = function(item){
        console.log("Adding to do list item...")
        $scope.toDoList.push(item);
        console.log($scope.toDoList);
      }

    // SC Quiz specific

    // Complete for SC Quiz
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
    // Not Complete for SC Quiz
    $scope.demandLetter = function(){

    }
    $scope.cantContinue = function(){};

  // SC Form specific
    // Complete for SC Form
      // General

      // Plaintiff
        // : SC100 Greater than 2 Plaintiffs
    $scope.lessThanTwo = function(item){
      $scope.addToDo(item);
      $scope.pNumber = 1;
    }
        // : SC103 Ficticious / Corp / Other
    $scope.notFictitious = function(){
      $scope.pType = 'Not Fictitious';
    }
    $scope.isFictitious1 = function(){
      // Add SC-103 to to-do list
      $scope.isFictious = true;
      return $scope.isFictious;
    }
    $scope.isFictitious2 = function(item){
      $scope.addToDo(item);
      $scope.isFictious = false;
      $scope.pType = 'Not Fictitious';
      //return $scope.isFictious;
    }
        // Q1 -> Q2
    $scope.q1q2 = function(){
      $scope.incrementStep();
    }

    // Defendant
      // Q1 -> Q2
    $scope.dFinal = function(){
      $scope.incrementStep();
    }
      // Final
    $scope.returnFinal = function(){
      return $scope.final = true;
    }

    // Not Complete for SC Form


   /*
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


    // User Info
      $scope.user = {}
      */
  }).
  controller('ScFormLogicCtrl', function($scope){
    /******************** Data **********************/
    // Steps
      $scope.steps = ['plaintiff', 'defendant', 'final','dispute', 'court']; // End Steps
      $scope.selection = $scope.steps[0];

    // Small Claims Form Info
      $scope.scFormInfo = {
        pNumber : [1, 2, 3, 4, 5, "Greater than 5"],
        pType : ['Business', 'Person', 'Government Official']
      }
    // Small Claims Quiz Info
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
      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
          return {abbrev: state};
        }); // End $scope.states
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

    // to-do list
    $scope.toDoList = [];
    $scope.addToDo = function(item){
        console.log("Adding to do list item...")
        $scope.toDoList.push(item);
        console.log($scope.toDoList);
      }

    // SC Quiz specific
      // Complete for SC Quiz
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
      // Not Complete for SC Quiz
      $scope.demandLetter = function(){

      }
      $scope.cantContinue = function(){};

    // SC Form specific
      // Complete for SC Form
        // General

        // Plaintiff
          // : SC100 Greater than 2 Plaintiffs
      $scope.lessThanTwo = function(item){
        $scope.addToDo(item);
        $scope.pNumber = 1;
      }
          // : SC103 Ficticious / Corp / Other
      $scope.notFictitious = function(){
        $scope.pType = 'Not Fictitious';
      }
      $scope.isFictitious1 = function(){
        // Add SC-103 to to-do list
        $scope.isFictious = true;
        return $scope.isFictious;
      }
      $scope.isFictitious2 = function(item){
        $scope.addToDo(item);
        $scope.isFictious = false;
        $scope.pType = 'Not Fictitious';
        //return $scope.isFictious;
      }
          // Q1 -> Q2
      $scope.q1q2 = function(){
        $scope.incrementStep();
      }

      // Defendant
        // Q1 -> Q2
      $scope.dFinal = function(){
        $scope.incrementStep();
        //$scope.returnFinal();
      }
        // Final
      $scope.returnFinal = function(){
        return $scope.final = true;
      }

      // Not Complete for SC Form

  })
  .controller('FormController', function($scope, SC100Factory){
    $scope.oneAtATime = true;
    $scope.scFormInfo = {
          "plaintiff":{
            "s1":{
              num : [1, 2, 3, 4, 5, "Greater than 5"],
              finished : false
            },
            "s2":{
              type : ['Corp', 'Ficticious Business', 'Individual', 'Government Official'],
              finished: false
            }
          },
          "defendant":{
            "s1":{
              num : [1, 2, 3, 4, 5, "Greater than 5"],
              finished : false
            },
            "s2":{
              type : ['Corp', 'Ficticious Business', 'Individual', 'Government Official'],
              militaryDuty: ['Yes', 'No'],
              finished: false
            }
          }
        };
    $scope.status = {
      isCustomHeaderOpen: false,
      isFirstOpen: true,
      isFirstDisabled: false
    };
    $scope.SC100Info = SC100Factory.info
  })
  .factory('SC100Factory', function(){
    var SC100Factory = this;
    SC100Factory.info = {
      "s1": {},
      "s2": {},
      "s3": {},
      "s4": {}
    };
    return SC100Factory;
  })
