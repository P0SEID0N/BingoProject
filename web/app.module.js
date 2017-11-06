import angular from 'angular';
import 'angular-route';
import jQuery from 'jquery';
import 'bootstrap';

//included components
import './components/scoreBoard.component';

let BowlingApp = angular.module('BowlingApp', ['ngRoute', 'scoreBoard']);

angular.element(document).ready(function(){
   angular.bootstrap(document, ['BowlingApp']);
});

//The below directive allows ngModel to work for contenteditable HTML5 value taken from:
//https://jsfiddle.net/jonataswalker/pn40Ln0g/
//Edits by Stephen Krieg
//BowlingApp.directive("directive", function() {
//    return {
//        restrict: "A",
//        require: "ngModel",
//        link: function(scope, element, attrs, ngModel) {
//
//            function read() {
//                // view -> model
//                var html = element.html();
//                html = html.replace(/&nbsp;/g, "\u00a0");
//                ngModel.$setViewValue(html);
//            }
//            // model -> view
//            ngModel.$render = function() {
//                element.html(ngModel.$viewValue || "");
//            };
//
//            //we want element to apply change on focus change
//            //This is fallback now.
//            element.bind("blur", function() {
//                scope.$apply(read);
//            });
//            //we also want the element to live update.
//            element.on("keyup", function() {
//               scope.$apply(read);
//            });
//            element.bind("keydown keypress", function (event) {
//                if(event.which === 13) {
//                    this.blur();
//                    event.preventDefault();
//                }
//            });
//        }
//    };
//});