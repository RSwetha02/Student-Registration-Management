var app=angular.module("mainApp",[]);

app.controller("CRUDController",function($scope, $http){
    

$scope.EmpList=[];

// Fetch data from the backend on page load
$http.get('http://localhost:3000/api/users')
.then(function (response) {
    $scope.EmpList = response.data; // Assign fetched data to EmpList
})
.catch(function (error) {
    console.error('Error fetching users:', error);
});

$scope.AddData= function(){
var emp = { //object
    SId:$scope.SId,
    Name:$scope.Name,
    Salary:$scope.Salary
};
$scope.EmpList.push(emp); //add array items

$http.post('http://localhost:3000/api/users', emp)
            .then(function(response) {
                console.log('User added successfully:', response.data);
                // Handle success if needed
            })
            .catch(function(error) {
                console.error('Error adding user:', error);
                // Handle error if needed
            });
            ClearModel();
};

$scope.DeleteData= function(emp){
    var index=$scope.EmpList.indexOf(emp); // select index to delete
    $scope.EmpList.splice(index,1); // delete in the array

    $http.delete('http://localhost:3000/api/users/' + emp.SId)
    .then(function(response) {
        console.log('User deleted successfully:', response.data);
        // Handle success if needed
    })
    .catch(function(error) {
        console.error('Error deleting user:', error);
        // Handle error if needed
    });
    ClearModel();

};

$scope.BindSelectedData = function(emp){
$scope.SId=emp.SId;
$scope.Name=emp.Name;
$scope.Salary=emp.Salary;
};


$scope.UpdateData = function(){
$.grep($scope.EmpList,function(e){ //grep is used to update array 
if(e.SId==$scope.SId)
{
    e.SId=$scope.SId;
    e.Name=$scope.Name;
    e.Salary=$scope.Salary;
}
});
var updatedEmployee = {
    SId: $scope.SId,
    Name: $scope.Name,
    Salary: $scope.Salary
};
$http.put('http://localhost:3000/api/users/' + $scope.SId, updatedEmployee)
            .then(function (response) {
                console.log('User updated successfully:', response.data);

                var index = $scope.EmpList.findIndex(emp => emp.SId === $scope.SId);
                if (index !== -1) {
                    $scope.EmpList[index] = angular.copy(updatedEmployee);
                }
            })
            .catch(function (error) {
                console.error('Error updating user:', error);
            });
};

function ClearModel(){
$scope.SId='';
$scope.Name='';
$scope.Salary='';
}
});