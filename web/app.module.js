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