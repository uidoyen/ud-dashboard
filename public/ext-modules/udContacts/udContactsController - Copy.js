"use strict";

angular.module('app')
.controller('usersController', ['$scope','$firebaseArray','FBURL', function($scope, $firebaseArray, FBURL){
	var ref = new Firebase(FBURL+'contacts');
	$scope.contacts = $firebaseArray(ref);

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
		//$scope.addFormShow = !$scope.addFormShow;
	};
	$scope.showEditForm = function(contact){
		$scope.editFormShow = true;

		$scope.id 				= contact.$id;
		$scope.name 			= contact.name;
		$scope.email 			= contact.email;
		$scope.company 			= contact.company;
		$scope.mobile_phone 	= contact.phones[0].mobile;
		$scope.work_phone 		= contact.phones[0].work;
		$scope.home_phone 		= contact.phones[0].home;

		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			= contact.address[0].city;
		$scope.state 			= contact.address[0].state;
		$scope.zip_code 		= contact.address[0].zip_code;

		//$scope.addFormShow = !$scope.addFormShow;
	};
	
	$scope.hideit = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
	};

	

	$scope.addFormSubmit = function(){
		if($scope.name){var name = $scope.name}else {var name = null;}
		if($scope.email){var email = $scope.email}else {var email = null;}
		if($scope.company){var company = $scope.company}else {var company = null;}
		if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone}else {var mobile_phone = null;}
		if($scope.work_phone){var work_phone = $scope.work_phone}else {var work_phone = null;}
		if($scope.home_phone){var home_phone = $scope.home_phone}else {var home_phone = null;}
		if($scope.street_address){var street_address = $scope.street_address}else {var street_address = null;}
		if($scope.city){var city = $scope.city}else {var city = null;}
		if($scope.state){var state = $scope.state}else {var state = null;}
		if($scope.zip_code){var zip_code = $scope.zip_code}else {var zip_code = null;}

		//build
		$scope.contacts.$add({
			name:name,
			email:email,
			company:company,
			phones:[
				{
					mobile:mobile_phone,
					home:home_phone,
					work:work_phone
				}
			],
			address:[
				{
					street_address:street_address,
					city:city,
					state:state,
					zip_code:zip_code
				}
			]
		}).then(function(ref){
			//console.log(ref);
			var id = ref.key();
			console.log('Contact added with ID:'+id);

			//Clear fields
			clearFields();

			//hide form
			$scope.addFormShow = false;

			//set success message
			$scope.msg = "Contact Added!";

		})
	};
	$scope.editFormSubmit = function(){
		var id = $scope.id;
		var record = $scope.contacts.$getRecord(id);

		record.name 						= $scope.name;
		record.email 						= $scope.email;
		record.company 						= $scope.company;
		record.phones[0].mobile				= $scope.mobile_phone;
		record.phones[0].work 				= $scope.work_phone;
		record.phones[0].home				= $scope.home_phone;

		record.address[0].street_address 	= $scope.street_address;
		record.address[0].city				= $scope.city;
		record.address[0].state 			= $scope.state;
		record.address[0].zip_code			= $scope.zip_code;

		$scope.contacts.$save(record).then(function(ref){

		});
		clearFields();

		$scope.editFormShow = false;

		$scope.msg = "Contact Updated";

	}
	function clearFields(){
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.work_phone = '';
		$scope.home_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip_code = '';
	}
	$scope.showContact = function(contact){
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;

		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip_code = contact.address[0].zip_code;

		$scope.contactShow = true;
	};

	$scope.removeContact = function(contact) {
		$scope.contacts.$remove(contact);

		$scope.msg = "Contact Removed";
	}

}]);