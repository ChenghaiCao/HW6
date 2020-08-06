/*
    a. Chenghai Cao
    b. Chenghai_cao@student.uml.edu
    c. Chenghai Cao is learning in Umass Lowell undergrad student, Computer Science Major, this is Chenghai Cao's homework 6 in 91.61 GUI Programming I as a student.
    d. Aug/03/2020
    e. This webpage is mainly displays an Interactive Dynamic Table.

    Copyright (c) 2020 by Chenghai Cao. All rights reserved.
*/


//For full screen:
function fullScreen() {
       var element = document.documentElement;
       if (window.ActiveXObject) {
           var WsShell = new ActiveXObject('WScript.Shell');
           WsShell.SendKeys('{F11}');
       }
       // Firefox
       else if (element.mozRequestFullScreen) {
           element.mozRequestFullScreen();
       }
       //HTML
       else if (element.requestFullScreen) {
           element.requestFullScreen();
       }
       //Safari
       else if (element.webkitRequestFullScreen) {
           element.webkitRequestFullScreen();
       }
       //IE11
       else if (element.msRequestFullscreen) {
           element.msRequestFullscreen();
       }
}
//for minimize the screen
function fullExit() {
    var element = document.documentElement;
    if (window.ActiveXObject) {
        var WsShell = new ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
    }
    // Firefox
    else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
    //HTML5
    else if (element.requestFullScreen) {
       document.exitFullscreen();
    }
    //IE 11
    else if (element.msRequestFullscreen) {
      document.msExitFullscreen();
    }
    //Safari
    else if (element.webkitRequestFullScreen) {
       document.webkitCancelFullScreen();
    }
}

//Here is the function to replace the element
//By using the parent nodes to check if new input updated and replace them.
function ElementReplacement(UpdatedVal, parentNode) {
    var prevVal;
    //The getElementById() method returns the element that has the ID attribute with the specified value.
    if((prevVal = document.getElementById(UpdatedVal.id)) && prevVal.parentNode === parentNode) {
        parentNode.replaceChild(UpdatedVal, prevVal);
    } else {
        parentNode.appendChild(UpdatedVal);
    }
}
//This part mainly handleing error when invalid input occurs.
if (typeof Superfixer == "undefined") {
        //validated procedure
        var Superfixer = (function() {
          var init = function() {
          //jQuery validator added
          jQuery.validator.addMethod("Compareation",function(input, element, params) {
              //int two values and to distinguish both relation whether greater than or less than.
              var BeginNum = parseInt(input);
              var EndNum = parseInt($('input[name="' + params[0] + '"]').val());

              if(isNaN(BeginNum) || isNaN(EndNum)){
                  return true;
              }

              if(params[2]) {
                  return BeginNum <= EndNum;
              } else {
                  return BeginNum >= EndNum;
              }
          }, //then the invalid message for user to notice.
          '<br>Please try again! <br>Hints: starts number must be GREATER THAN or EQUAL TO the ends number!');

          $('form').validate({
              rules: {  //the rules for Compareation between both rows and columns.
                  rowm: {required: true, Compareation: ['rowM', 'row', true], number: true,step: 1},
                  rowM: {required: true, Compareation: ['rowm', 'row', false], number: true, step: 1},
                  colm: {required: true, Compareation: ['colM', 'col', true], number: true, step: 1},
                  colM: {required: true, Compareation: ['colm', 'col', false], number: true, step: 1}
              },

              showErrors: function(error, fixer) {
                //to imply the error by using defaultShowErrors in jQuery method.
                  this.defaultShowErrors();
                  //init the CompareationError as no error.
                  var CompareationError = false;
                  //for fixer to define error in each commands.
                  fixer.forEach(function(error) {
                      if(error.method === 'Compareation') {
                        //if error happends, commit the error procedure
                          CompareationError = true;
                          //diminish those error message in both lanes.
                          $('#' + error.element.name + '-error').empty();
                          //cut the last charachar'm'OR 'M' and put row or col command into type
                          var type = error.element.name.slice(0,-1);
                          //replace the message as error message and printout at website.
                          $('#'+ type + 'Error').html(error.message);
                      }
                  });

                  //if there is no loonger error exists, replace those
                  //error message into empty.
                  if(fixer.length === 0 || !CompareationError ) {
                      this.currentElements.each(function(index, element) {
                          var type = element.name.slice(0,-1);
                          $('#' + type + 'Error').empty();
                      });
                  }
              },

              //for error input as symbols, non-integers and some other stuff.
              messages: {
                    rowM: {
                        required: 'Please Input a nunber.',
                        number: 'Please Input an integer.',
                        step: 'Please Input an integer. Any other symble aren"t ALLOWED'
                      },
                      rowm: {
                        required: 'Please Input a nunber.',
                        number: 'Please Input an integer.',
                        step: 'Please Input an integer. Any other symble are not ALLOWED'
                      },
                      colm: {
                        required: 'Please Input a nunber.',
                        number: 'Please Input an integer.',
                        step: 'Please Input an integer. Any other symble aren;t ALLOWED'
                      },
                      colM:{
                        required: 'Please Input a nunber.',
                        number: 'Please Input an integer.',
                        step: 'Please Input an integer. Any other symble aren;t ALLOWED'
                      }
              },
              submitHandler: function(form, event) {
                  event.preventDefault();
                  //table creating
                  var table = TableMain(
                  form.elements['rowm'].value,
                  form.elements['rowM'].value,
                  form.elements['colm'].value,
                  form.elements['colM'].value);
                  ElementReplacement(table, form);
              }
          });
      }

      return {
          init: init
      };
  })();

    //use DOM to tragger the function load.
    //learnt from: https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded
    document.addEventListener('DOMContentLoaded', Superfixer.init);
}

//for create the main table of multiply
function TableMain(Value_rowm, Value_rowM, Value_colM, Value_colm)
{
    var table = document.createElement('table');
    table.id = 'table';
    var beginC = 1, beginR = 1, multiplier, multiplicand, ResultQ, result;

    for(multiplier = Value_colM - 1; multiplier <= Value_colm; multiplier++)
    {
        //additional multiplier when starting the loop
        var tableRow = document.createElement('tr');
        for(multiplicand = Value_rowm - 1; multiplicand <= Value_rowM; multiplicand++) {
            //additional the new column here
            if(beginR) {
                ResultQ = document.createElement('th');
                if(!beginC) {
                    result = document.createTextNode(multiplicand);
                    ResultQ.appendChild(result);
                }
            } else {
                if(beginC) {
                    ResultQ = document.createElement('th');
                    result = document.createTextNode(multiplier);
                    ResultQ.appendChild(result);

                } else {
                    ResultQ = document.createElement('td');
                    result = document.createTextNode(multiplier * multiplicand);
                    ResultQ.appendChild(result);
                }
            }
            // Add ResultQ TO THE multiplier
            tableRow.appendChild(ResultQ);
            beginC = false;
        }
        // Add multiplier TO MAIN TABLE
        table.appendChild(tableRow);
        beginC = true;
        beginR = false;
    }
    return table;
}
